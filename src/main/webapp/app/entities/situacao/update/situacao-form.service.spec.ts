import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../situacao.test-samples';

import { SituacaoFormService } from './situacao-form.service';

describe('Situacao Form Service', () => {
  let service: SituacaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SituacaoFormService);
  });

  describe('Service methods', () => {
    describe('createSituacaoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSituacaoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });

      it('passing ISituacao should create a new form with FormGroup', () => {
        const formGroup = service.createSituacaoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });
    });

    describe('getSituacao', () => {
      it('should return NewSituacao for default Situacao initial value', () => {
        const formGroup = service.createSituacaoFormGroup(sampleWithNewData);

        const situacao = service.getSituacao(formGroup) as any;

        expect(situacao).toMatchObject(sampleWithNewData);
      });

      it('should return NewSituacao for empty Situacao initial value', () => {
        const formGroup = service.createSituacaoFormGroup();

        const situacao = service.getSituacao(formGroup) as any;

        expect(situacao).toMatchObject({});
      });

      it('should return ISituacao', () => {
        const formGroup = service.createSituacaoFormGroup(sampleWithRequiredData);

        const situacao = service.getSituacao(formGroup) as any;

        expect(situacao).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISituacao should not enable id FormControl', () => {
        const formGroup = service.createSituacaoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSituacao should disable id FormControl', () => {
        const formGroup = service.createSituacaoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
