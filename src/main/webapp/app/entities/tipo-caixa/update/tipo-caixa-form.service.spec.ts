import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-caixa.test-samples';

import { TipoCaixaFormService } from './tipo-caixa-form.service';

describe('TipoCaixa Form Service', () => {
  let service: TipoCaixaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCaixaFormService);
  });

  describe('Service methods', () => {
    describe('createTipoCaixaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoCaixaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoPagamento: expect.any(Object),
          }),
        );
      });

      it('passing ITipoCaixa should create a new form with FormGroup', () => {
        const formGroup = service.createTipoCaixaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoPagamento: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoCaixa', () => {
      it('should return NewTipoCaixa for default TipoCaixa initial value', () => {
        const formGroup = service.createTipoCaixaFormGroup(sampleWithNewData);

        const tipoCaixa = service.getTipoCaixa(formGroup) as any;

        expect(tipoCaixa).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoCaixa for empty TipoCaixa initial value', () => {
        const formGroup = service.createTipoCaixaFormGroup();

        const tipoCaixa = service.getTipoCaixa(formGroup) as any;

        expect(tipoCaixa).toMatchObject({});
      });

      it('should return ITipoCaixa', () => {
        const formGroup = service.createTipoCaixaFormGroup(sampleWithRequiredData);

        const tipoCaixa = service.getTipoCaixa(formGroup) as any;

        expect(tipoCaixa).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoCaixa should not enable id FormControl', () => {
        const formGroup = service.createTipoCaixaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoCaixa should disable id FormControl', () => {
        const formGroup = service.createTipoCaixaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
