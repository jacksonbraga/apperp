import { IGrupoServico } from 'app/entities/grupo-servico/grupo-servico.model';

export interface ITipoServico {
  id: number;
  descricao?: string | null;
  grupoServico?: Pick<IGrupoServico, 'id' | 'descricao'> | null;
}

export type NewTipoServico = Omit<ITipoServico, 'id'> & { id: null };
