import { IGrupoPagamento } from 'app/entities/grupo-pagamento/grupo-pagamento.model';

export interface ITipoCaixa {
  id: number;
  descricao?: string | null;
  grupoPagamento?: Pick<IGrupoPagamento, 'id' | 'descricao'> | null;
}

export type NewTipoCaixa = Omit<ITipoCaixa, 'id'> & { id: null };
