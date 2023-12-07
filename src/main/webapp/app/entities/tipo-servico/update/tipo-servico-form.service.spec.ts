import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tipo-servico.test-samples';

import { TipoServicoFormService } from './tipo-servico-form.service';

describe('TipoServico Form Service', () => {
  let service: TipoServicoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoServicoFormService);
  });

  describe('Service methods', () => {
    describe('createTipoServicoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoServicoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoServico: expect.any(Object),
          }),
        );
      });

      it('passing ITipoServico should create a new form with FormGroup', () => {
        const formGroup = service.createTipoServicoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            grupoServico: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoServico', () => {
      it('should return NewTipoServico for default TipoServico initial value', () => {
        const formGroup = service.createTipoServicoFormGroup(sampleWithNewData);

        const tipoServico = service.getTipoServico(formGroup) as any;

        expect(tipoServico).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoServico for empty TipoServico initial value', () => {
        const formGroup = service.createTipoServicoFormGroup();

        const tipoServico = service.getTipoServico(formGroup) as any;

        expect(tipoServico).toMatchObject({});
      });

      it('should return ITipoServico', () => {
        const formGroup = service.createTipoServicoFormGroup(sampleWithRequiredData);

        const tipoServico = service.getTipoServico(formGroup) as any;

        expect(tipoServico).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoServico should not enable id FormControl', () => {
        const formGroup = service.createTipoServicoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoServico should disable id FormControl', () => {
        const formGroup = service.createTipoServicoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
