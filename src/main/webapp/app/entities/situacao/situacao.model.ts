export interface ISituacao {
  id: number;
  descricao?: string | null;
}

export type NewSituacao = Omit<ISituacao, 'id'> & { id: null };
