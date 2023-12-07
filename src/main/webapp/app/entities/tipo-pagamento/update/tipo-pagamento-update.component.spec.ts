import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IGrupoPagamento } from 'app/entities/grupo-pagamento/grupo-pagamento.model';
import { GrupoPagamentoService } from 'app/entities/grupo-pagamento/service/grupo-pagamento.service';
import { TipoPagamentoService } from '../service/tipo-pagamento.service';
import { ITipoPagamento } from '../tipo-pagamento.model';
import { TipoPagamentoFormService } from './tipo-pagamento-form.service';

import { TipoPagamentoUpdateComponent } from './tipo-pagamento-update.component';

describe('TipoPagamento Management Update Component', () => {
  let comp: TipoPagamentoUpdateComponent;
  let fixture: ComponentFixture<TipoPagamentoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoPagamentoFormService: TipoPagamentoFormService;
  let tipoPagamentoService: TipoPagamentoService;
  let grupoPagamentoService: GrupoPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TipoPagamentoUpdateComponent],
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
      .overrideTemplate(TipoPagamentoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoPagamentoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoPagamentoFormService = TestBed.inject(TipoPagamentoFormService);
    tipoPagamentoService = TestBed.inject(TipoPagamentoService);
    grupoPagamentoService = TestBed.inject(GrupoPagamentoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call GrupoPagamento query and add missing value', () => {
      const tipoPagamento: ITipoPagamento = { id: 456 };
      const grupoPagamento: IGrupoPagamento = { id: 27338 };
      tipoPagamento.grupoPagamento = grupoPagamento;

      const grupoPagamentoCollection: IGrupoPagamento[] = [{ id: 26732 }];
      jest.spyOn(grupoPagamentoService, 'query').mockReturnValue(of(new HttpResponse({ body: grupoPagamentoCollection })));
      const additionalGrupoPagamentos = [grupoPagamento];
      const expectedCollection: IGrupoPagamento[] = [...additionalGrupoPagamentos, ...grupoPagamentoCollection];
      jest.spyOn(grupoPagamentoService, 'addGrupoPagamentoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tipoPagamento });
      comp.ngOnInit();

      expect(grupoPagamentoService.query).toHaveBeenCalled();
      expect(grupoPagamentoService.addGrupoPagamentoToCollectionIfMissing).toHaveBeenCalledWith(
        grupoPagamentoCollection,
        ...additionalGrupoPagamentos.map(expect.objectContaining),
      );
      expect(comp.grupoPagamentosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tipoPagamento: ITipoPagamento = { id: 456 };
      const grupoPagamento: IGrupoPagamento = { id: 22194 };
      tipoPagamento.grupoPagamento = grupoPagamento;

      activatedRoute.data = of({ tipoPagamento });
      comp.ngOnInit();

      expect(comp.grupoPagamentosSharedCollection).toContain(grupoPagamento);
      expect(comp.tipoPagamento).toEqual(tipoPagamento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoPagamento>>();
      const tipoPagamento = { id: 123 };
      jest.spyOn(tipoPagamentoFormService, 'getTipoPagamento').mockReturnValue(tipoPagamento);
      jest.spyOn(tipoPagamentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoPagamento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoPagamento }));
      saveSubject.complete();

      // THEN
      expect(tipoPagamentoFormService.getTipoPagamento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoPagamentoService.update).toHaveBeenCalledWith(expect.objectContaining(tipoPagamento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoPagamento>>();
      const tipoPagamento = { id: 123 };
      jest.spyOn(tipoPagamentoFormService, 'getTipoPagamento').mockReturnValue({ id: null });
      jest.spyOn(tipoPagamentoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoPagamento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoPagamento }));
      saveSubject.complete();

      // THEN
      expect(tipoPagamentoFormService.getTipoPagamento).toHaveBeenCalled();
      expect(tipoPagamentoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoPagamento>>();
      const tipoPagamento = { id: 123 };
      jest.spyOn(tipoPagamentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoPagamento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoPagamentoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGrupoPagamento', () => {
      it('Should forward to grupoPagamentoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(grupoPagamentoService, 'compareGrupoPagamento');
        comp.compareGrupoPagamento(entity, entity2);
        expect(grupoPagamentoService.compareGrupoPagamento).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
