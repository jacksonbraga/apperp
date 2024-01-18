import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IGrupoCaixa } from 'app/entities/grupo-caixa/grupo-caixa.model';
import { GrupoCaixaService } from 'app/entities/grupo-caixa/service/grupo-caixa.service';
import { TipoCaixaService } from '../service/tipo-caixa.service';
import { ITipoCaixa } from '../tipo-caixa.model';
import { TipoCaixaFormService } from './tipo-caixa-form.service';

import { TipoCaixaUpdateComponent } from './tipo-caixa-update.component';

describe('TipoCaixa Management Update Component', () => {
  let comp: TipoCaixaUpdateComponent;
  let fixture: ComponentFixture<TipoCaixaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoCaixaFormService: TipoCaixaFormService;
  let tipoCaixaService: TipoCaixaService;
  let grupoCaixaService: GrupoCaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TipoCaixaUpdateComponent],
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
      .overrideTemplate(TipoCaixaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoCaixaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoCaixaFormService = TestBed.inject(TipoCaixaFormService);
    tipoCaixaService = TestBed.inject(TipoCaixaService);
    grupoCaixaService = TestBed.inject(GrupoCaixaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call GrupoCaixa query and add missing value', () => {
      const tipoCaixa: ITipoCaixa = { id: 456 };
      const grupoCaixas: IGrupoCaixa[] = [{ id: 20130 }];
      tipoCaixa.grupoCaixas = grupoCaixas;

      const grupoCaixaCollection: IGrupoCaixa[] = [{ id: 12652 }];
      jest.spyOn(grupoCaixaService, 'query').mockReturnValue(of(new HttpResponse({ body: grupoCaixaCollection })));
      const additionalGrupoCaixas = [...grupoCaixas];
      const expectedCollection: IGrupoCaixa[] = [...additionalGrupoCaixas, ...grupoCaixaCollection];
      jest.spyOn(grupoCaixaService, 'addGrupoCaixaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tipoCaixa });
      comp.ngOnInit();

      expect(grupoCaixaService.query).toHaveBeenCalled();
      expect(grupoCaixaService.addGrupoCaixaToCollectionIfMissing).toHaveBeenCalledWith(
        grupoCaixaCollection,
        ...additionalGrupoCaixas.map(expect.objectContaining),
      );
      expect(comp.grupoCaixasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tipoCaixa: ITipoCaixa = { id: 456 };
      const grupoCaixa: IGrupoCaixa = { id: 27891 };
      tipoCaixa.grupoCaixas = [grupoCaixa];

      activatedRoute.data = of({ tipoCaixa });
      comp.ngOnInit();

      expect(comp.grupoCaixasSharedCollection).toContain(grupoCaixa);
      expect(comp.tipoCaixa).toEqual(tipoCaixa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoCaixa>>();
      const tipoCaixa = { id: 123 };
      jest.spyOn(tipoCaixaFormService, 'getTipoCaixa').mockReturnValue(tipoCaixa);
      jest.spyOn(tipoCaixaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoCaixa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoCaixa }));
      saveSubject.complete();

      // THEN
      expect(tipoCaixaFormService.getTipoCaixa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoCaixaService.update).toHaveBeenCalledWith(expect.objectContaining(tipoCaixa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoCaixa>>();
      const tipoCaixa = { id: 123 };
      jest.spyOn(tipoCaixaFormService, 'getTipoCaixa').mockReturnValue({ id: null });
      jest.spyOn(tipoCaixaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoCaixa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoCaixa }));
      saveSubject.complete();

      // THEN
      expect(tipoCaixaFormService.getTipoCaixa).toHaveBeenCalled();
      expect(tipoCaixaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoCaixa>>();
      const tipoCaixa = { id: 123 };
      jest.spyOn(tipoCaixaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoCaixa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoCaixaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGrupoCaixa', () => {
      it('Should forward to grupoCaixaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(grupoCaixaService, 'compareGrupoCaixa');
        comp.compareGrupoCaixa(entity, entity2);
        expect(grupoCaixaService.compareGrupoCaixa).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
