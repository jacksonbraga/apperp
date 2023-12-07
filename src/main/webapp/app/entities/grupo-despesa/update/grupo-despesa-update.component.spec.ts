import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GrupoDespesaService } from '../service/grupo-despesa.service';
import { IGrupoDespesa } from '../grupo-despesa.model';
import { GrupoDespesaFormService } from './grupo-despesa-form.service';

import { GrupoDespesaUpdateComponent } from './grupo-despesa-update.component';

describe('GrupoDespesa Management Update Component', () => {
  let comp: GrupoDespesaUpdateComponent;
  let fixture: ComponentFixture<GrupoDespesaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let grupoDespesaFormService: GrupoDespesaFormService;
  let grupoDespesaService: GrupoDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), GrupoDespesaUpdateComponent],
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
      .overrideTemplate(GrupoDespesaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoDespesaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    grupoDespesaFormService = TestBed.inject(GrupoDespesaFormService);
    grupoDespesaService = TestBed.inject(GrupoDespesaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const grupoDespesa: IGrupoDespesa = { id: 456 };

      activatedRoute.data = of({ grupoDespesa });
      comp.ngOnInit();

      expect(comp.grupoDespesa).toEqual(grupoDespesa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoDespesa>>();
      const grupoDespesa = { id: 123 };
      jest.spyOn(grupoDespesaFormService, 'getGrupoDespesa').mockReturnValue(grupoDespesa);
      jest.spyOn(grupoDespesaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoDespesa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoDespesa }));
      saveSubject.complete();

      // THEN
      expect(grupoDespesaFormService.getGrupoDespesa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(grupoDespesaService.update).toHaveBeenCalledWith(expect.objectContaining(grupoDespesa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoDespesa>>();
      const grupoDespesa = { id: 123 };
      jest.spyOn(grupoDespesaFormService, 'getGrupoDespesa').mockReturnValue({ id: null });
      jest.spyOn(grupoDespesaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoDespesa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoDespesa }));
      saveSubject.complete();

      // THEN
      expect(grupoDespesaFormService.getGrupoDespesa).toHaveBeenCalled();
      expect(grupoDespesaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoDespesa>>();
      const grupoDespesa = { id: 123 };
      jest.spyOn(grupoDespesaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoDespesa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(grupoDespesaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
