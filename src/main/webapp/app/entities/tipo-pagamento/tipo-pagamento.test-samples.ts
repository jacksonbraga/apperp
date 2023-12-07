import { ITipoPagamento, NewTipoPagamento } from './tipo-pagamento.model';

export const sampleWithRequiredData: ITipoPagamento = {
  id: 2657,
};

export const sampleWithPartialData: ITipoPagamento = {
  id: 31484,
  descricao: 'sparse despite',
};

export const sampleWithFullData: ITipoPagamento = {
  id: 19602,
  descricao: 'apud bah',
};

export const sampleWithNewData: NewTipoPagamento = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
