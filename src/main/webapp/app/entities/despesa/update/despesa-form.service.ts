import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDespesa, NewDespesa } from '../despesa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDespesa for edit and NewDespesaFormGroupInput for create.
 */
type DespesaFormGroupInput = IDespesa | PartialWithRequiredKeyOf<NewDespesa>;

type DespesaFormDefaults = Pick<NewDespesa, 'id'>;

type DespesaFormGroupContent = {
  id: FormControl<IDespesa['id'] | NewDespesa['id']>;
  descricao: FormControl<IDespesa['descricao']>;
  observacao: FormControl<IDespesa['observacao']>;
  parcela: FormControl<IDespesa['parcela']>;
  totalParcela: FormControl<IDespesa['totalParcela']>;
  valor: FormControl<IDespesa['valor']>;
  data: FormControl<IDespesa['data']>;

  valorPagamento: FormControl<IDespesa['valorPagamento']>;
  dataPagamento: FormControl<IDespesa['dataPagamento']>;

  dataVencimento: FormControl<IDespesa['dataVencimento']>;
  tipoDespesa: FormControl<IDespesa['tipoDespesa']>;
};

export type DespesaFormGroup = FormGroup<DespesaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DespesaFormService {
  createDespesaFormGroup(despesa: DespesaFormGroupInput = { id: null }): DespesaFormGroup {
    const despesaRawValue = {
      ...this.getFormDefaults(),
      ...despesa,
    };
    return new FormGroup<DespesaFormGroupContent>({
      id: new FormControl(
        { value: despesaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(despesaRawValue.descricao),
      observacao: new FormControl(despesaRawValue.observacao),
      parcela: new FormControl(despesaRawValue.parcela),
      totalParcela: new FormControl(despesaRawValue.totalParcela),
      valor: new FormControl(despesaRawValue.valor),
      data: new FormControl(despesaRawValue.data),

      valorPagamento: new FormControl(despesaRawValue.valorPagamento),
      dataPagamento: new FormControl(despesaRawValue.dataPagamento),

      dataVencimento: new FormControl(despesaRawValue.dataVencimento),
      tipoDespesa: new FormControl(despesaRawValue.tipoDespesa),
    });
  }

  getDespesa(form: DespesaFormGroup): IDespesa | NewDespesa {
    return form.getRawValue() as IDespesa | NewDespesa;
  }

  resetForm(form: DespesaFormGroup, despesa: DespesaFormGroupInput): void {
    const despesaRawValue = { ...this.getFormDefaults(), ...despesa };
    form.reset(
      {
        ...despesaRawValue,
        id: { value: despesaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DespesaFormDefaults {
    return {
      id: null,
    };
  }
}
