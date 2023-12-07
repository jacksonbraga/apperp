import { ITipoDespesa, NewTipoDespesa } from './tipo-despesa.model';

export const sampleWithRequiredData: ITipoDespesa = {
  id: 27987,
};

export const sampleWithPartialData: ITipoDespesa = {
  id: 19435,
  descricao: 'forenenst suspiciously instead',
};

export const sampleWithFullData: ITipoDespesa = {
  id: 3351,
  descricao: 'bomb',
};

export const sampleWithNewData: NewTipoDespesa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
