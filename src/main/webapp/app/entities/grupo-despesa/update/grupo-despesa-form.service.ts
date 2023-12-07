import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGrupoDespesa, NewGrupoDespesa } from '../grupo-despesa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGrupoDespesa for edit and NewGrupoDespesaFormGroupInput for create.
 */
type GrupoDespesaFormGroupInput = IGrupoDespesa | PartialWithRequiredKeyOf<NewGrupoDespesa>;

type GrupoDespesaFormDefaults = Pick<NewGrupoDespesa, 'id'>;

type GrupoDespesaFormGroupContent = {
  id: FormControl<IGrupoDespesa['id'] | NewGrupoDespesa['id']>;
  descricao: FormControl<IGrupoDespesa['descricao']>;
};

export type GrupoDespesaFormGroup = FormGroup<GrupoDespesaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GrupoDespesaFormService {
  createGrupoDespesaFormGroup(grupoDespesa: GrupoDespesaFormGroupInput = { id: null }): GrupoDespesaFormGroup {
    const grupoDespesaRawValue = {
      ...this.getFormDefaults(),
      ...grupoDespesa,
    };
    return new FormGroup<GrupoDespesaFormGroupContent>({
      id: new FormControl(
        { value: grupoDespesaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(grupoDespesaRawValue.descricao),
    });
  }

  getGrupoDespesa(form: GrupoDespesaFormGroup): IGrupoDespesa | NewGrupoDespesa {
    return form.getRawValue() as IGrupoDespesa | NewGrupoDespesa;
  }

  resetForm(form: GrupoDespesaFormGroup, grupoDespesa: GrupoDespesaFormGroupInput): void {
    const grupoDespesaRawValue = { ...this.getFormDefaults(), ...grupoDespesa };
    form.reset(
      {
        ...grupoDespesaRawValue,
        id: { value: grupoDespesaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): GrupoDespesaFormDefaults {
    return {
      id: null,
    };
  }
}
