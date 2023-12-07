import { IGrupoDespesa, NewGrupoDespesa } from './grupo-despesa.model';

export const sampleWithRequiredData: IGrupoDespesa = {
  id: 22789,
};

export const sampleWithPartialData: IGrupoDespesa = {
  id: 16077,
};

export const sampleWithFullData: IGrupoDespesa = {
  id: 29751,
  descricao: 'if longingly',
};

export const sampleWithNewData: NewGrupoDespesa = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
