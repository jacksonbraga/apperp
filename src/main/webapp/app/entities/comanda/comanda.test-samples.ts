import dayjs from 'dayjs/esm';

import { IComanda, NewComanda } from './comanda.model';

export const sampleWithRequiredData: IComanda = {
  id: 32062,
};

export const sampleWithPartialData: IComanda = {
  id: 22811,
  descricao: 'mercerize',
  data: dayjs('2023-11-25'),
};

export const sampleWithFullData: IComanda = {
  id: 12956,
  descricao: 'than before',
  observacao: 'of',
  data: dayjs('2023-11-25'),
  numero: 729,
};

export const sampleWithNewData: NewComanda = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
