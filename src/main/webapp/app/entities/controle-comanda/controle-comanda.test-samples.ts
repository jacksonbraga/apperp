import dayjs from 'dayjs/esm';

import { IControleComanda, NewControleComanda } from './controle-comanda.model';

export const sampleWithRequiredData: IControleComanda = {
  id: 24032,
};

export const sampleWithPartialData: IControleComanda = {
  id: 15704,
  faixaInicio: 14388,
};

export const sampleWithFullData: IControleComanda = {
  id: 19026,
  descricao: 'orange',
  faixaInicio: 23132,
  faixaFim: 24601,
  data: dayjs('2023-11-24'),
};

export const sampleWithNewData: NewControleComanda = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
