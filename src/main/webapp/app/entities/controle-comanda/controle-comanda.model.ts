import dayjs from 'dayjs/esm';
import { ICor } from 'app/entities/cor/cor.model';

export interface IControleComanda {
  id: number;
  descricao?: string | null;
  faixaInicio?: number | null;
  faixaFim?: number | null;
  data?: dayjs.Dayjs | null;
  cor?: Pick<ICor, 'id' | 'descricao' | 'valor'> | null;
}

export type NewControleComanda = Omit<IControleComanda, 'id'> & { id: null };
