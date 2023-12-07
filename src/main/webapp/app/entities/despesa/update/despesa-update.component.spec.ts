import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITipoDespesa } from 'app/entities/tipo-despesa/tipo-despesa.model';
import { TipoDespesaService } from 'app/entities/tipo-despesa/service/tipo-despesa.service';
import { DespesaService } from '../service/despesa.service';
import { IDespesa } from '../despesa.model';
import { DespesaFormService } from './despesa-form.service';

import { DespesaUpdateComponent } from './despesa-update.component';

describe('Despesa Management Update Component', () => {
  let comp: DespesaUpdateComponent;
  let fixture: ComponentFixture<DespesaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let despesaFormService: DespesaFormService;
  let despesaService: DespesaService;
  let tipoDespesaService: TipoDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DespesaUpdateComponent],
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
      .overrideTemplate(DespesaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DespesaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    despesaFormService = TestBed.inject(DespesaFormService);
    despesaService = TestBed.inject(DespesaService);
    tipoDespesaService = TestBed.inject(TipoDespesaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TipoDespesa query and add missing value', () => {
      const despesa: IDespesa = { id: 456 };
      const tipoDespesa: ITipoDespesa = { id: 3153 };
      despesa.tipoDespesa = tipoDespesa;

      const tipoDespesaCollection: ITipoDespesa[] = [{ id: 11875 }];
      jest.spyOn(tipoDespesaService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoDespesaCollection })));
      const additionalTipoDespesas = [tipoDespesa];
      const expectedCollection: ITipoDespesa[] = [...additionalTipoDespesas, ...tipoDespesaCollection];
      jest.spyOn(tipoDespesaService, 'addTipoDespesaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ despesa });
      comp.ngOnInit();

      expect(tipoDespesaService.query).toHaveBeenCalled();
      expect(tipoDespesaService.addTipoDespesaToCollectionIfMissing).toHaveBeenCalledWith(
        tipoDespesaCollection,
        ...additionalTipoDespesas.map(expect.objectContaining),
      );
      expect(comp.tipoDespesasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const despesa: IDespesa = { id: 456 };
      const tipoDespesa: ITipoDespesa = { id: 4381 };
      despesa.tipoDespesa = tipoDespesa;

      activatedRoute.data = of({ despesa });
      comp.ngOnInit();

      expect(comp.tipoDespesasSharedCollection).toContain(tipoDespesa);
      expect(comp.despesa).toEqual(despesa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDespesa>>();
      const despesa = { id: 123 };
      jest.spyOn(despesaFormService, 'getDespesa').mockReturnValue(despesa);
      jest.spyOn(despesaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ despesa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: despesa }));
      saveSubject.complete();

      // THEN
      expect(despesaFormService.getDespesa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(despesaService.update).toHaveBeenCalledWith(expect.objectContaining(despesa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDespesa>>();
      const despesa = { id: 123 };
      jest.spyOn(despesaFormService, 'getDespesa').mockReturnValue({ id: null });
      jest.spyOn(despesaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ despesa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: despesa }));
      saveSubject.complete();

      // THEN
      expect(despesaFormService.getDespesa).toHaveBeenCalled();
      expect(despesaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDespesa>>();
      const despesa = { id: 123 };
      jest.spyOn(despesaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ despesa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(despesaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTipoDespesa', () => {
      it('Should forward to tipoDespesaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tipoDespesaService, 'compareTipoDespesa');
        comp.compareTipoDespesa(entity, entity2);
        expect(tipoDespesaService.compareTipoDespesa).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
