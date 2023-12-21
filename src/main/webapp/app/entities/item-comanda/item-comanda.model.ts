import dayjs from 'dayjs/esm';
import { ITipoPagamento } from 'app/entities/tipo-pagamento/tipo-pagamento.model';
import { ITipoServico } from 'app/entities/tipo-servico/tipo-servico.model';
import { IComanda } from 'app/entities/comanda/comanda.model';

export interface IItemComanda {
  id: number;
  descricao?: string | null;
  tipo?: string | null;
  observacao?: string | null;
  data?: dayjs.Dayjs | null;
  numero?: number | null;
  qtde?: number | null;
  valor?: number | null;
  situacao?: string | null;
  tipoPagamento?: Pick<ITipoPagamento, 'id' | 'descricao' | 'grupoPagamento'> | null;
  tipoServico?: Pick<ITipoServico, 'id' | 'descricao'> | null;
  comandaPai?: Pick<IComanda, 'id'> | null;
  comanda?: Pick<IComanda, 'id' | 'descricao'> | null;
}

export type NewItemComanda = Omit<IItemComanda, 'id'> & { id: null };
