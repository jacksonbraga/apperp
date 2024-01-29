export interface IRelatorioControle {
  turno?: string | null;
  inicio?: string | null;
  fim?: string | null;

  abertas?: string | null;
  fechadas?: string | null;
  lancadas?: string | null;
  naoUsadas?: string | null;
  desviadas?: string | null;
  emAnalise?: string | null;
  valor?: string | null;
}
