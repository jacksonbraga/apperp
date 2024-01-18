import { ITipoOrigem, NewTipoOrigem } from './tipo-origem.model';

export const sampleWithRequiredData: ITipoOrigem = {
  id: 24165,
};

export const sampleWithPartialData: ITipoOrigem = {
  id: 16463,
};

export const sampleWithFullData: ITipoOrigem = {
  id: 30432,
  descricao: 'oof forenenst',
};

export const sampleWithNewData: NewTipoOrigem = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
