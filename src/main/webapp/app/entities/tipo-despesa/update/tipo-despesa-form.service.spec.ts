import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-despesa.test-samples';

import { TipoDespesaFormService } from './tipo-despesa-form.service';

describe('TipoDespesa Form Service', () => {
  let service: TipoDespesaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDespesaFormService);
  });

  describe('Service methods', () => {
    describe('createTipoDespesaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoDespesaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoDespesa: expect.any(Object),
          }),
        );
      });

      it('passing ITipoDespesa should create a new form with FormGroup', () => {
        const formGroup = service.createTipoDespesaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoDespesa: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoDespesa', () => {
      it('should return NewTipoDespesa for default TipoDespesa initial value', () => {
        const formGroup = service.createTipoDespesaFormGroup(sampleWithNewData);

        const tipoDespesa = service.getTipoDespesa(formGroup) as any;

        expect(tipoDespesa).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoDespesa for empty TipoDespesa initial value', () => {
        const formGroup = service.createTipoDespesaFormGroup();

        const tipoDespesa = service.getTipoDespesa(formGroup) as any;

        expect(tipoDespesa).toMatchObject({});
      });

      it('should return ITipoDespesa', () => {
        const formGroup = service.createTipoDespesaFormGroup(sampleWithRequiredData);

        const tipoDespesa = service.getTipoDespesa(formGroup) as any;

        expect(tipoDespesa).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoDespesa should not enable id FormControl', () => {
        const formGroup = service.createTipoDespesaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoDespesa should disable id FormControl', () => {
        const formGroup = service.createTipoDespesaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
