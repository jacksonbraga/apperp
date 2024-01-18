import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../grupo-caixa.test-samples';

import { GrupoCaixaFormService } from './grupo-caixa-form.service';

describe('GrupoCaixa Form Service', () => {
  let service: GrupoCaixaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoCaixaFormService);
  });

  describe('Service methods', () => {
    describe('createGrupoCaixaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGrupoCaixaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            tipoCaixas: expect.any(Object),
          }),
        );
      });

      it('passing IGrupoCaixa should create a new form with FormGroup', () => {
        const formGroup = service.createGrupoCaixaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            tipoCaixas: expect.any(Object),
          }),
        );
      });
    });

    describe('getGrupoCaixa', () => {
      it('should return NewGrupoCaixa for default GrupoCaixa initial value', () => {
        const formGroup = service.createGrupoCaixaFormGroup(sampleWithNewData);

        const grupoCaixa = service.getGrupoCaixa(formGroup) as any;

        expect(grupoCaixa).toMatchObject(sampleWithNewData);
      });

      it('should return NewGrupoCaixa for empty GrupoCaixa initial value', () => {
        const formGroup = service.createGrupoCaixaFormGroup();

        const grupoCaixa = service.getGrupoCaixa(formGroup) as any;

        expect(grupoCaixa).toMatchObject({});
      });

      it('should return IGrupoCaixa', () => {
        const formGroup = service.createGrupoCaixaFormGroup(sampleWithRequiredData);

        const grupoCaixa = service.getGrupoCaixa(formGroup) as any;

        expect(grupoCaixa).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGrupoCaixa should not enable id FormControl', () => {
        const formGroup = service.createGrupoCaixaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGrupoCaixa should disable id FormControl', () => {
        const formGroup = service.createGrupoCaixaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
