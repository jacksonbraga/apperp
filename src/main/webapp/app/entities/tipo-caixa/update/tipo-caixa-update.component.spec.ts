import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IGrupoPagamento } from 'app/entities/grupo-pagamento/grupo-pagamento.model';
import { GrupoPagamentoService } from 'app/entities/grupo-pagamento/service/grupo-pagamento.service';
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
  let grupoPagamentoService: GrupoPagamentoService;

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
    grupoPagamentoService = TestBed.inject(GrupoPagamentoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call grupoPagamento query and add missing value', () => {
      const tipoCaixa: ITipoCaixa = { id: 456 };
      const grupoPagamento: IGrupoPagamento = { id: 27892 };
      tipoCaixa.grupoPagamento = grupoPagamento;

      const grupoPagamentoCollection: IGrupoPagamento[] = [{ id: 14135 }];
      jest.spyOn(grupoPagamentoService, 'query').mockReturnValue(of(new HttpResponse({ body: grupoPagamentoCollection })));
      const expectedCollection: IGrupoPagamento[] = [grupoPagamento, ...grupoPagamentoCollection];
      jest.spyOn(grupoPagamentoService, 'addGrupoPagamentoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tipoCaixa });
      comp.ngOnInit();

      expect(grupoPagamentoService.query).toHaveBeenCalled();
      expect(grupoPagamentoService.addGrupoPagamentoToCollectionIfMissing).toHaveBeenCalledWith(grupoPagamentoCollection, grupoPagamento);
      expect(comp.grupoPagamentosCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tipoCaixa: ITipoCaixa = { id: 456 };
      const grupoPagamento: IGrupoPagamento = { id: 19676 };
      tipoCaixa.grupoPagamento = grupoPagamento;

      activatedRoute.data = of({ tipoCaixa });
      comp.ngOnInit();

      expect(comp.grupoPagamentosCollection).toContain(grupoPagamento);
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
