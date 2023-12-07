import { ITipoServico, NewTipoServico } from './tipo-servico.model';

export const sampleWithRequiredData: ITipoServico = {
  id: 17066,
};

export const sampleWithPartialData: ITipoServico = {
  id: 127,
  descricao: 'shadowy zowie',
};

export const sampleWithFullData: ITipoServico = {
  id: 3684,
  descricao: 'semaphore',
};

export const sampleWithNewData: NewTipoServico = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
