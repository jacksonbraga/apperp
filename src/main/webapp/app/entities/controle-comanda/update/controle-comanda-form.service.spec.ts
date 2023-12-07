import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../controle-comanda.test-samples';

import { ControleComandaFormService } from './controle-comanda-form.service';

describe('ControleComanda Form Service', () => {
  let service: ControleComandaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleComandaFormService);
  });

  describe('Service methods', () => {
    describe('createControleComandaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createControleComandaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            faixaInicio: expect.any(Object),
            faixaFim: expect.any(Object),
            data: expect.any(Object),
            cor: expect.any(Object),
          }),
        );
      });

      it('passing IControleComanda should create a new form with FormGroup', () => {
        const formGroup = service.createControleComandaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            faixaInicio: expect.any(Object),
            faixaFim: expect.any(Object),
            data: expect.any(Object),
            cor: expect.any(Object),
          }),
        );
      });
    });

    describe('getControleComanda', () => {
      it('should return NewControleComanda for default ControleComanda initial value', () => {
        const formGroup = service.createControleComandaFormGroup(sampleWithNewData);

        const controleComanda = service.getControleComanda(formGroup) as any;

        expect(controleComanda).toMatchObject(sampleWithNewData);
      });

      it('should return NewControleComanda for empty ControleComanda initial value', () => {
        const formGroup = service.createControleComandaFormGroup();

        const controleComanda = service.getControleComanda(formGroup) as any;

        expect(controleComanda).toMatchObject({});
      });

      it('should return IControleComanda', () => {
        const formGroup = service.createControleComandaFormGroup(sampleWithRequiredData);

        const controleComanda = service.getControleComanda(formGroup) as any;

        expect(controleComanda).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IControleComanda should not enable id FormControl', () => {
        const formGroup = service.createControleComandaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewControleComanda should disable id FormControl', () => {
        const formGroup = service.createControleComandaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
