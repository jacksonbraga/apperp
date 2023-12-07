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
  controle?: Pick<IControleComanda, 'id'> | null;
  controleComanda?: Pick<IControleComanda, 'id' | 'descricao'> | null;
}

export type NewComanda = Omit<IComanda, 'id'> & { id: null };
