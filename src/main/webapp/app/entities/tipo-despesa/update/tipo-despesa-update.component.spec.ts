import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IGrupoDespesa } from 'app/entities/grupo-despesa/grupo-despesa.model';
import { GrupoDespesaService } from 'app/entities/grupo-despesa/service/grupo-despesa.service';
import { TipoDespesaService } from '../service/tipo-despesa.service';
import { ITipoDespesa } from '../tipo-despesa.model';
import { TipoDespesaFormService } from './tipo-despesa-form.service';

import { TipoDespesaUpdateComponent } from './tipo-despesa-update.component';

describe('TipoDespesa Management Update Component', () => {
  let comp: TipoDespesaUpdateComponent;
  let fixture: ComponentFixture<TipoDespesaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoDespesaFormService: TipoDespesaFormService;
  let tipoDespesaService: TipoDespesaService;
  let grupoDespesaService: GrupoDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TipoDespesaUpdateComponent],
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
      .overrideTemplate(TipoDespesaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoDespesaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoDespesaFormService = TestBed.inject(TipoDespesaFormService);
    tipoDespesaService = TestBed.inject(TipoDespesaService);
    grupoDespesaService = TestBed.inject(GrupoDespesaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call GrupoDespesa query and add missing value', () => {
      const tipoDespesa: ITipoDespesa = { id: 456 };
      const grupoDespesa: IGrupoDespesa = { id: 12298 };
      tipoDespesa.grupoDespesa = grupoDespesa;

      const grupoDespesaCollection: IGrupoDespesa[] = [{ id: 19341 }];
      jest.spyOn(grupoDespesaService, 'query').mockReturnValue(of(new HttpResponse({ body: grupoDespesaCollection })));
      const additionalGrupoDespesas = [grupoDespesa];
      const expectedCollection: IGrupoDespesa[] = [...additionalGrupoDespesas, ...grupoDespesaCollection];
      jest.spyOn(grupoDespesaService, 'addGrupoDespesaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tipoDespesa });
      comp.ngOnInit();

      expect(grupoDespesaService.query).toHaveBeenCalled();
      expect(grupoDespesaService.addGrupoDespesaToCollectionIfMissing).toHaveBeenCalledWith(
        grupoDespesaCollection,
        ...additionalGrupoDespesas.map(expect.objectContaining),
      );
      expect(comp.grupoDespesasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tipoDespesa: ITipoDespesa = { id: 456 };
      const grupoDespesa: IGrupoDespesa = { id: 3116 };
      tipoDespesa.grupoDespesa = grupoDespesa;

      activatedRoute.data = of({ tipoDespesa });
      comp.ngOnInit();

      expect(comp.grupoDespesasSharedCollection).toContain(grupoDespesa);
      expect(comp.tipoDespesa).toEqual(tipoDespesa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoDespesa>>();
      const tipoDespesa = { id: 123 };
      jest.spyOn(tipoDespesaFormService, 'getTipoDespesa').mockReturnValue(tipoDespesa);
      jest.spyOn(tipoDespesaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDespesa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoDespesa }));
      saveSubject.complete();

      // THEN
      expect(tipoDespesaFormService.getTipoDespesa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoDespesaService.update).toHaveBeenCalledWith(expect.objectContaining(tipoDespesa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoDespesa>>();
      const tipoDespesa = { id: 123 };
      jest.spyOn(tipoDespesaFormService, 'getTipoDespesa').mockReturnValue({ id: null });
      jest.spyOn(tipoDespesaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDespesa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoDespesa }));
      saveSubject.complete();

      // THEN
      expect(tipoDespesaFormService.getTipoDespesa).toHaveBeenCalled();
      expect(tipoDespesaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoDespesa>>();
      const tipoDespesa = { id: 123 };
      jest.spyOn(tipoDespesaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDespesa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoDespesaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGrupoDespesa', () => {
      it('Should forward to grupoDespesaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(grupoDespesaService, 'compareGrupoDespesa');
        comp.compareGrupoDespesa(entity, entity2);
        expect(grupoDespesaService.compareGrupoDespesa).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
