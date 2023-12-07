import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICor } from 'app/entities/cor/cor.model';
import { CorService } from 'app/entities/cor/service/cor.service';
import { ControleComandaService } from '../service/controle-comanda.service';
import { IControleComanda } from '../controle-comanda.model';
import { ControleComandaFormService } from './controle-comanda-form.service';

import { ControleComandaUpdateComponent } from './controle-comanda-update.component';

describe('ControleComanda Management Update Component', () => {
  let comp: ControleComandaUpdateComponent;
  let fixture: ComponentFixture<ControleComandaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let controleComandaFormService: ControleComandaFormService;
  let controleComandaService: ControleComandaService;
  let corService: CorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ControleComandaUpdateComponent],
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
      .overrideTemplate(ControleComandaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ControleComandaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    controleComandaFormService = TestBed.inject(ControleComandaFormService);
    controleComandaService = TestBed.inject(ControleComandaService);
    corService = TestBed.inject(CorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cor query and add missing value', () => {
      const controleComanda: IControleComanda = { id: 456 };
      const cor: ICor = { id: 18926 };
      controleComanda.cor = cor;

      const corCollection: ICor[] = [{ id: 18731 }];
      jest.spyOn(corService, 'query').mockReturnValue(of(new HttpResponse({ body: corCollection })));
      const additionalCors = [cor];
      const expectedCollection: ICor[] = [...additionalCors, ...corCollection];
      jest.spyOn(corService, 'addCorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ controleComanda });
      comp.ngOnInit();

      expect(corService.query).toHaveBeenCalled();
      expect(corService.addCorToCollectionIfMissing).toHaveBeenCalledWith(corCollection, ...additionalCors.map(expect.objectContaining));
      expect(comp.corsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const controleComanda: IControleComanda = { id: 456 };
      const cor: ICor = { id: 14787 };
      controleComanda.cor = cor;

      activatedRoute.data = of({ controleComanda });
      comp.ngOnInit();

      expect(comp.corsSharedCollection).toContain(cor);
      expect(comp.controleComanda).toEqual(controleComanda);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IControleComanda>>();
      const controleComanda = { id: 123 };
      jest.spyOn(controleComandaFormService, 'getControleComanda').mockReturnValue(controleComanda);
      jest.spyOn(controleComandaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ controleComanda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: controleComanda }));
      saveSubject.complete();

      // THEN
      expect(controleComandaFormService.getControleComanda).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(controleComandaService.update).toHaveBeenCalledWith(expect.objectContaining(controleComanda));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IControleComanda>>();
      const controleComanda = { id: 123 };
      jest.spyOn(controleComandaFormService, 'getControleComanda').mockReturnValue({ id: null });
      jest.spyOn(controleComandaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ controleComanda: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: controleComanda }));
      saveSubject.complete();

      // THEN
      expect(controleComandaFormService.getControleComanda).toHaveBeenCalled();
      expect(controleComandaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IControleComanda>>();
      const controleComanda = { id: 123 };
      jest.spyOn(controleComandaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ controleComanda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(controleComandaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCor', () => {
      it('Should forward to corService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(corService, 'compareCor');
        comp.compareCor(entity, entity2);
        expect(corService.compareCor).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
