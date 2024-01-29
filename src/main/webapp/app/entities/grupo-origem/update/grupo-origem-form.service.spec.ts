import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../grupo-origem.test-samples';

import { GrupoOrigemFormService } from './grupo-origem-form.service';

describe('GrupoOrigem Form Service', () => {
  let service: GrupoOrigemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoOrigemFormService);
  });

  describe('Service methods', () => {
    describe('createGrupoOrigemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGrupoOrigemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });

      it('passing IGrupoOrigem should create a new form with FormGroup', () => {
        const formGroup = service.createGrupoOrigemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });
    });

    describe('getGrupoOrigem', () => {
      it('should return NewGrupoOrigem for default GrupoOrigem initial value', () => {
        const formGroup = service.createGrupoOrigemFormGroup(sampleWithNewData);

        const grupoOrigem = service.getGrupoOrigem(formGroup) as any;

        expect(grupoOrigem).toMatchObject(sampleWithNewData);
      });

      it('should return NewGrupoOrigem for empty GrupoOrigem initial value', () => {
        const formGroup = service.createGrupoOrigemFormGroup();

        const grupoOrigem = service.getGrupoOrigem(formGroup) as any;

        expect(grupoOrigem).toMatchObject({});
      });

      it('should return IGrupoOrigem', () => {
        const formGroup = service.createGrupoOrigemFormGroup(sampleWithRequiredData);

        const grupoOrigem = service.getGrupoOrigem(formGroup) as any;

        expect(grupoOrigem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGrupoOrigem should not enable id FormControl', () => {
        const formGroup = service.createGrupoOrigemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGrupoOrigem should disable id FormControl', () => {
        const formGroup = service.createGrupoOrigemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
