import dayjs from 'dayjs/esm';

import { IItemComanda, NewItemComanda } from './item-comanda.model';

export const sampleWithRequiredData: IItemComanda = {
  id: 15370,
};

export const sampleWithPartialData: IItemComanda = {
  id: 22103,
  descricao: 'ruler failing however',
  data: dayjs('2023-11-25'),
};

export const sampleWithFullData: IItemComanda = {
  id: 29195,
  descricao: 'every safeguard',
  observacao: 'atop blah',
  data: dayjs('2023-11-24'),
  numero: 20862,
  qtde: 26429,
  valor: 454.39,
};

export const sampleWithNewData: NewItemComanda = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
