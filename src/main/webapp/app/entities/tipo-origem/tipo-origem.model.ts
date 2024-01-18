import { IGrupoOrigem } from 'app/entities/grupo-origem/grupo-origem.model';
import { ICaixa } from 'app/entities/caixa/caixa.model';

export interface ITipoOrigem {
  id: number;
  descricao?: string | null;
  grupoOrigems?: Pick<IGrupoOrigem, 'id' | 'descricao'>[] | null;
  caixas?: Pick<ICaixa, 'id'>[] | null;
}

export type NewTipoOrigem = Omit<ITipoOrigem, 'id'> & { id: null };
