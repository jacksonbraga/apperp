import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GrupoPagamentoService } from '../service/grupo-pagamento.service';
import { IGrupoPagamento } from '../grupo-pagamento.model';
import { GrupoPagamentoFormService } from './grupo-pagamento-form.service';

import { GrupoPagamentoUpdateComponent } from './grupo-pagamento-update.component';

describe('GrupoPagamento Management Update Component', () => {
  let comp: GrupoPagamentoUpdateComponent;
  let fixture: ComponentFixture<GrupoPagamentoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let grupoPagamentoFormService: GrupoPagamentoFormService;
  let grupoPagamentoService: GrupoPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), GrupoPagamentoUpdateComponent],
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
      .overrideTemplate(GrupoPagamentoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoPagamentoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    grupoPagamentoFormService = TestBed.inject(GrupoPagamentoFormService);
    grupoPagamentoService = TestBed.inject(GrupoPagamentoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const grupoPagamento: IGrupoPagamento = { id: 456 };

      activatedRoute.data = of({ grupoPagamento });
      comp.ngOnInit();

      expect(comp.grupoPagamento).toEqual(grupoPagamento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoPagamento>>();
      const grupoPagamento = { id: 123 };
      jest.spyOn(grupoPagamentoFormService, 'getGrupoPagamento').mockReturnValue(grupoPagamento);
      jest.spyOn(grupoPagamentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoPagamento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoPagamento }));
      saveSubject.complete();

      // THEN
      expect(grupoPagamentoFormService.getGrupoPagamento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(grupoPagamentoService.update).toHaveBeenCalledWith(expect.objectContaining(grupoPagamento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoPagamento>>();
      const grupoPagamento = { id: 123 };
      jest.spyOn(grupoPagamentoFormService, 'getGrupoPagamento').mockReturnValue({ id: null });
      jest.spyOn(grupoPagamentoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoPagamento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoPagamento }));
      saveSubject.complete();

      // THEN
      expect(grupoPagamentoFormService.getGrupoPagamento).toHaveBeenCalled();
      expect(grupoPagamentoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoPagamento>>();
      const grupoPagamento = { id: 123 };
      jest.spyOn(grupoPagamentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoPagamento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(grupoPagamentoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
