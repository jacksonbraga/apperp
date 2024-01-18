import { IGrupoOrigem, NewGrupoOrigem } from './grupo-origem.model';

export const sampleWithRequiredData: IGrupoOrigem = {
  id: 98,
};

export const sampleWithPartialData: IGrupoOrigem = {
  id: 25046,
};

export const sampleWithFullData: IGrupoOrigem = {
  id: 2180,
  descricao: 'wooden that',
};

export const sampleWithNewData: NewGrupoOrigem = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
