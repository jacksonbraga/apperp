import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GrupoOrigemService } from '../service/grupo-origem.service';
import { IGrupoOrigem } from '../grupo-origem.model';
import { GrupoOrigemFormService } from './grupo-origem-form.service';

import { GrupoOrigemUpdateComponent } from './grupo-origem-update.component';

describe('GrupoOrigem Management Update Component', () => {
  let comp: GrupoOrigemUpdateComponent;
  let fixture: ComponentFixture<GrupoOrigemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let grupoOrigemFormService: GrupoOrigemFormService;
  let grupoOrigemService: GrupoOrigemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), GrupoOrigemUpdateComponent],
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
      .overrideTemplate(GrupoOrigemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoOrigemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    grupoOrigemFormService = TestBed.inject(GrupoOrigemFormService);
    grupoOrigemService = TestBed.inject(GrupoOrigemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const grupoOrigem: IGrupoOrigem = { id: 456 };

      activatedRoute.data = of({ grupoOrigem });
      comp.ngOnInit();

      expect(comp.grupoOrigem).toEqual(grupoOrigem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoOrigem>>();
      const grupoOrigem = { id: 123 };
      jest.spyOn(grupoOrigemFormService, 'getGrupoOrigem').mockReturnValue(grupoOrigem);
      jest.spyOn(grupoOrigemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoOrigem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoOrigem }));
      saveSubject.complete();

      // THEN
      expect(grupoOrigemFormService.getGrupoOrigem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(grupoOrigemService.update).toHaveBeenCalledWith(expect.objectContaining(grupoOrigem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoOrigem>>();
      const grupoOrigem = { id: 123 };
      jest.spyOn(grupoOrigemFormService, 'getGrupoOrigem').mockReturnValue({ id: null });
      jest.spyOn(grupoOrigemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoOrigem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoOrigem }));
      saveSubject.complete();

      // THEN
      expect(grupoOrigemFormService.getGrupoOrigem).toHaveBeenCalled();
      expect(grupoOrigemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoOrigem>>();
      const grupoOrigem = { id: 123 };
      jest.spyOn(grupoOrigemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoOrigem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(grupoOrigemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
