import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoDespesa, NewTipoDespesa } from '../tipo-despesa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoDespesa for edit and NewTipoDespesaFormGroupInput for create.
 */
type TipoDespesaFormGroupInput = ITipoDespesa | PartialWithRequiredKeyOf<NewTipoDespesa>;

type TipoDespesaFormDefaults = Pick<NewTipoDespesa, 'id'>;

type TipoDespesaFormGroupContent = {
  id: FormControl<ITipoDespesa['id'] | NewTipoDespesa['id']>;
  descricao: FormControl<ITipoDespesa['descricao']>;
  grupoDespesa: FormControl<ITipoDespesa['grupoDespesa']>;
};

export type TipoDespesaFormGroup = FormGroup<TipoDespesaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoDespesaFormService {
  createTipoDespesaFormGroup(tipoDespesa: TipoDespesaFormGroupInput = { id: null }): TipoDespesaFormGroup {
    const tipoDespesaRawValue = {
      ...this.getFormDefaults(),
      ...tipoDespesa,
    };
    return new FormGroup<TipoDespesaFormGroupContent>({
      id: new FormControl(
        { value: tipoDespesaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(tipoDespesaRawValue.descricao),
      grupoDespesa: new FormControl(tipoDespesaRawValue.grupoDespesa),
    });
  }

  getTipoDespesa(form: TipoDespesaFormGroup): ITipoDespesa | NewTipoDespesa {
    return form.getRawValue() as ITipoDespesa | NewTipoDespesa;
  }

  resetForm(form: TipoDespesaFormGroup, tipoDespesa: TipoDespesaFormGroupInput): void {
    const tipoDespesaRawValue = { ...this.getFormDefaults(), ...tipoDespesa };
    form.reset(
      {
        ...tipoDespesaRawValue,
        id: { value: tipoDespesaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TipoDespesaFormDefaults {
    return {
      id: null,
    };
  }
}
