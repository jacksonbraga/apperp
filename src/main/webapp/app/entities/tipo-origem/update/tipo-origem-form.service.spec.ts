import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-origem.test-samples';

import { TipoOrigemFormService } from './tipo-origem-form.service';

describe('TipoOrigem Form Service', () => {
  let service: TipoOrigemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoOrigemFormService);
  });

  describe('Service methods', () => {
    describe('createTipoOrigemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoOrigemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoOrigems: expect.any(Object),
            caixas: expect.any(Object),
          }),
        );
      });

      it('passing ITipoOrigem should create a new form with FormGroup', () => {
        const formGroup = service.createTipoOrigemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoOrigems: expect.any(Object),
            caixas: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoOrigem', () => {
      it('should return NewTipoOrigem for default TipoOrigem initial value', () => {
        const formGroup = service.createTipoOrigemFormGroup(sampleWithNewData);

        const tipoOrigem = service.getTipoOrigem(formGroup) as any;

        expect(tipoOrigem).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoOrigem for empty TipoOrigem initial value', () => {
        const formGroup = service.createTipoOrigemFormGroup();

        const tipoOrigem = service.getTipoOrigem(formGroup) as any;

        expect(tipoOrigem).toMatchObject({});
      });

      it('should return ITipoOrigem', () => {
        const formGroup = service.createTipoOrigemFormGroup(sampleWithRequiredData);

        const tipoOrigem = service.getTipoOrigem(formGroup) as any;

        expect(tipoOrigem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoOrigem should not enable id FormControl', () => {
        const formGroup = service.createTipoOrigemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoOrigem should disable id FormControl', () => {
        const formGroup = service.createTipoOrigemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
