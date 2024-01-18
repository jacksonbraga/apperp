import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IGrupoOrigem } from 'app/entities/grupo-origem/grupo-origem.model';
import { GrupoOrigemService } from 'app/entities/grupo-origem/service/grupo-origem.service';
import { TipoOrigemService } from '../service/tipo-origem.service';
import { ITipoOrigem } from '../tipo-origem.model';
import { TipoOrigemFormService } from './tipo-origem-form.service';

import { TipoOrigemUpdateComponent } from './tipo-origem-update.component';

describe('TipoOrigem Management Update Component', () => {
  let comp: TipoOrigemUpdateComponent;
  let fixture: ComponentFixture<TipoOrigemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoOrigemFormService: TipoOrigemFormService;
  let tipoOrigemService: TipoOrigemService;
  let grupoOrigemService: GrupoOrigemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TipoOrigemUpdateComponent],
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
      .overrideTemplate(TipoOrigemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoOrigemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoOrigemFormService = TestBed.inject(TipoOrigemFormService);
    tipoOrigemService = TestBed.inject(TipoOrigemService);
    grupoOrigemService = TestBed.inject(GrupoOrigemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call GrupoOrigem query and add missing value', () => {
      const tipoOrigem: ITipoOrigem = { id: 456 };
      const grupoOrigems: IGrupoOrigem[] = [{ id: 28033 }];
      tipoOrigem.grupoOrigems = grupoOrigems;

      const grupoOrigemCollection: IGrupoOrigem[] = [{ id: 28253 }];
      jest.spyOn(grupoOrigemService, 'query').mockReturnValue(of(new HttpResponse({ body: grupoOrigemCollection })));
      const additionalGrupoOrigems = [...grupoOrigems];
      const expectedCollection: IGrupoOrigem[] = [...additionalGrupoOrigems, ...grupoOrigemCollection];
      jest.spyOn(grupoOrigemService, 'addGrupoOrigemToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tipoOrigem });
      comp.ngOnInit();

      expect(grupoOrigemService.query).toHaveBeenCalled();
      expect(grupoOrigemService.addGrupoOrigemToCollectionIfMissing).toHaveBeenCalledWith(
        grupoOrigemCollection,
        ...additionalGrupoOrigems.map(expect.objectContaining),
      );
      expect(comp.grupoOrigemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tipoOrigem: ITipoOrigem = { id: 456 };
      const grupoOrigem: IGrupoOrigem = { id: 16785 };
      tipoOrigem.grupoOrigems = [grupoOrigem];

      activatedRoute.data = of({ tipoOrigem });
      comp.ngOnInit();

      expect(comp.grupoOrigemsSharedCollection).toContain(grupoOrigem);
      expect(comp.tipoOrigem).toEqual(tipoOrigem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoOrigem>>();
      const tipoOrigem = { id: 123 };
      jest.spyOn(tipoOrigemFormService, 'getTipoOrigem').mockReturnValue(tipoOrigem);
      jest.spyOn(tipoOrigemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoOrigem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoOrigem }));
      saveSubject.complete();

      // THEN
      expect(tipoOrigemFormService.getTipoOrigem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoOrigemService.update).toHaveBeenCalledWith(expect.objectContaining(tipoOrigem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoOrigem>>();
      const tipoOrigem = { id: 123 };
      jest.spyOn(tipoOrigemFormService, 'getTipoOrigem').mockReturnValue({ id: null });
      jest.spyOn(tipoOrigemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoOrigem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoOrigem }));
      saveSubject.complete();

      // THEN
      expect(tipoOrigemFormService.getTipoOrigem).toHaveBeenCalled();
      expect(tipoOrigemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoOrigem>>();
      const tipoOrigem = { id: 123 };
      jest.spyOn(tipoOrigemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoOrigem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoOrigemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGrupoOrigem', () => {
      it('Should forward to grupoOrigemService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(grupoOrigemService, 'compareGrupoOrigem');
        comp.compareGrupoOrigem(entity, entity2);
        expect(grupoOrigemService.compareGrupoOrigem).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
