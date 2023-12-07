import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../comanda.test-samples';

import { ComandaFormService } from './comanda-form.service';

describe('Comanda Form Service', () => {
  let service: ComandaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComandaFormService);
  });

  describe('Service methods', () => {
    describe('createComandaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createComandaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            observacao: expect.any(Object),
            data: expect.any(Object),
            numero: expect.any(Object),
            situacao: expect.any(Object),
            controle: expect.any(Object),
            controleComanda: expect.any(Object),
          }),
        );
      });

      it('passing IComanda should create a new form with FormGroup', () => {
        const formGroup = service.createComandaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            observacao: expect.any(Object),
            data: expect.any(Object),
            numero: expect.any(Object),
            situacao: expect.any(Object),
            controle: expect.any(Object),
            controleComanda: expect.any(Object),
          }),
        );
      });
    });

    describe('getComanda', () => {
      it('should return NewComanda for default Comanda initial value', () => {
        const formGroup = service.createComandaFormGroup(sampleWithNewData);

        const comanda = service.getComanda(formGroup) as any;

        expect(comanda).toMatchObject(sampleWithNewData);
      });

      it('should return NewComanda for empty Comanda initial value', () => {
        const formGroup = service.createComandaFormGroup();

        const comanda = service.getComanda(formGroup) as any;

        expect(comanda).toMatchObject({});
      });

      it('should return IComanda', () => {
        const formGroup = service.createComandaFormGroup(sampleWithRequiredData);

        const comanda = service.getComanda(formGroup) as any;

        expect(comanda).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IComanda should not enable id FormControl', () => {
        const formGroup = service.createComandaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewComanda should disable id FormControl', () => {
        const formGroup = service.createComandaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
