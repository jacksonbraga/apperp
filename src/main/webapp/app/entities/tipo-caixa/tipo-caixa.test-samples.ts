import { ITipoCaixa, NewTipoCaixa } from './tipo-caixa.model';

export const sampleWithRequiredData: ITipoCaixa = {
  id: 29148,
};

export const sampleWithPartialData: ITipoCaixa = {
  id: 28485,
  descricao: 'joyously raffle',
};

export const sampleWithFullData: ITipoCaixa = {
  id: 25144,
  descricao: 'short burgle welcome',
};

export const sampleWithNewData: NewTipoCaixa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
