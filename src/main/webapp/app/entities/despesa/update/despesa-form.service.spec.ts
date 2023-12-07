import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../despesa.test-samples';

import { DespesaFormService } from './despesa-form.service';

describe('Despesa Form Service', () => {
  let service: DespesaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DespesaFormService);
  });

  describe('Service methods', () => {
    describe('createDespesaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDespesaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            observacao: expect.any(Object),
            parcela: expect.any(Object),
            totalParcela: expect.any(Object),
            valor: expect.any(Object),
            data: expect.any(Object),
            dataVencimento: expect.any(Object),
            tipoDespesa: expect.any(Object),
          }),
        );
      });

      it('passing IDespesa should create a new form with FormGroup', () => {
        const formGroup = service.createDespesaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            observacao: expect.any(Object),
            parcela: expect.any(Object),
            totalParcela: expect.any(Object),
            valor: expect.any(Object),
            data: expect.any(Object),
            dataVencimento: expect.any(Object),
            tipoDespesa: expect.any(Object),
          }),
        );
      });
    });

    describe('getDespesa', () => {
      it('should return NewDespesa for default Despesa initial value', () => {
        const formGroup = service.createDespesaFormGroup(sampleWithNewData);

        const despesa = service.getDespesa(formGroup) as any;

        expect(despesa).toMatchObject(sampleWithNewData);
      });

      it('should return NewDespesa for empty Despesa initial value', () => {
        const formGroup = service.createDespesaFormGroup();

        const despesa = service.getDespesa(formGroup) as any;

        expect(despesa).toMatchObject({});
      });

      it('should return IDespesa', () => {
        const formGroup = service.createDespesaFormGroup(sampleWithRequiredData);

        const despesa = service.getDespesa(formGroup) as any;

        expect(despesa).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDespesa should not enable id FormControl', () => {
        const formGroup = service.createDespesaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDespesa should disable id FormControl', () => {
        const formGroup = service.createDespesaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
