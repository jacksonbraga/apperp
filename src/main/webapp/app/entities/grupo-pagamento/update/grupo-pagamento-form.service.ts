import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGrupoPagamento, NewGrupoPagamento } from '../grupo-pagamento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGrupoPagamento for edit and NewGrupoPagamentoFormGroupInput for create.
 */
type GrupoPagamentoFormGroupInput = IGrupoPagamento | PartialWithRequiredKeyOf<NewGrupoPagamento>;

type GrupoPagamentoFormDefaults = Pick<NewGrupoPagamento, 'id'>;

type GrupoPagamentoFormGroupContent = {
  id: FormControl<IGrupoPagamento['id'] | NewGrupoPagamento['id']>;
  descricao: FormControl<IGrupoPagamento['descricao']>;
};

export type GrupoPagamentoFormGroup = FormGroup<GrupoPagamentoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GrupoPagamentoFormService {
  createGrupoPagamentoFormGroup(grupoPagamento: GrupoPagamentoFormGroupInput = { id: null }): GrupoPagamentoFormGroup {
    const grupoPagamentoRawValue = {
      ...this.getFormDefaults(),
      ...grupoPagamento,
    };
    return new FormGroup<GrupoPagamentoFormGroupContent>({
      id: new FormControl(
        { value: grupoPagamentoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(grupoPagamentoRawValue.descricao),
    });
  }

  getGrupoPagamento(form: GrupoPagamentoFormGroup): IGrupoPagamento | NewGrupoPagamento {
    return form.getRawValue() as IGrupoPagamento | NewGrupoPagamento;
  }

  resetForm(form: GrupoPagamentoFormGroup, grupoPagamento: GrupoPagamentoFormGroupInput): void {
    const grupoPagamentoRawValue = { ...this.getFormDefaults(), ...grupoPagamento };
    form.reset(
      {
        ...grupoPagamentoRawValue,
        id: { value: grupoPagamentoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): GrupoPagamentoFormDefaults {
    return {
      id: null,
    };
  }
}
