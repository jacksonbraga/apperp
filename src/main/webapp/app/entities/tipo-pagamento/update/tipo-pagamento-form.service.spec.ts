import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-pagamento.test-samples';

import { TipoPagamentoFormService } from './tipo-pagamento-form.service';

describe('TipoPagamento Form Service', () => {
  let service: TipoPagamentoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPagamentoFormService);
  });

  describe('Service methods', () => {
    describe('createTipoPagamentoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoPagamentoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoPagamento: expect.any(Object),
          }),
        );
      });

      it('passing ITipoPagamento should create a new form with FormGroup', () => {
        const formGroup = service.createTipoPagamentoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoPagamento: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoPagamento', () => {
      it('should return NewTipoPagamento for default TipoPagamento initial value', () => {
        const formGroup = service.createTipoPagamentoFormGroup(sampleWithNewData);

        const tipoPagamento = service.getTipoPagamento(formGroup) as any;

        expect(tipoPagamento).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoPagamento for empty TipoPagamento initial value', () => {
        const formGroup = service.createTipoPagamentoFormGroup();

        const tipoPagamento = service.getTipoPagamento(formGroup) as any;

        expect(tipoPagamento).toMatchObject({});
      });

      it('should return ITipoPagamento', () => {
        const formGroup = service.createTipoPagamentoFormGroup(sampleWithRequiredData);

        const tipoPagamento = service.getTipoPagamento(formGroup) as any;

        expect(tipoPagamento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoPagamento should not enable id FormControl', () => {
        const formGroup = service.createTipoPagamentoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoPagamento should disable id FormControl', () => {
        const formGroup = service.createTipoPagamentoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
