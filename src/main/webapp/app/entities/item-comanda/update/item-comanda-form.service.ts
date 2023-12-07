import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IItemComanda, NewItemComanda } from '../item-comanda.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItemComanda for edit and NewItemComandaFormGroupInput for create.
 */
type ItemComandaFormGroupInput = IItemComanda | PartialWithRequiredKeyOf<NewItemComanda>;

type ItemComandaFormDefaults = Pick<NewItemComanda, 'id'>;

type ItemComandaFormGroupContent = {
  id: FormControl<IItemComanda['id'] | NewItemComanda['id']>;
  descricao: FormControl<IItemComanda['descricao']>;
  observacao: FormControl<IItemComanda['observacao']>;
  data: FormControl<IItemComanda['data']>;
  numero: FormControl<IItemComanda['numero']>;
  qtde: FormControl<IItemComanda['qtde']>;
  valor: FormControl<IItemComanda['valor']>;
  tipoPagamento: FormControl<IItemComanda['tipoPagamento']>;
  tipoServico: FormControl<IItemComanda['tipoServico']>;
  comandaPai: FormControl<IItemComanda['comandaPai']>;
  comanda: FormControl<IItemComanda['comanda']>;
};

export type ItemComandaFormGroup = FormGroup<ItemComandaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItemComandaFormService {
  createItemComandaFormGroup(itemComanda: ItemComandaFormGroupInput = { id: null }): ItemComandaFormGroup {
    const itemComandaRawValue = {
      ...this.getFormDefaults(),
      ...itemComanda,
    };
    return new FormGroup<ItemComandaFormGroupContent>({
      id: new FormControl(
        { value: itemComandaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(itemComandaRawValue.descricao),
      observacao: new FormControl(itemComandaRawValue.observacao),
      data: new FormControl(itemComandaRawValue.data),
      numero: new FormControl(itemComandaRawValue.numero),
      qtde: new FormControl(itemComandaRawValue.qtde),
      valor: new FormControl(itemComandaRawValue.valor),
      tipoPagamento: new FormControl(itemComandaRawValue.tipoPagamento),
      tipoServico: new FormControl(itemComandaRawValue.tipoServico),
      comandaPai: new FormControl(itemComandaRawValue.comandaPai),
      comanda: new FormControl(itemComandaRawValue.comanda),
    });
  }

  getItemComanda(form: ItemComandaFormGroup): IItemComanda | NewItemComanda {
    return form.getRawValue() as IItemComanda | NewItemComanda;
  }

  resetForm(form: ItemComandaFormGroup, itemComanda: ItemComandaFormGroupInput): void {
    const itemComandaRawValue = { ...this.getFormDefaults(), ...itemComanda };
    form.reset(
      {
        ...itemComandaRawValue,
        id: { value: itemComandaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ItemComandaFormDefaults {
    return {
      id: null,
    };
  }
}
