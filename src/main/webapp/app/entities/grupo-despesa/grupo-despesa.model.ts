export interface IGrupoDespesa {
  id: number;
  descricao?: string | null;
}

export type NewGrupoDespesa = Omit<IGrupoDespesa, 'id'> & { id: null };
