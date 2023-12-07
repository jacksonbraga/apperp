import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../grupo-servico.test-samples';

import { GrupoServicoFormService } from './grupo-servico-form.service';

describe('GrupoServico Form Service', () => {
  let service: GrupoServicoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoServicoFormService);
  });

  describe('Service methods', () => {
    describe('createGrupoServicoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGrupoServicoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });

      it('passing IGrupoServico should create a new form with FormGroup', () => {
        const formGroup = service.createGrupoServicoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
          }),
        );
      });
    });

    describe('getGrupoServico', () => {
      it('should return NewGrupoServico for default GrupoServico initial value', () => {
        const formGroup = service.createGrupoServicoFormGroup(sampleWithNewData);

        const grupoServico = service.getGrupoServico(formGroup) as any;

        expect(grupoServico).toMatchObject(sampleWithNewData);
      });

      it('should return NewGrupoServico for empty GrupoServico initial value', () => {
        const formGroup = service.createGrupoServicoFormGroup();

        const grupoServico = service.getGrupoServico(formGroup) as any;

        expect(grupoServico).toMatchObject({});
      });

      it('should return IGrupoServico', () => {
        const formGroup = service.createGrupoServicoFormGroup(sampleWithRequiredData);

        const grupoServico = service.getGrupoServico(formGroup) as any;

        expect(grupoServico).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGrupoServico should not enable id FormControl', () => {
        const formGroup = service.createGrupoServicoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGrupoServico should disable id FormControl', () => {
        const formGroup = service.createGrupoServicoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
