import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../grupo-despesa.test-samples';

import { GrupoDespesaFormService } from './grupo-despesa-form.service';

describe('GrupoDespesa Form Service', () => {
  let service: GrupoDespesaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoDespesaFormService);
  });

  describe('Service methods', () => {
    describe('createGrupoDespesaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGrupoDespesaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });

      it('passing IGrupoDespesa should create a new form with FormGroup', () => {
        const formGroup = service.createGrupoDespesaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });
    });

    describe('getGrupoDespesa', () => {
      it('should return NewGrupoDespesa for default GrupoDespesa initial value', () => {
        const formGroup = service.createGrupoDespesaFormGroup(sampleWithNewData);

        const grupoDespesa = service.getGrupoDespesa(formGroup) as any;

        expect(grupoDespesa).toMatchObject(sampleWithNewData);
      });

      it('should return NewGrupoDespesa for empty GrupoDespesa initial value', () => {
        const formGroup = service.createGrupoDespesaFormGroup();

        const grupoDespesa = service.getGrupoDespesa(formGroup) as any;

        expect(grupoDespesa).toMatchObject({});
      });

      it('should return IGrupoDespesa', () => {
        const formGroup = service.createGrupoDespesaFormGroup(sampleWithRequiredData);

        const grupoDespesa = service.getGrupoDespesa(formGroup) as any;

        expect(grupoDespesa).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGrupoDespesa should not enable id FormControl', () => {
        const formGroup = service.createGrupoDespesaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGrupoDespesa should disable id FormControl', () => {
        const formGroup = service.createGrupoDespesaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
