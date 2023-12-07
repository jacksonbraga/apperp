import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGrupoServico, NewGrupoServico } from '../grupo-servico.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGrupoServico for edit and NewGrupoServicoFormGroupInput for create.
 */
type GrupoServicoFormGroupInput = IGrupoServico | PartialWithRequiredKeyOf<NewGrupoServico>;

type GrupoServicoFormDefaults = Pick<NewGrupoServico, 'id'>;

type GrupoServicoFormGroupContent = {
  id: FormControl<IGrupoServico['id'] | NewGrupoServico['id']>;
  descricao: FormControl<IGrupoServico['descricao']>;
};

export type GrupoServicoFormGroup = FormGroup<GrupoServicoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GrupoServicoFormService {
  createGrupoServicoFormGroup(grupoServico: GrupoServicoFormGroupInput = { id: null }): GrupoServicoFormGroup {
    const grupoServicoRawValue = {
      ...this.getFormDefaults(),
      ...grupoServico,
    };
    return new FormGroup<GrupoServicoFormGroupContent>({
      id: new FormControl(
        { value: grupoServicoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(grupoServicoRawValue.descricao),
    });
  }

  getGrupoServico(form: GrupoServicoFormGroup): IGrupoServico | NewGrupoServico {
    return form.getRawValue() as IGrupoServico | NewGrupoServico;
  }

  resetForm(form: GrupoServicoFormGroup, grupoServico: GrupoServicoFormGroupInput): void {
    const grupoServicoRawValue = { ...this.getFormDefaults(), ...grupoServico };
    form.reset(
      {
        ...grupoServicoRawValue,
        id: { value: grupoServicoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): GrupoServicoFormDefaults {
    return {
      id: null,
    };
  }
}
