export interface ICor {
  id: number;
  descricao?: string | null;
  valor?: string | null;
}

export type NewCor = Omit<ICor, 'id'> & { id: null };
