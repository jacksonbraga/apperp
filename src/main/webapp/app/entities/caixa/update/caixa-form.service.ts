import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ICaixa, NewCaixa } from '../caixa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICaixa for edit and NewCaixaFormGroupInput for create.
 */
type CaixaFormGroupInput = ICaixa | PartialWithRequiredKeyOf<NewCaixa>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICaixa | NewCaixa> = Omit<T, 'data'> & {
  data?: dayjs.Dayjs | null;
};

type CaixaFormRawValue = FormValueOf<ICaixa>;

type NewCaixaFormRawValue = FormValueOf<NewCaixa>;

type CaixaFormDefaults = Pick<NewCaixa, 'id' | 'data' | 'tipoCaixas' | 'tipoOrigems'>;

type CaixaFormGroupContent = {
  id: FormControl<CaixaFormRawValue['id'] | NewCaixa['id']>;
  descricao: FormControl<CaixaFormRawValue['descricao']>;
  observacao: FormControl<CaixaFormRawValue['observacao']>;
  valor: FormControl<CaixaFormRawValue['valor']>;
  data: FormControl<CaixaFormRawValue['data']>;
  tipoCaixas: FormControl<CaixaFormRawValue['tipoCaixas']>;
  tipoOrigems: FormControl<CaixaFormRawValue['tipoOrigems']>;
};

export type CaixaFormGroup = FormGroup<CaixaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CaixaFormService {
  createCaixaFormGroup(caixa: CaixaFormGroupInput = { id: null }): CaixaFormGroup {
    const caixaRawValue = this.convertCaixaToCaixaRawValue({
      ...this.getFormDefaults(),
      ...caixa,
    });
    return new FormGroup<CaixaFormGroupContent>({
      id: new FormControl(
        { value: caixaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descricao: new FormControl(caixaRawValue.descricao),
      observacao: new FormControl(caixaRawValue.observacao),
      valor: new FormControl(caixaRawValue.valor),
      data: new FormControl(caixaRawValue.data),
      tipoCaixas: new FormControl(caixaRawValue.tipoCaixas ?? []),
      tipoOrigems: new FormControl(caixaRawValue.tipoOrigems ?? []),
    });
  }

  getCaixa(form: CaixaFormGroup): ICaixa | NewCaixa {
    return this.convertCaixaRawValueToCaixa(form.getRawValue() as CaixaFormRawValue | NewCaixaFormRawValue);
  }

  resetForm(form: CaixaFormGroup, caixa: CaixaFormGroupInput): void {
    const caixaRawValue = this.convertCaixaToCaixaRawValue({ ...this.getFormDefaults(), ...caixa });
    form.reset(
      {
        ...caixaRawValue,
        id: { value: caixaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CaixaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      data: currentTime,
      tipoCaixas: [],
      tipoOrigems: [],
    };
  }

  private convertCaixaRawValueToCaixa(rawCaixa: CaixaFormRawValue | NewCaixaFormRawValue): ICaixa | NewCaixa {
    return {
      ...rawCaixa,
      data: dayjs(rawCaixa.data, DATE_FORMAT),
    };
  }

  private convertCaixaToCaixaRawValue(
    caixa: ICaixa | (Partial<NewCaixa> & CaixaFormDefaults),
  ): CaixaFormRawValue | PartialWithRequiredKeyOf<NewCaixaFormRawValue> {
    return {
      ...caixa,
      data: caixa.data ? caixa.data : undefined,
      tipoCaixas: caixa.tipoCaixas ?? [],
      tipoOrigems: caixa.tipoOrigems ?? [],
    };
  }
}
