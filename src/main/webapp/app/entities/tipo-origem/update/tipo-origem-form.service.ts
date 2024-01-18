import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoOrigem, NewTipoOrigem } from '../tipo-origem.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoOrigem for edit and NewTipoOrigemFormGroupInput for create.
 */
type TipoOrigemFormGroupInput = ITipoOrigem | PartialWithRequiredKeyOf<NewTipoOrigem>;

type TipoOrigemFormDefaults = Pick<NewTipoOrigem, 'id' | 'grupoOrigems' | 'caixas'>;

type TipoOrigemFormGroupContent = {
  id: FormControl<ITipoOrigem['id'] | NewTipoOrigem['id']>;
  descricao: FormControl<ITipoOrigem['descricao']>;
  grupoOrigems: FormControl<ITipoOrigem['grupoOrigems']>;
  caixas: FormControl<ITipoOrigem['caixas']>;
};

export type TipoOrigemFormGroup = FormGroup<TipoOrigemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoOrigemFormService {
  createTipoOrigemFormGroup(tipoOrigem: TipoOrigemFormGroupInput = { id: null }): TipoOrigemFormGroup {
    const tipoOrigemRawValue = {
      ...this.getFormDefaults(),
      ...tipoOrigem,
    };
    return new FormGroup<TipoOrigemFormGroupContent>({
      id: new FormControl(
        { value: tipoOrigemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(tipoOrigemRawValue.descricao),
      grupoOrigems: new FormControl(tipoOrigemRawValue.grupoOrigems ?? []),
      caixas: new FormControl(tipoOrigemRawValue.caixas ?? []),
    });
  }

  getTipoOrigem(form: TipoOrigemFormGroup): ITipoOrigem | NewTipoOrigem {
    return form.getRawValue() as ITipoOrigem | NewTipoOrigem;
  }

  resetForm(form: TipoOrigemFormGroup, tipoOrigem: TipoOrigemFormGroupInput): void {
    const tipoOrigemRawValue = { ...this.getFormDefaults(), ...tipoOrigem };
    form.reset(
      {
        ...tipoOrigemRawValue,
        id: { value: tipoOrigemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TipoOrigemFormDefaults {
    return {
      id: null,
      grupoOrigems: [],
      caixas: [],
    };
  }
}
