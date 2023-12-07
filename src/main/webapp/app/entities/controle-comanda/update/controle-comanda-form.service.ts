import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IControleComanda, NewControleComanda } from '../controle-comanda.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IControleComanda for edit and NewControleComandaFormGroupInput for create.
 */
type ControleComandaFormGroupInput = IControleComanda | PartialWithRequiredKeyOf<NewControleComanda>;

type ControleComandaFormDefaults = Pick<NewControleComanda, 'id'>;

type ControleComandaFormGroupContent = {
  id: FormControl<IControleComanda['id'] | NewControleComanda['id']>;
  descricao: FormControl<IControleComanda['descricao']>;
  faixaInicio: FormControl<IControleComanda['faixaInicio']>;
  faixaFim: FormControl<IControleComanda['faixaFim']>;
  data: FormControl<IControleComanda['data']>;
  cor: FormControl<IControleComanda['cor']>;
};

export type ControleComandaFormGroup = FormGroup<ControleComandaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ControleComandaFormService {
  createControleComandaFormGroup(controleComanda: ControleComandaFormGroupInput = { id: null }): ControleComandaFormGroup {
    const controleComandaRawValue = {
      ...this.getFormDefaults(),
      ...controleComanda,
    };
    return new FormGroup<ControleComandaFormGroupContent>({
      id: new FormControl(
        { value: controleComandaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(controleComandaRawValue.descricao),
      faixaInicio: new FormControl(controleComandaRawValue.faixaInicio),
      faixaFim: new FormControl(controleComandaRawValue.faixaFim),
      data: new FormControl(controleComandaRawValue.data),
      cor: new FormControl(controleComandaRawValue.cor),
    });
  }

  getControleComanda(form: ControleComandaFormGroup): IControleComanda | NewControleComanda {
    return form.getRawValue() as IControleComanda | NewControleComanda;
  }

  resetForm(form: ControleComandaFormGroup, controleComanda: ControleComandaFormGroupInput): void {
    const controleComandaRawValue = { ...this.getFormDefaults(), ...controleComanda };
    form.reset(
      {
        ...controleComandaRawValue,
        id: { value: controleComandaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ControleComandaFormDefaults {
    return {
      id: null,
    };
  }
}
