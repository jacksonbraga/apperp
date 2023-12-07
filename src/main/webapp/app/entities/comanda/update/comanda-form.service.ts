import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IComanda, NewComanda } from '../comanda.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IComanda for edit and NewComandaFormGroupInput for create.
 */
type ComandaFormGroupInput = IComanda | PartialWithRequiredKeyOf<NewComanda>;

type ComandaFormDefaults = Pick<NewComanda, 'id'>;

type ComandaFormGroupContent = {
  id: FormControl<IComanda['id'] | NewComanda['id']>;
  descricao: FormControl<IComanda['descricao']>;
  observacao: FormControl<IComanda['observacao']>;
  data: FormControl<IComanda['data']>;
  numero: FormControl<IComanda['numero']>;
  situacao: FormControl<IComanda['situacao']>;
  controle: FormControl<IComanda['controle']>;
  controleComanda: FormControl<IComanda['controleComanda']>;
};

export type ComandaFormGroup = FormGroup<ComandaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ComandaFormService {
  createComandaFormGroup(comanda: ComandaFormGroupInput = { id: null }): ComandaFormGroup {
    const comandaRawValue = {
      ...this.getFormDefaults(),
      ...comanda,
    };
    return new FormGroup<ComandaFormGroupContent>({
      id: new FormControl(
        { value: comandaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(comandaRawValue.descricao),
      observacao: new FormControl(comandaRawValue.observacao),
      data: new FormControl(comandaRawValue.data),
      numero: new FormControl(comandaRawValue.numero),
      situacao: new FormControl(comandaRawValue.situacao),
      controle: new FormControl(comandaRawValue.controle),
      controleComanda: new FormControl(comandaRawValue.controleComanda),
    });
  }

  getComanda(form: ComandaFormGroup): IComanda | NewComanda {
    return form.getRawValue() as IComanda | NewComanda;
  }

  resetForm(form: ComandaFormGroup, comanda: ComandaFormGroupInput): void {
    const comandaRawValue = { ...this.getFormDefaults(), ...comanda };
    form.reset(
      {
        ...comandaRawValue,
        id: { value: comandaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ComandaFormDefaults {
    return {
      id: null,
    };
  }
}
