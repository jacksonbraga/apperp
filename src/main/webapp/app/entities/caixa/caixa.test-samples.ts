import dayjs from 'dayjs/esm';

import { ICaixa, NewCaixa } from './caixa.model';

export const sampleWithRequiredData: ICaixa = {
  id: 27922,
};

export const sampleWithPartialData: ICaixa = {
  id: 25612,
  descricao: 'to zowie puzzling',
  observacao: 'calmly',
};

export const sampleWithFullData: ICaixa = {
  id: 27557,
  descricao: 'hasty sill',
  observacao: 'rash seldom',
  valor: 10469.44,
  data: dayjs('2024-01-18'),
};

export const sampleWithNewData: NewCaixa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
