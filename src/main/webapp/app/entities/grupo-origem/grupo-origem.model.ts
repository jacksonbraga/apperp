export interface IGrupoOrigem {
  id: number;
  descricao?: string | null;
}

export type NewGrupoOrigem = Omit<IGrupoOrigem, 'id'> & { id: null };
