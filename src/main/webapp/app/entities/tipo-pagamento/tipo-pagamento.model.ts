import { IGrupoPagamento } from 'app/entities/grupo-pagamento/grupo-pagamento.model';

export interface ITipoPagamento {
  id: number;
  descricao?: string | null;
  grupoPagamento?: Pick<IGrupoPagamento, 'id' | 'descricao' | 'tipoColuna'> | null;
}

export type NewTipoPagamento = Omit<ITipoPagamento, 'id'> & { id: null };
