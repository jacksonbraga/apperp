import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoCaixa, NewTipoCaixa } from '../tipo-caixa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoCaixa for edit and NewTipoCaixaFormGroupInput for create.
 */
type TipoCaixaFormGroupInput = ITipoCaixa | PartialWithRequiredKeyOf<NewTipoCaixa>;

type TipoCaixaFormDefaults = Pick<NewTipoCaixa, 'id'>;

type TipoCaixaFormGroupContent = {
  id: FormControl<ITipoCaixa['id'] | NewTipoCaixa['id']>;
  descricao: FormControl<ITipoCaixa['descricao']>;
  percTaxa: FormControl<ITipoCaixa['percTaxa']>;
  prazoExtrato: FormControl<ITipoCaixa['prazoExtrato']>;
  grupoPagamento: FormControl<ITipoCaixa['grupoPagamento']>;
};

export type TipoCaixaFormGroup = FormGroup<TipoCaixaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoCaixaFormService {
  createTipoCaixaFormGroup(tipoCaixa: TipoCaixaFormGroupInput = { id: null }): TipoCaixaFormGroup {
    const tipoCaixaRawValue = {
      ...this.getFormDefaults(),
      ...tipoCaixa,
    };
    return new FormGroup<TipoCaixaFormGroupContent>({
      id: new FormControl(
        { value: tipoCaixaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(tipoCaixaRawValue.descricao),
      percTaxa: new FormControl(tipoCaixaRawValue.percTaxa),
      prazoExtrato: new FormControl(tipoCaixaRawValue.prazoExtrato),
      grupoPagamento: new FormControl(tipoCaixaRawValue.grupoPagamento),
    });
  }

  getTipoCaixa(form: TipoCaixaFormGroup): ITipoCaixa | NewTipoCaixa {
    return form.getRawValue() as ITipoCaixa | NewTipoCaixa;
  }

  resetForm(form: TipoCaixaFormGroup, tipoCaixa: TipoCaixaFormGroupInput): void {
    const tipoCaixaRawValue = { ...this.getFormDefaults(), ...tipoCaixa };
    form.reset(
      {
        ...tipoCaixaRawValue,
        id: { value: tipoCaixaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TipoCaixaFormDefaults {
    return {
      id: null,
    };
  }
}
