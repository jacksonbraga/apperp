import { ICor, NewCor } from './cor.model';

export const sampleWithRequiredData: ICor = {
  id: 14323,
};

export const sampleWithPartialData: ICor = {
  id: 13501,
  descricao: 'acorn',
};

export const sampleWithFullData: ICor = {
  id: 26687,
  descricao: 'ah',
};

export const sampleWithNewData: NewCor = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
