import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITipoPagamento } from 'app/entities/tipo-pagamento/tipo-pagamento.model';
import { TipoPagamentoService } from 'app/entities/tipo-pagamento/service/tipo-pagamento.service';
import { ITipoServico } from 'app/entities/tipo-servico/tipo-servico.model';
import { TipoServicoService } from 'app/entities/tipo-servico/service/tipo-servico.service';
import { IComanda } from 'app/entities/comanda/comanda.model';
import { ComandaService } from 'app/entities/comanda/service/comanda.service';
import { IItemComanda } from '../item-comanda.model';
import { ItemComandaService } from '../service/item-comanda.service';
import { ItemComandaFormService } from './item-comanda-form.service';

import { ItemComandaUpdateComponent } from './item-comanda-update.component';

describe('ItemComanda Management Update Component', () => {
  let comp: ItemComandaUpdateComponent;
  let fixture: ComponentFixture<ItemComandaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let itemComandaFormService: ItemComandaFormService;
  let itemComandaService: ItemComandaService;
  let tipoPagamentoService: TipoPagamentoService;
  let tipoServicoService: TipoServicoService;
  let comandaService: ComandaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ItemComandaUpdateComponent],
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
      .overrideTemplate(ItemComandaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemComandaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    itemComandaFormService = TestBed.inject(ItemComandaFormService);
    itemComandaService = TestBed.inject(ItemComandaService);
    tipoPagamentoService = TestBed.inject(TipoPagamentoService);
    tipoServicoService = TestBed.inject(TipoServicoService);
    comandaService = TestBed.inject(ComandaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TipoPagamento query and add missing value', () => {
      const itemComanda: IItemComanda = { id: 456 };
      const tipoPagamento: ITipoPagamento = { id: 32305 };
      itemComanda.tipoPagamento = tipoPagamento;

      const tipoPagamentoCollection: ITipoPagamento[] = [{ id: 24940 }];
      jest.spyOn(tipoPagamentoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoPagamentoCollection })));
      const additionalTipoPagamentos = [tipoPagamento];
      const expectedCollection: ITipoPagamento[] = [...additionalTipoPagamentos, ...tipoPagamentoCollection];
      jest.spyOn(tipoPagamentoService, 'addTipoPagamentoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemComanda });
      comp.ngOnInit();

      expect(tipoPagamentoService.query).toHaveBeenCalled();
      expect(tipoPagamentoService.addTipoPagamentoToCollectionIfMissing).toHaveBeenCalledWith(
        tipoPagamentoCollection,
        ...additionalTipoPagamentos.map(expect.objectContaining),
      );
      expect(comp.tipoPagamentosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TipoServico query and add missing value', () => {
      const itemComanda: IItemComanda = { id: 456 };
      const tipoServico: ITipoServico = { id: 20216 };
      itemComanda.tipoServico = tipoServico;

      const tipoServicoCollection: ITipoServico[] = [{ id: 27071 }];
      jest.spyOn(tipoServicoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoServicoCollection })));
      const additionalTipoServicos = [tipoServico];
      const expectedCollection: ITipoServico[] = [...additionalTipoServicos, ...tipoServicoCollection];
      jest.spyOn(tipoServicoService, 'addTipoServicoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemComanda });
      comp.ngOnInit();

      expect(tipoServicoService.query).toHaveBeenCalled();
      expect(tipoServicoService.addTipoServicoToCollectionIfMissing).toHaveBeenCalledWith(
        tipoServicoCollection,
        ...additionalTipoServicos.map(expect.objectContaining),
      );
      expect(comp.tipoServicosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Comanda query and add missing value', () => {
      const itemComanda: IItemComanda = { id: 456 };
      const comandaPai: IComanda = { id: 29732 };
      itemComanda.comandaPai = comandaPai;
      const comanda: IComanda = { id: 32085 };
      itemComanda.comanda = comanda;

      const comandaCollection: IComanda[] = [{ id: 10409 }];
      jest.spyOn(comandaService, 'query').mockReturnValue(of(new HttpResponse({ body: comandaCollection })));
      const additionalComandas = [comandaPai, comanda];
      const expectedCollection: IComanda[] = [...additionalComandas, ...comandaCollection];
      jest.spyOn(comandaService, 'addComandaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ itemComanda });
      comp.ngOnInit();

      expect(comandaService.query).toHaveBeenCalled();
      expect(comandaService.addComandaToCollectionIfMissing).toHaveBeenCalledWith(
        comandaCollection,
        ...additionalComandas.map(expect.objectContaining),
      );
      expect(comp.comandasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const itemComanda: IItemComanda = { id: 456 };
      const tipoPagamento: ITipoPagamento = { id: 2536 };
      itemComanda.tipoPagamento = tipoPagamento;
      const tipoServico: ITipoServico = { id: 10966 };
      itemComanda.tipoServico = tipoServico;
      const comandaPai: IComanda = { id: 507 };
      itemComanda.comandaPai = comandaPai;
      const comanda: IComanda = { id: 2414 };
      itemComanda.comanda = comanda;

      activatedRoute.data = of({ itemComanda });
      comp.ngOnInit();

      expect(comp.tipoPagamentosSharedCollection).toContain(tipoPagamento);
      expect(comp.tipoServicosSharedCollection).toContain(tipoServico);
      expect(comp.comandasSharedCollection).toContain(comandaPai);
      expect(comp.comandasSharedCollection).toContain(comanda);
      expect(comp.itemComanda).toEqual(itemComanda);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemComanda>>();
      const itemComanda = { id: 123 };
      jest.spyOn(itemComandaFormService, 'getItemComanda').mockReturnValue(itemComanda);
      jest.spyOn(itemComandaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemComanda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemComanda }));
      saveSubject.complete();

      // THEN
      expect(itemComandaFormService.getItemComanda).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(itemComandaService.update).toHaveBeenCalledWith(expect.objectContaining(itemComanda));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemComanda>>();
      const itemComanda = { id: 123 };
      jest.spyOn(itemComandaFormService, 'getItemComanda').mockReturnValue({ id: null });
      jest.spyOn(itemComandaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemComanda: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: itemComanda }));
      saveSubject.complete();

      // THEN
      expect(itemComandaFormService.getItemComanda).toHaveBeenCalled();
      expect(itemComandaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IItemComanda>>();
      const itemComanda = { id: 123 };
      jest.spyOn(itemComandaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ itemComanda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(itemComandaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTipoPagamento', () => {
      it('Should forward to tipoPagamentoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tipoPagamentoService, 'compareTipoPagamento');
        comp.compareTipoPagamento(entity, entity2);
        expect(tipoPagamentoService.compareTipoPagamento).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTipoServico', () => {
      it('Should forward to tipoServicoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tipoServicoService, 'compareTipoServico');
        comp.compareTipoServico(entity, entity2);
        expect(tipoServicoService.compareTipoServico).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareComanda', () => {
      it('Should forward to comandaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(comandaService, 'compareComanda');
        comp.compareComanda(entity, entity2);
        expect(comandaService.compareComanda).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
