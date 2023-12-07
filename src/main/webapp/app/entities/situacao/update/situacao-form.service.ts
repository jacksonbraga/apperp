import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISituacao, NewSituacao } from '../situacao.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISituacao for edit and NewSituacaoFormGroupInput for create.
 */
type SituacaoFormGroupInput = ISituacao | PartialWithRequiredKeyOf<NewSituacao>;

type SituacaoFormDefaults = Pick<NewSituacao, 'id'>;

type SituacaoFormGroupContent = {
  id: FormControl<ISituacao['id'] | NewSituacao['id']>;
  descricao: FormControl<ISituacao['descricao']>;
};

export type SituacaoFormGroup = FormGroup<SituacaoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SituacaoFormService {
  createSituacaoFormGroup(situacao: SituacaoFormGroupInput = { id: null }): SituacaoFormGroup {
    const situacaoRawValue = {
      ...this.getFormDefaults(),
      ...situacao,
    };
    return new FormGroup<SituacaoFormGroupContent>({
      id: new FormControl(
        { value: situacaoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(situacaoRawValue.descricao),
    });
  }

  getSituacao(form: SituacaoFormGroup): ISituacao | NewSituacao {
    return form.getRawValue() as ISituacao | NewSituacao;
  }

  resetForm(form: SituacaoFormGroup, situacao: SituacaoFormGroupInput): void {
    const situacaoRawValue = { ...this.getFormDefaults(), ...situacao };
    form.reset(
      {
        ...situacaoRawValue,
        id: { value: situacaoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SituacaoFormDefaults {
    return {
      id: null,
    };
  }
}
