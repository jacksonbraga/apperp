import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITipoCaixa } from 'app/entities/tipo-caixa/tipo-caixa.model';
import { TipoCaixaService } from 'app/entities/tipo-caixa/service/tipo-caixa.service';
import { ITipoOrigem } from 'app/entities/tipo-origem/tipo-origem.model';
import { TipoOrigemService } from 'app/entities/tipo-origem/service/tipo-origem.service';
import { ICaixa } from '../caixa.model';
import { CaixaService } from '../service/caixa.service';
import { CaixaFormService } from './caixa-form.service';

import { CaixaUpdateComponent } from './caixa-update.component';

describe('Caixa Management Update Component', () => {
  let comp: CaixaUpdateComponent;
  let fixture: ComponentFixture<CaixaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let caixaFormService: CaixaFormService;
  let caixaService: CaixaService;
  let tipoCaixaService: TipoCaixaService;
  let tipoOrigemService: TipoOrigemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CaixaUpdateComponent],
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
      .overrideTemplate(CaixaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CaixaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    caixaFormService = TestBed.inject(CaixaFormService);
    caixaService = TestBed.inject(CaixaService);
    tipoCaixaService = TestBed.inject(TipoCaixaService);
    tipoOrigemService = TestBed.inject(TipoOrigemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call tipoCaixa query and add missing value', () => {
      const caixa: ICaixa = { id: 456 };
      const tipoCaixa: ITipoCaixa = { id: 4597 };
      caixa.tipoCaixa = tipoCaixa;

      const tipoCaixaCollection: ITipoCaixa[] = [{ id: 3974 }];
      jest.spyOn(tipoCaixaService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoCaixaCollection })));
      const expectedCollection: ITipoCaixa[] = [tipoCaixa, ...tipoCaixaCollection];
      jest.spyOn(tipoCaixaService, 'addTipoCaixaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ caixa });
      comp.ngOnInit();

      expect(tipoCaixaService.query).toHaveBeenCalled();
      expect(tipoCaixaService.addTipoCaixaToCollectionIfMissing).toHaveBeenCalledWith(tipoCaixaCollection, tipoCaixa);
      expect(comp.tipoCaixasCollection).toEqual(expectedCollection);
    });

    it('Should call tipoOrigem query and add missing value', () => {
      const caixa: ICaixa = { id: 456 };
      const tipoOrigem: ITipoOrigem = { id: 8453 };
      caixa.tipoOrigem = tipoOrigem;

      const tipoOrigemCollection: ITipoOrigem[] = [{ id: 8592 }];
      jest.spyOn(tipoOrigemService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoOrigemCollection })));
      const expectedCollection: ITipoOrigem[] = [tipoOrigem, ...tipoOrigemCollection];
      jest.spyOn(tipoOrigemService, 'addTipoOrigemToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ caixa });
      comp.ngOnInit();

      expect(tipoOrigemService.query).toHaveBeenCalled();
      expect(tipoOrigemService.addTipoOrigemToCollectionIfMissing).toHaveBeenCalledWith(tipoOrigemCollection, tipoOrigem);
      expect(comp.tipoOrigemsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const caixa: ICaixa = { id: 456 };
      const tipoCaixa: ITipoCaixa = { id: 12060 };
      caixa.tipoCaixa = tipoCaixa;
      const tipoOrigem: ITipoOrigem = { id: 914 };
      caixa.tipoOrigem = tipoOrigem;

      activatedRoute.data = of({ caixa });
      comp.ngOnInit();

      expect(comp.tipoCaixasCollection).toContain(tipoCaixa);
      expect(comp.tipoOrigemsCollection).toContain(tipoOrigem);
      expect(comp.caixa).toEqual(caixa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICaixa>>();
      const caixa = { id: 123 };
      jest.spyOn(caixaFormService, 'getCaixa').mockReturnValue(caixa);
      jest.spyOn(caixaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ caixa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: caixa }));
      saveSubject.complete();

      // THEN
      expect(caixaFormService.getCaixa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(caixaService.update).toHaveBeenCalledWith(expect.objectContaining(caixa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICaixa>>();
      const caixa = { id: 123 };
      jest.spyOn(caixaFormService, 'getCaixa').mockReturnValue({ id: null });
      jest.spyOn(caixaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ caixa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: caixa }));
      saveSubject.complete();

      // THEN
      expect(caixaFormService.getCaixa).toHaveBeenCalled();
      expect(caixaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICaixa>>();
      const caixa = { id: 123 };
      jest.spyOn(caixaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ caixa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(caixaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTipoCaixa', () => {
      it('Should forward to tipoCaixaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tipoCaixaService, 'compareTipoCaixa');
        comp.compareTipoCaixa(entity, entity2);
        expect(tipoCaixaService.compareTipoCaixa).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTipoOrigem', () => {
      it('Should forward to tipoOrigemService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tipoOrigemService, 'compareTipoOrigem');
        comp.compareTipoOrigem(entity, entity2);
        expect(tipoOrigemService.compareTipoOrigem).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
