import dayjs from 'dayjs/esm';
import { ITipoDespesa } from 'app/entities/tipo-despesa/tipo-despesa.model';

export interface IDespesa {
  id: number;
  descricao?: string | null;
  observacao?: string | null;
  parcela?: number | null;
  totalParcela?: number | null;
  valor?: number | null;
  data?: dayjs.Dayjs | null;

  valorPagamento?: number | null;
  dataPagamento?: dayjs.Dayjs | null;

  dataVencimento?: dayjs.Dayjs | null;
  tipoDespesa?: Pick<ITipoDespesa, 'id' | 'descricao'> | null;
}

export type NewDespesa = Omit<IDespesa, 'id'> & { id: null };
