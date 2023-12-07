import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ISituacao } from 'app/entities/situacao/situacao.model';
import { SituacaoService } from 'app/entities/situacao/service/situacao.service';
import { IControleComanda } from 'app/entities/controle-comanda/controle-comanda.model';
import { ControleComandaService } from 'app/entities/controle-comanda/service/controle-comanda.service';
import { IComanda } from '../comanda.model';
import { ComandaService } from '../service/comanda.service';
import { ComandaFormService } from './comanda-form.service';

import { ComandaUpdateComponent } from './comanda-update.component';

describe('Comanda Management Update Component', () => {
  let comp: ComandaUpdateComponent;
  let fixture: ComponentFixture<ComandaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let comandaFormService: ComandaFormService;
  let comandaService: ComandaService;
  let situacaoService: SituacaoService;
  let controleComandaService: ControleComandaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ComandaUpdateComponent],
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
      .overrideTemplate(ComandaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ComandaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    comandaFormService = TestBed.inject(ComandaFormService);
    comandaService = TestBed.inject(ComandaService);
    situacaoService = TestBed.inject(SituacaoService);
    controleComandaService = TestBed.inject(ControleComandaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Situacao query and add missing value', () => {
      const comanda: IComanda = { id: 456 };
      const situacao: ISituacao = { id: 32427 };
      comanda.situacao = situacao;

      const situacaoCollection: ISituacao[] = [{ id: 3414 }];
      jest.spyOn(situacaoService, 'query').mockReturnValue(of(new HttpResponse({ body: situacaoCollection })));
      const additionalSituacaos = [situacao];
      const expectedCollection: ISituacao[] = [...additionalSituacaos, ...situacaoCollection];
      jest.spyOn(situacaoService, 'addSituacaoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ comanda });
      comp.ngOnInit();

      expect(situacaoService.query).toHaveBeenCalled();
      expect(situacaoService.addSituacaoToCollectionIfMissing).toHaveBeenCalledWith(
        situacaoCollection,
        ...additionalSituacaos.map(expect.objectContaining),
      );
      expect(comp.situacaosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ControleComanda query and add missing value', () => {
      const comanda: IComanda = { id: 456 };
      const controle: IControleComanda = { id: 29532 };
      comanda.controle = controle;
      const controleComanda: IControleComanda = { id: 25735 };
      comanda.controleComanda = controleComanda;

      const controleComandaCollection: IControleComanda[] = [{ id: 3878 }];
      jest.spyOn(controleComandaService, 'query').mockReturnValue(of(new HttpResponse({ body: controleComandaCollection })));
      const additionalControleComandas = [controle, controleComanda];
      const expectedCollection: IControleComanda[] = [...additionalControleComandas, ...controleComandaCollection];
      jest.spyOn(controleComandaService, 'addControleComandaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ comanda });
      comp.ngOnInit();

      expect(controleComandaService.query).toHaveBeenCalled();
      expect(controleComandaService.addControleComandaToCollectionIfMissing).toHaveBeenCalledWith(
        controleComandaCollection,
        ...additionalControleComandas.map(expect.objectContaining),
      );
      expect(comp.controleComandasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const comanda: IComanda = { id: 456 };
      const situacao: ISituacao = { id: 29053 };
      comanda.situacao = situacao;
      const controle: IControleComanda = { id: 4931 };
      comanda.controle = controle;
      const controleComanda: IControleComanda = { id: 19189 };
      comanda.controleComanda = controleComanda;

      activatedRoute.data = of({ comanda });
      comp.ngOnInit();

      expect(comp.situacaosSharedCollection).toContain(situacao);
      expect(comp.controleComandasSharedCollection).toContain(controle);
      expect(comp.controleComandasSharedCollection).toContain(controleComanda);
      expect(comp.comanda).toEqual(comanda);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IComanda>>();
      const comanda = { id: 123 };
      jest.spyOn(comandaFormService, 'getComanda').mockReturnValue(comanda);
      jest.spyOn(comandaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ comanda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: comanda }));
      saveSubject.complete();

      // THEN
      expect(comandaFormService.getComanda).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(comandaService.update).toHaveBeenCalledWith(expect.objectContaining(comanda));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IComanda>>();
      const comanda = { id: 123 };
      jest.spyOn(comandaFormService, 'getComanda').mockReturnValue({ id: null });
      jest.spyOn(comandaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ comanda: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: comanda }));
      saveSubject.complete();

      // THEN
      expect(comandaFormService.getComanda).toHaveBeenCalled();
      expect(comandaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IComanda>>();
      const comanda = { id: 123 };
      jest.spyOn(comandaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ comanda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(comandaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSituacao', () => {
      it('Should forward to situacaoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(situacaoService, 'compareSituacao');
        comp.compareSituacao(entity, entity2);
        expect(situacaoService.compareSituacao).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareControleComanda', () => {
      it('Should forward to controleComandaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(controleComandaService, 'compareControleComanda');
        comp.compareControleComanda(entity, entity2);
        expect(controleComandaService.compareControleComanda).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
