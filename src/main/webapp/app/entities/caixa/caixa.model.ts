import dayjs from 'dayjs/esm';
import { ITipoCaixa } from 'app/entities/tipo-caixa/tipo-caixa.model';
import { ITipoOrigem } from 'app/entities/tipo-origem/tipo-origem.model';

export interface ICaixa {
  id: number;
  descricao?: string | null;
  observacao?: string | null;
  valor?: number | null;
  data?: dayjs.Dayjs | null;
  tipoCaixas?: Pick<ITipoCaixa, 'id' | 'descricao'>[] | null;
  tipoOrigems?: Pick<ITipoOrigem, 'id' | 'descricao'>[] | null;
}

export type NewCaixa = Omit<ICaixa, 'id'> & { id: null };
