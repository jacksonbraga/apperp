import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IGrupoServico } from 'app/entities/grupo-servico/grupo-servico.model';
import { GrupoServicoService } from 'app/entities/grupo-servico/service/grupo-servico.service';
import { TipoServicoService } from '../service/tipo-servico.service';
import { ITipoServico } from '../tipo-servico.model';
import { TipoServicoFormService } from './tipo-servico-form.service';

import { TipoServicoUpdateComponent } from './tipo-servico-update.component';

describe('TipoServico Management Update Component', () => {
  let comp: TipoServicoUpdateComponent;
  let fixture: ComponentFixture<TipoServicoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoServicoFormService: TipoServicoFormService;
  let tipoServicoService: TipoServicoService;
  let grupoServicoService: GrupoServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TipoServicoUpdateComponent],
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
      .overrideTemplate(TipoServicoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoServicoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoServicoFormService = TestBed.inject(TipoServicoFormService);
    tipoServicoService = TestBed.inject(TipoServicoService);
    grupoServicoService = TestBed.inject(GrupoServicoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call GrupoServico query and add missing value', () => {
      const tipoServico: ITipoServico = { id: 456 };
      const grupoServico: IGrupoServico = { id: 13304 };
      tipoServico.grupoServico = grupoServico;

      const grupoServicoCollection: IGrupoServico[] = [{ id: 22077 }];
      jest.spyOn(grupoServicoService, 'query').mockReturnValue(of(new HttpResponse({ body: grupoServicoCollection })));
      const additionalGrupoServicos = [grupoServico];
      const expectedCollection: IGrupoServico[] = [...additionalGrupoServicos, ...grupoServicoCollection];
      jest.spyOn(grupoServicoService, 'addGrupoServicoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tipoServico });
      comp.ngOnInit();

      expect(grupoServicoService.query).toHaveBeenCalled();
      expect(grupoServicoService.addGrupoServicoToCollectionIfMissing).toHaveBeenCalledWith(
        grupoServicoCollection,
        ...additionalGrupoServicos.map(expect.objectContaining),
      );
      expect(comp.grupoServicosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tipoServico: ITipoServico = { id: 456 };
      const grupoServico: IGrupoServico = { id: 22459 };
      tipoServico.grupoServico = grupoServico;

      activatedRoute.data = of({ tipoServico });
      comp.ngOnInit();

      expect(comp.grupoServicosSharedCollection).toContain(grupoServico);
      expect(comp.tipoServico).toEqual(tipoServico);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoServico>>();
      const tipoServico = { id: 123 };
      jest.spyOn(tipoServicoFormService, 'getTipoServico').mockReturnValue(tipoServico);
      jest.spyOn(tipoServicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoServico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoServico }));
      saveSubject.complete();

      // THEN
      expect(tipoServicoFormService.getTipoServico).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoServicoService.update).toHaveBeenCalledWith(expect.objectContaining(tipoServico));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoServico>>();
      const tipoServico = { id: 123 };
      jest.spyOn(tipoServicoFormService, 'getTipoServico').mockReturnValue({ id: null });
      jest.spyOn(tipoServicoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoServico: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoServico }));
      saveSubject.complete();

      // THEN
      expect(tipoServicoFormService.getTipoServico).toHaveBeenCalled();
      expect(tipoServicoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoServico>>();
      const tipoServico = { id: 123 };
      jest.spyOn(tipoServicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoServico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoServicoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGrupoServico', () => {
      it('Should forward to grupoServicoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(grupoServicoService, 'compareGrupoServico');
        comp.compareGrupoServico(entity, entity2);
        expect(grupoServicoService.compareGrupoServico).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
