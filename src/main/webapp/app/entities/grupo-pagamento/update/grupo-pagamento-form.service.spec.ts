import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../grupo-pagamento.test-samples';

import { GrupoPagamentoFormService } from './grupo-pagamento-form.service';

describe('GrupoPagamento Form Service', () => {
  let service: GrupoPagamentoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoPagamentoFormService);
  });

  describe('Service methods', () => {
    describe('createGrupoPagamentoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGrupoPagamentoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });

      it('passing IGrupoPagamento should create a new form with FormGroup', () => {
        const formGroup = service.createGrupoPagamentoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });
    });

    describe('getGrupoPagamento', () => {
      it('should return NewGrupoPagamento for default GrupoPagamento initial value', () => {
        const formGroup = service.createGrupoPagamentoFormGroup(sampleWithNewData);

        const grupoPagamento = service.getGrupoPagamento(formGroup) as any;

        expect(grupoPagamento).toMatchObject(sampleWithNewData);
      });

      it('should return NewGrupoPagamento for empty GrupoPagamento initial value', () => {
        const formGroup = service.createGrupoPagamentoFormGroup();

        const grupoPagamento = service.getGrupoPagamento(formGroup) as any;

        expect(grupoPagamento).toMatchObject({});
      });

      it('should return IGrupoPagamento', () => {
        const formGroup = service.createGrupoPagamentoFormGroup(sampleWithRequiredData);

        const grupoPagamento = service.getGrupoPagamento(formGroup) as any;

        expect(grupoPagamento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGrupoPagamento should not enable id FormControl', () => {
        const formGroup = service.createGrupoPagamentoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGrupoPagamento should disable id FormControl', () => {
        const formGroup = service.createGrupoPagamentoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
