import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GrupoCaixaService } from '../service/grupo-caixa.service';
import { IGrupoCaixa } from '../grupo-caixa.model';
import { GrupoCaixaFormService } from './grupo-caixa-form.service';

import { GrupoCaixaUpdateComponent } from './grupo-caixa-update.component';

describe('GrupoCaixa Management Update Component', () => {
  let comp: GrupoCaixaUpdateComponent;
  let fixture: ComponentFixture<GrupoCaixaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let grupoCaixaFormService: GrupoCaixaFormService;
  let grupoCaixaService: GrupoCaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), GrupoCaixaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(GrupoCaixaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoCaixaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    grupoCaixaFormService = TestBed.inject(GrupoCaixaFormService);
    grupoCaixaService = TestBed.inject(GrupoCaixaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const grupoCaixa: IGrupoCaixa = { id: 456 };

      activatedRoute.data = of({ grupoCaixa });
      comp.ngOnInit();

      expect(comp.grupoCaixa).toEqual(grupoCaixa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoCaixa>>();
      const grupoCaixa = { id: 123 };
      jest.spyOn(grupoCaixaFormService, 'getGrupoCaixa').mockReturnValue(grupoCaixa);
      jest.spyOn(grupoCaixaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoCaixa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoCaixa }));
      saveSubject.complete();

      // THEN
      expect(grupoCaixaFormService.getGrupoCaixa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(grupoCaixaService.update).toHaveBeenCalledWith(expect.objectContaining(grupoCaixa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoCaixa>>();
      const grupoCaixa = { id: 123 };
      jest.spyOn(grupoCaixaFormService, 'getGrupoCaixa').mockReturnValue({ id: null });
      jest.spyOn(grupoCaixaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoCaixa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoCaixa }));
      saveSubject.complete();

      // THEN
      expect(grupoCaixaFormService.getGrupoCaixa).toHaveBeenCalled();
      expect(grupoCaixaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoCaixa>>();
      const grupoCaixa = { id: 123 };
      jest.spyOn(grupoCaixaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoCaixa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(grupoCaixaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
