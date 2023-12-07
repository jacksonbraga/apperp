import dayjs from 'dayjs/esm';

import { IDespesa, NewDespesa } from './despesa.model';

export const sampleWithRequiredData: IDespesa = {
  id: 14634,
};

export const sampleWithPartialData: IDespesa = {
  id: 4435,
  observacao: 'awkward repeatedly',
  data: dayjs('2023-11-24'),
};

export const sampleWithFullData: IDespesa = {
  id: 4254,
  descricao: 'review will shred',
  observacao: 'less carefully',
  parcela: 22630,
  totalParcela: 32107,
  valor: 17241.05,
  data: dayjs('2023-11-25'),
  dataVencimento: dayjs('2023-11-24'),
};

export const sampleWithNewData: NewDespesa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
