import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITipoServico, NewTipoServico } from '../tipo-servico.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoServico for edit and NewTipoServicoFormGroupInput for create.
 */
type TipoServicoFormGroupInput = ITipoServico | PartialWithRequiredKeyOf<NewTipoServico>;

type TipoServicoFormDefaults = Pick<NewTipoServico, 'id'>;

type TipoServicoFormGroupContent = {
  id: FormControl<ITipoServico['id'] | NewTipoServico['id']>;
  descricao: FormControl<ITipoServico['descricao']>;
  grupoServico: FormControl<ITipoServico['grupoServico']>;
};

export type TipoServicoFormGroup = FormGroup<TipoServicoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TipoServicoFormService {
  createTipoServicoFormGroup(tipoServico: TipoServicoFormGroupInput = { id: null }): TipoServicoFormGroup {
    const tipoServicoRawValue = {
      ...this.getFormDefaults(),
      ...tipoServico,
    };
    return new FormGroup<TipoServicoFormGroupContent>({
      id: new FormControl(
        { value: tipoServicoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(tipoServicoRawValue.descricao),
      grupoServico: new FormControl(tipoServicoRawValue.grupoServico),
    });
  }

  getTipoServico(form: TipoServicoFormGroup): ITipoServico | NewTipoServico {
    return form.getRawValue() as ITipoServico | NewTipoServico;
  }

  resetForm(form: TipoServicoFormGroup, tipoServico: TipoServicoFormGroupInput): void {
    const tipoServicoRawValue = { ...this.getFormDefaults(), ...tipoServico };
    form.reset(
      {
        ...tipoServicoRawValue,
        id: { value: tipoServicoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TipoServicoFormDefaults {
    return {
      id: null,
    };
  }
}
