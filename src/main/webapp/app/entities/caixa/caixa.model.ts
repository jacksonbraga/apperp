import dayjs from 'dayjs/esm';
import { ITipoCaixa } from 'app/entities/tipo-caixa/tipo-caixa.model';
import { ITipoOrigem } from 'app/entities/tipo-origem/tipo-origem.model';

export interface ICaixa {
  id: number;
  descricao?: string | null;
  observacao?: string | null;
  valor?: number | null;
  valorEstimadoExtrato?: number | null;
  valorLancadoExtrato?: number | null;
  dataEstimadaExtrato?: dayjs.Dayjs | null;
  dataLancadaExtrato?: dayjs.Dayjs | null;
  valorTaxa?: number | null;
  data?: dayjs.Dayjs | null;
  tipoCaixa?: Pick<ITipoCaixa, 'id' | 'descricao'> | null;
  tipoOrigem?: Pick<ITipoOrigem, 'id' | 'descricao'> | null;
}

export type NewCaixa = Omit<ICaixa, 'id'> & { id: null };
