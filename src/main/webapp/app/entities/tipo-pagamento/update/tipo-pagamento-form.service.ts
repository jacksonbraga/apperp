import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoPagamento, NewTipoPagamento } from '../tipo-pagamento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoPagamento for edit and NewTipoPagamentoFormGroupInput for create.
 */
type TipoPagamentoFormGroupInput = ITipoPagamento | PartialWithRequiredKeyOf<NewTipoPagamento>;

type TipoPagamentoFormDefaults = Pick<NewTipoPagamento, 'id'>;

type TipoPagamentoFormGroupContent = {
  id: FormControl<ITipoPagamento['id'] | NewTipoPagamento['id']>;
  descricao: FormControl<ITipoPagamento['descricao']>;
  grupoPagamento: FormControl<ITipoPagamento['grupoPagamento']>;
};

export type TipoPagamentoFormGroup = FormGroup<TipoPagamentoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoPagamentoFormService {
  createTipoPagamentoFormGroup(tipoPagamento: TipoPagamentoFormGroupInput = { id: null }): TipoPagamentoFormGroup {
    const tipoPagamentoRawValue = {
      ...this.getFormDefaults(),
      ...tipoPagamento,
    };
    return new FormGroup<TipoPagamentoFormGroupContent>({
      id: new FormControl(
        { value: tipoPagamentoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(tipoPagamentoRawValue.descricao),
      grupoPagamento: new FormControl(tipoPagamentoRawValue.grupoPagamento),
    });
  }

  getTipoPagamento(form: TipoPagamentoFormGroup): ITipoPagamento | NewTipoPagamento {
    return form.getRawValue() as ITipoPagamento | NewTipoPagamento;
  }

  resetForm(form: TipoPagamentoFormGroup, tipoPagamento: TipoPagamentoFormGroupInput): void {
    const tipoPagamentoRawValue = { ...this.getFormDefaults(), ...tipoPagamento };
    form.reset(
      {
        ...tipoPagamentoRawValue,
        id: { value: tipoPagamentoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TipoPagamentoFormDefaults {
    return {
      id: null,
    };
  }
}
