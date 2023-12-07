import { IGrupoServico, NewGrupoServico } from './grupo-servico.model';

export const sampleWithRequiredData: IGrupoServico = {
  id: 8371,
};

export const sampleWithPartialData: IGrupoServico = {
  id: 31347,
};

export const sampleWithFullData: IGrupoServico = {
  id: 13623,
  descricao: 'ghostwrite er bashfully',
};

export const sampleWithNewData: NewGrupoServico = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
