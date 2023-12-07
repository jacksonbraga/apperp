export interface IGrupoServico {
  id: number;
  descricao?: string | null;
}

export type NewGrupoServico = Omit<IGrupoServico, 'id'> & { id: null };
