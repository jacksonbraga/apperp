import { ITipoOrigem } from 'app/entities/tipo-origem/tipo-origem.model';

export interface IGrupoOrigem {
  id: number;
  descricao?: string | null;
  tipoOrigems?: Pick<ITipoOrigem, 'id'>[] | null;
}

export type NewGrupoOrigem = Omit<IGrupoOrigem, 'id'> & { id: null };
