import { IGrupoOrigem } from 'app/entities/grupo-origem/grupo-origem.model';

export interface ITipoOrigem {
  id: number;
  descricao?: string | null;
  grupoOrigem?: Pick<IGrupoOrigem, 'id' | 'descricao'> | null;
}

export type NewTipoOrigem = Omit<ITipoOrigem, 'id'> & { id: null };
