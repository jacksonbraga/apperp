import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGrupoCaixa, NewGrupoCaixa } from '../grupo-caixa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGrupoCaixa for edit and NewGrupoCaixaFormGroupInput for create.
 */
type GrupoCaixaFormGroupInput = IGrupoCaixa | PartialWithRequiredKeyOf<NewGrupoCaixa>;

type GrupoCaixaFormDefaults = Pick<NewGrupoCaixa, 'id' | 'tipoCaixas'>;

type GrupoCaixaFormGroupContent = {
  id: FormControl<IGrupoCaixa['id'] | NewGrupoCaixa['id']>;
  descricao: FormControl<IGrupoCaixa['descricao']>;
  tipoCaixas: FormControl<IGrupoCaixa['tipoCaixas']>;
};

export type GrupoCaixaFormGroup = FormGroup<GrupoCaixaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GrupoCaixaFormService {
  createGrupoCaixaFormGroup(grupoCaixa: GrupoCaixaFormGroupInput = { id: null }): GrupoCaixaFormGroup {
    const grupoCaixaRawValue = {
      ...this.getFormDefaults(),
      ...grupoCaixa,
    };
    return new FormGroup<GrupoCaixaFormGroupContent>({
      id: new FormControl(
        { value: grupoCaixaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(grupoCaixaRawValue.descricao),
      tipoCaixas: new FormControl(grupoCaixaRawValue.tipoCaixas ?? []),
    });
  }

  getGrupoCaixa(form: GrupoCaixaFormGroup): IGrupoCaixa | NewGrupoCaixa {
    return form.getRawValue() as IGrupoCaixa | NewGrupoCaixa;
  }

  resetForm(form: GrupoCaixaFormGroup, grupoCaixa: GrupoCaixaFormGroupInput): void {
    const grupoCaixaRawValue = { ...this.getFormDefaults(), ...grupoCaixa };
    form.reset(
      {
        ...grupoCaixaRawValue,
        id: { value: grupoCaixaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): GrupoCaixaFormDefaults {
    return {
      id: null,
      tipoCaixas: [],
    };
  }
}
