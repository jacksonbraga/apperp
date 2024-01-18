import { IGrupoCaixa } from 'app/entities/grupo-caixa/grupo-caixa.model';
import { ICaixa } from 'app/entities/caixa/caixa.model';

export interface ITipoCaixa {
  id: number;
  descricao?: string | null;
  grupoCaixas?: Pick<IGrupoCaixa, 'id' | 'descricao'>[] | null;
  caixas?: Pick<ICaixa, 'id'>[] | null;
}

export type NewTipoCaixa = Omit<ITipoCaixa, 'id'> & { id: null };
