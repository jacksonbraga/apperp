import { IGrupoCaixa, NewGrupoCaixa } from './grupo-caixa.model';

export const sampleWithRequiredData: IGrupoCaixa = {
  id: 6364,
};

export const sampleWithPartialData: IGrupoCaixa = {
  id: 27770,
  descricao: 'because',
};

export const sampleWithFullData: IGrupoCaixa = {
  id: 23818,
  descricao: 'sibling analogue including',
};

export const sampleWithNewData: NewGrupoCaixa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
