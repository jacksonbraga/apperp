import { IGrupoPagamento, NewGrupoPagamento } from './grupo-pagamento.model';

export const sampleWithRequiredData: IGrupoPagamento = {
  id: 31719,
};

export const sampleWithPartialData: IGrupoPagamento = {
  id: 19662,
};

export const sampleWithFullData: IGrupoPagamento = {
  id: 31529,
  descricao: 'supposing fortunately',
};

export const sampleWithNewData: NewGrupoPagamento = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
