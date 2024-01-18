import { ITipoCaixa } from 'app/entities/tipo-caixa/tipo-caixa.model';

export interface IGrupoCaixa {
  id: number;
  descricao?: string | null;
  tipoCaixas?: Pick<ITipoCaixa, 'id'>[] | null;
}

export type NewGrupoCaixa = Omit<IGrupoCaixa, 'id'> & { id: null };
