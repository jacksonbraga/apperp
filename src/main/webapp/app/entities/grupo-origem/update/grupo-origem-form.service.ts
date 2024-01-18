import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGrupoOrigem, NewGrupoOrigem } from '../grupo-origem.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGrupoOrigem for edit and NewGrupoOrigemFormGroupInput for create.
 */
type GrupoOrigemFormGroupInput = IGrupoOrigem | PartialWithRequiredKeyOf<NewGrupoOrigem>;

type GrupoOrigemFormDefaults = Pick<NewGrupoOrigem, 'id' | 'tipoOrigems'>;

type GrupoOrigemFormGroupContent = {
  id: FormControl<IGrupoOrigem['id'] | NewGrupoOrigem['id']>;
  descricao: FormControl<IGrupoOrigem['descricao']>;
  tipoOrigems: FormControl<IGrupoOrigem['tipoOrigems']>;
};

export type GrupoOrigemFormGroup = FormGroup<GrupoOrigemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GrupoOrigemFormService {
  createGrupoOrigemFormGroup(grupoOrigem: GrupoOrigemFormGroupInput = { id: null }): GrupoOrigemFormGroup {
    const grupoOrigemRawValue = {
      ...this.getFormDefaults(),
      ...grupoOrigem,
    };
    return new FormGroup<GrupoOrigemFormGroupContent>({
      id: new FormControl(
        { value: grupoOrigemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(grupoOrigemRawValue.descricao),
      tipoOrigems: new FormControl(grupoOrigemRawValue.tipoOrigems ?? []),
    });
  }

  getGrupoOrigem(form: GrupoOrigemFormGroup): IGrupoOrigem | NewGrupoOrigem {
    return form.getRawValue() as IGrupoOrigem | NewGrupoOrigem;
  }

  resetForm(form: GrupoOrigemFormGroup, grupoOrigem: GrupoOrigemFormGroupInput): void {
    const grupoOrigemRawValue = { ...this.getFormDefaults(), ...grupoOrigem };
    form.reset(
      {
        ...grupoOrigemRawValue,
        id: { value: grupoOrigemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): GrupoOrigemFormDefaults {
    return {
      id: null,
      tipoOrigems: [],
    };
  }
}
