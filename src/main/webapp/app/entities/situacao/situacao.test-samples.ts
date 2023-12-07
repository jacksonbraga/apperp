import { ISituacao, NewSituacao } from './situacao.model';

export const sampleWithRequiredData: ISituacao = {
  id: 23733,
};

export const sampleWithPartialData: ISituacao = {
  id: 3719,
};

export const sampleWithFullData: ISituacao = {
  id: 27960,
  descricao: 'without pacify amongst',
};

export const sampleWithNewData: NewSituacao = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
