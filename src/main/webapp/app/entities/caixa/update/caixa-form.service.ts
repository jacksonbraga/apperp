import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICaixa, NewCaixa } from '../caixa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICaixa for edit and NewCaixaFormGroupInput for create.
 */
type CaixaFormGroupInput = ICaixa | PartialWithRequiredKeyOf<NewCaixa>;

type CaixaFormDefaults = Pick<NewCaixa, 'id'>;

type CaixaFormGroupContent = {
  id: FormControl<ICaixa['id'] | NewCaixa['id']>;
  descricao: FormControl<ICaixa['descricao']>;
  observacao: FormControl<ICaixa['observacao']>;
  valor: FormControl<ICaixa['valor']>;

  valorEstimadoExtrato: FormControl<ICaixa['valorEstimadoExtrato']>;
  valorLancadoExtrato: FormControl<ICaixa['valorLancadoExtrato']>;
  valorTaxa: FormControl<ICaixa['valorTaxa']>;

  data: FormControl<ICaixa['data']>;
  dataEstimadaExtrato: FormControl<ICaixa['dataEstimadaExtrato']>;
  dataLancadaExtrato: FormControl<ICaixa['dataLancadaExtrato']>;

  tipoCaixa: FormControl<ICaixa['tipoCaixa']>;
  tipoOrigem: FormControl<ICaixa['tipoOrigem']>;
};

export type CaixaFormGroup = FormGroup<CaixaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CaixaFormService {
  createCaixaFormGroup(caixa: CaixaFormGroupInput = { id: null }): CaixaFormGroup {
    const caixaRawValue = {
      ...this.getFormDefaults(),
      ...caixa,
    };
    return new FormGroup<CaixaFormGroupContent>({
      id: new FormControl(
        { value: caixaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(caixaRawValue.descricao),
      observacao: new FormControl(caixaRawValue.observacao),
      valor: new FormControl(caixaRawValue.valor),

      valorEstimadoExtrato: new FormControl(caixaRawValue.valorEstimadoExtrato),
      valorLancadoExtrato: new FormControl(caixaRawValue.valorLancadoExtrato),
      valorTaxa: new FormControl(caixaRawValue.valorTaxa),

      data: new FormControl(caixaRawValue.data),

      dataEstimadaExtrato: new FormControl(caixaRawValue.dataEstimadaExtrato),
      dataLancadaExtrato: new FormControl(caixaRawValue.dataLancadaExtrato),

      tipoCaixa: new FormControl(caixaRawValue.tipoCaixa),
      tipoOrigem: new FormControl(caixaRawValue.tipoOrigem),
    });
  }

  getCaixa(form: CaixaFormGroup): ICaixa | NewCaixa {
    return form.getRawValue() as ICaixa | NewCaixa;
  }

  resetForm(form: CaixaFormGroup, caixa: CaixaFormGroupInput): void {
    const caixaRawValue = { ...this.getFormDefaults(), ...caixa };
    form.reset(
      {
        ...caixaRawValue,
        id: { value: caixaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CaixaFormDefaults {
    return {
      id: null,
    };
  }
}
