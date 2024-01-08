import dayjs from 'dayjs/esm';
import { ISituacao } from 'app/entities/situacao/situacao.model';
import { IControleComanda } from 'app/entities/controle-comanda/controle-comanda.model';

export interface IComanda {
  id: number;
  descricao?: string | null;
  observacao?: string | null;
  data?: dayjs.Dayjs | null;
  numero?: number | null;
  situacao?: Pick<ISituacao, 'id' | 'descricao'> | null;
  controle?: Pick<IComanda, 'id' | 'descricao' | 'data' | 'valor'> | null;
  controleComanda?: Pick<IControleComanda, 'id' | 'descricao' | 'cor' | 'data' | 'valor'> | null;
  valor?: number | null;
  resumo?: string | null;
}

export type NewComanda = Omit<IComanda, 'id'> & { id: null };
