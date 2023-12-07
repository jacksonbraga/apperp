export interface IGrupoPagamento {
  id: number;
  descricao?: string | null;
}

export type NewGrupoPagamento = Omit<IGrupoPagamento, 'id'> & { id: null };
