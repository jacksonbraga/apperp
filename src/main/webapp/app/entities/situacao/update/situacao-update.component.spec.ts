import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SituacaoService } from '../service/situacao.service';
import { ISituacao } from '../situacao.model';
import { SituacaoFormService } from './situacao-form.service';

import { SituacaoUpdateComponent } from './situacao-update.component';

describe('Situacao Management Update Component', () => {
  let comp: SituacaoUpdateComponent;
  let fixture: ComponentFixture<SituacaoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let situacaoFormService: SituacaoFormService;
  let situacaoService: SituacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), SituacaoUpdateComponent],
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
      .overrideTemplate(SituacaoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SituacaoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    situacaoFormService = TestBed.inject(SituacaoFormService);
    situacaoService = TestBed.inject(SituacaoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const situacao: ISituacao = { id: 456 };

      activatedRoute.data = of({ situacao });
      comp.ngOnInit();

      expect(comp.situacao).toEqual(situacao);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISituacao>>();
      const situacao = { id: 123 };
      jest.spyOn(situacaoFormService, 'getSituacao').mockReturnValue(situacao);
      jest.spyOn(situacaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ situacao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: situacao }));
      saveSubject.complete();

      // THEN
      expect(situacaoFormService.getSituacao).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(situacaoService.update).toHaveBeenCalledWith(expect.objectContaining(situacao));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISituacao>>();
      const situacao = { id: 123 };
      jest.spyOn(situacaoFormService, 'getSituacao').mockReturnValue({ id: null });
      jest.spyOn(situacaoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ situacao: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: situacao }));
      saveSubject.complete();

      // THEN
      expect(situacaoFormService.getSituacao).toHaveBeenCalled();
      expect(situacaoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISituacao>>();
      const situacao = { id: 123 };
      jest.spyOn(situacaoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ situacao });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(situacaoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
