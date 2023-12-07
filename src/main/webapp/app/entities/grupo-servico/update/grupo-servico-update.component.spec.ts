import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GrupoServicoService } from '../service/grupo-servico.service';
import { IGrupoServico } from '../grupo-servico.model';
import { GrupoServicoFormService } from './grupo-servico-form.service';

import { GrupoServicoUpdateComponent } from './grupo-servico-update.component';

describe('GrupoServico Management Update Component', () => {
  let comp: GrupoServicoUpdateComponent;
  let fixture: ComponentFixture<GrupoServicoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let grupoServicoFormService: GrupoServicoFormService;
  let grupoServicoService: GrupoServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), GrupoServicoUpdateComponent],
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
      .overrideTemplate(GrupoServicoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoServicoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    grupoServicoFormService = TestBed.inject(GrupoServicoFormService);
    grupoServicoService = TestBed.inject(GrupoServicoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const grupoServico: IGrupoServico = { id: 456 };

      activatedRoute.data = of({ grupoServico });
      comp.ngOnInit();

      expect(comp.grupoServico).toEqual(grupoServico);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoServico>>();
      const grupoServico = { id: 123 };
      jest.spyOn(grupoServicoFormService, 'getGrupoServico').mockReturnValue(grupoServico);
      jest.spyOn(grupoServicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoServico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoServico }));
      saveSubject.complete();

      // THEN
      expect(grupoServicoFormService.getGrupoServico).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(grupoServicoService.update).toHaveBeenCalledWith(expect.objectContaining(grupoServico));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoServico>>();
      const grupoServico = { id: 123 };
      jest.spyOn(grupoServicoFormService, 'getGrupoServico').mockReturnValue({ id: null });
      jest.spyOn(grupoServicoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoServico: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoServico }));
      saveSubject.complete();

      // THEN
      expect(grupoServicoFormService.getGrupoServico).toHaveBeenCalled();
      expect(grupoServicoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoServico>>();
      const grupoServico = { id: 123 };
      jest.spyOn(grupoServicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoServico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(grupoServicoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
