import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../item-comanda.test-samples';

import { ItemComandaFormService } from './item-comanda-form.service';

describe('ItemComanda Form Service', () => {
  let service: ItemComandaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemComandaFormService);
  });

  describe('Service methods', () => {
    describe('createItemComandaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createItemComandaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            observacao: expect.any(Object),
            data: expect.any(Object),
            numero: expect.any(Object),
            qtde: expect.any(Object),
            valor: expect.any(Object),
            tipoPagamento: expect.any(Object),
            tipoServico: expect.any(Object),
            comandaPai: expect.any(Object),
            comanda: expect.any(Object),
          }),
        );
      });

      it('passing IItemComanda should create a new form with FormGroup', () => {
        const formGroup = service.createItemComandaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descricao: expect.any(Object),
            observacao: expect.any(Object),
            data: expect.any(Object),
            numero: expect.any(Object),
            qtde: expect.any(Object),
            valor: expect.any(Object),
            tipoPagamento: expect.any(Object),
            tipoServico: expect.any(Object),
            comandaPai: expect.any(Object),
            comanda: expect.any(Object),
          }),
        );
      });
    });

    describe('getItemComanda', () => {
      it('should return NewItemComanda for default ItemComanda initial value', () => {
        const formGroup = service.createItemComandaFormGroup(sampleWithNewData);

        const itemComanda = service.getItemComanda(formGroup) as any;

        expect(itemComanda).toMatchObject(sampleWithNewData);
      });

      it('should return NewItemComanda for empty ItemComanda initial value', () => {
        const formGroup = service.createItemComandaFormGroup();

        const itemComanda = service.getItemComanda(formGroup) as any;

        expect(itemComanda).toMatchObject({});
      });

      it('should return IItemComanda', () => {
        const formGroup = service.createItemComandaFormGroup(sampleWithRequiredData);

        const itemComanda = service.getItemComanda(formGroup) as any;

        expect(itemComanda).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IItemComanda should not enable id FormControl', () => {
        const formGroup = service.createItemComandaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewItemComanda should disable id FormControl', () => {
        const formGroup = service.createItemComandaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
