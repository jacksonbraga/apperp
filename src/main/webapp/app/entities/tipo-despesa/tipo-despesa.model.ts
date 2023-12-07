import { IGrupoDespesa } from 'app/entities/grupo-despesa/grupo-despesa.model';

export interface ITipoDespesa {
  id: number;
  descricao?: string | null;
  grupoDespesa?: Pick<IGrupoDespesa, 'id' | 'descricao'> | null;
}

export type NewTipoDespesa = Omit<ITipoDespesa, 'id'> & { id: null };
