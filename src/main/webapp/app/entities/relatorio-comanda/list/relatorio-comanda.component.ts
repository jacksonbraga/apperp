import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import SharedModule from 'app/shared/shared.module';
import { SortDirective, SortByDirective } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ASC, DESC, SORT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { SortService } from 'app/shared/sort/sort.service';
import { IRelatorioComanda as IRelatorioControleComanda } from '../relatorio-comanda.model';
import {
  EntityArrayResponseType,
  EntityArrayResponseTypeConferenciaExtrato,
  EntityArrayResponseTypeConferenciaExtratoAcumulado,
  EntityArrayResponseTypeControle,
  EntityArrayResponseTypeControle4,
  EntityArrayResponseTypeDespesas,
  EntityArrayResponseTypeTicketMedio,
  EntityArrayResponseTypeValoresRecebidosResumo,
  RelatorioComandaService,
} from '../service/relatorio-comanda.service';
import { WebdatarocksComponent, WebdatarocksPivotModule } from '@webdatarocks/ngx-webdatarocks';
import WebDataRocks from '@webdatarocks/webdatarocks';
import { SplitterModule } from 'primeng/splitter';
import { TabViewModule } from 'primeng/tabview';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import moment from 'moment';
import { ICor } from 'app/entities/cor/cor.model';
import { IRelatorioValoresRecebidosResumo } from '../relatorio-controle-valores-recebidos-resumo.model';
import { IRelatorioControle4 as IRelatorioConferencia } from '../relatorio-controle-conferencia.model';
import { IRelatorioValoresRecebidos } from '../relatorio-controle-valores-recebidos.model';
import { IRelatorioConferenciaExtrato } from '../relatorio-controle-conferencia-extrato.model';
import { IRelatorioConferenciaExtratoAcumulado } from '../relatorio-controle-conferencia-extrato-acumulado.model';
import { IRelatorioDespesa } from '../relatorio-despesas.model';

@Component({
  standalone: true,
  selector: 'jhi-relatorio',
  templateUrl: './relatorio-comanda.component.html',
  styleUrls: ['./relatorio-comanda.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    SharedModule,
    SortDirective,
    SplitterModule,
    SortByDirective,
    DurationPipe,
    TabViewModule,
    ReactiveFormsModule,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    WebdatarocksPivotModule,
  ],
})
export class RelatorioComandaComponent implements OnInit {
  formGroup!: FormGroup;
  activeIndex: number = 0;
  active = 1;
  dia = 1;

  dropdownSettings = {};
  dropdownSettingsAno = {};

  selectedAno: any[] = [];
  selectedMes: any[] = [];

  relatorioControleComanda?: IRelatorioControleComanda[];
  ControleValoresRecebidos?: IRelatorioValoresRecebidos[];
  ControleValoresRecebidosResumo?: IRelatorioValoresRecebidosResumo[];
  ControleConferencia?: IRelatorioConferencia[];
  ControleTicketMedio?: IRelatorioValoresRecebidosResumo[];
  ConferenciaExtrato?: IRelatorioConferenciaExtrato[];
  Despesas?: IRelatorioDespesa[];

  ConferenciaExtratoAcumulado?: IRelatorioConferenciaExtratoAcumulado[];

  isLoading = false;

  pivotControleComanda: WebDataRocks.Pivot | undefined;
  pivotValoresRecebidos: WebDataRocks.Pivot | undefined;
  pivotValoresRecebidosResumoRecebidos: WebDataRocks.Pivot | undefined;
  pivotValoresRecebidosResumoLancados: WebDataRocks.Pivot | undefined;
  pivotConferencia: WebDataRocks.Pivot | undefined;
  pivotTicketMedio: WebDataRocks.Pivot | undefined;
  pivotConferenciaExtrato: WebDataRocks.Pivot | undefined;

  pivotConferenciaExtratoAcumulado: WebDataRocks.Pivot | undefined;
  pivotDespesas: WebDataRocks.Pivot | undefined;

  predicate = 'id';
  ascending = true;
  dt: any;

  dataInicio: string = '';
  dataFim: string = '';
  ultimoDia: number = 1;

  listaMeses: any[] = [
    { id: '1', descricao: 'janeiro' },
    { id: '2', descricao: 'fevereiro' },
    { id: '3', descricao: 'março' },
    { id: '4', descricao: 'abril' },
    { id: '5', descricao: 'maio' },
    { id: '6', descricao: 'junho' },
    { id: '7', descricao: 'julho' },
    { id: '8', descricao: 'agosto' },
    { id: '9', descricao: 'setembro' },
    { id: '10', descricao: 'outubro' },
    { id: '11', descricao: 'novembro' },
    { id: '12', descricao: 'dezembro' },
  ];

  listaAnos: any[] = [{ id: '2024', descricao: '2024' }];

  dataControleComanda: any = '';
  dataControleValoresRecebidos: any = '';
  dataControleValoresRecebidosResumo: any = '';
  dataControleConferencia: any = '';
  dataTicketMedio: any = '';
  dataConferenciaExtrato: any = '';
  dataConferenciaExtratoAcumulado: any = '';
  dataDespesas: any = '';

  configControleComanda: any = [
    {
      turno: {
        type: 'string',
      },
      inicio: {
        type: 'number',
      },
      fim: {
        type: 'number',
      },
      abertas: {
        type: 'number',
      },
      fechadas: {
        type: 'number',
      },

      lancadas: {
        type: 'number',
      },

      naoUsadas: {
        type: 'number',
      },

      desviadas: {
        type: 'number',
      },

      emAnalise: {
        type: 'number',
      },

      valor: {
        type: 'number',
      },
    },
  ];

  configControleValoresRecebidos: any = [
    {
      origem: {
        type: 'string',
      },
      equipamento: {
        type: 'string',
      },
      tipo: {
        type: 'string',
      },
      valor: {
        type: 'number',
      },
    },
  ];

  configConferenciaExtrato: any = [
    {
      equipamento: {
        type: 'string',
      },
      tipo: {
        type: 'string',
      },
      valorPrevisto: {
        type: 'number',
      },
      valorConfirmado: {
        type: 'number',
      },
      valorTaxa: {
        type: 'number',
      },
    },
  ];

  configConferenciaExtratoAcumulado: any = [
    {
      equipamento: {
        type: 'string',
      },
      tipo: {
        type: 'string',
      },
      d01: {
        type: 'number',
      },
      d02: {
        type: 'number',
      },
      d03: {
        type: 'number',
      },
      d04: {
        type: 'number',
      },
      d05: {
        type: 'number',
      },
      d06: {
        type: 'number',
      },
      d07: {
        type: 'number',
      },
      d08: {
        type: 'number',
      },
      d09: {
        type: 'number',
      },
      d10: {
        type: 'number',
      },
      d11: {
        type: 'number',
      },
      d12: {
        type: 'number',
      },
      d13: {
        type: 'number',
      },
      d14: {
        type: 'number',
      },
      d15: {
        type: 'number',
      },
      d16: {
        type: 'number',
      },
      d17: {
        type: 'number',
      },
      d18: {
        type: 'number',
      },
      d19: {
        type: 'number',
      },
      d20: {
        type: 'number',
      },
      d21: {
        type: 'number',
      },
      d22: {
        type: 'number',
      },
      d23: {
        type: 'number',
      },
      d24: {
        type: 'number',
      },
      d25: {
        type: 'number',
      },
      d26: {
        type: 'number',
      },
      d27: {
        type: 'number',
      },
      d28: {
        type: 'number',
      },
      d29: {
        type: 'number',
      },
      d30: {
        type: 'number',
      },
      d31: {
        type: 'number',
      },
    },
  ];

  configControleValoresRecebidosResumo: any = [
    {
      tipo: {
        type: 'string',
      },
      d01: {
        type: 'number',
      },
      d02: {
        type: 'number',
      },
      d03: {
        type: 'number',
      },
      d04: {
        type: 'number',
      },
      d05: {
        type: 'number',
      },
      d06: {
        type: 'number',
      },
      d07: {
        type: 'number',
      },
      d08: {
        type: 'number',
      },
      d09: {
        type: 'number',
      },
      d10: {
        type: 'number',
      },
      d11: {
        type: 'number',
      },
      d12: {
        type: 'number',
      },
      d13: {
        type: 'number',
      },
      d14: {
        type: 'number',
      },
      d15: {
        type: 'number',
      },
      d16: {
        type: 'number',
      },
      d17: {
        type: 'number',
      },
      d18: {
        type: 'number',
      },
      d19: {
        type: 'number',
      },
      d20: {
        type: 'number',
      },
      d21: {
        type: 'number',
      },
      d22: {
        type: 'number',
      },
      d23: {
        type: 'number',
      },
      d24: {
        type: 'number',
      },
      d25: {
        type: 'number',
      },
      d26: {
        type: 'number',
      },
      d27: {
        type: 'number',
      },
      d28: {
        type: 'number',
      },
      d29: {
        type: 'number',
      },
      d30: {
        type: 'number',
      },
      d31: {
        type: 'number',
      },

      d01L: {
        type: 'number',
      },
      d02L: {
        type: 'number',
      },
      d03L: {
        type: 'number',
      },
      d04L: {
        type: 'number',
      },
      d05L: {
        type: 'number',
      },
      d06L: {
        type: 'number',
      },
      d07L: {
        type: 'number',
      },
      d08L: {
        type: 'number',
      },
      d09L: {
        type: 'number',
      },
      d10L: {
        type: 'number',
      },
      d11L: {
        type: 'number',
      },
      d12L: {
        type: 'number',
      },
      d13L: {
        type: 'number',
      },
      d14L: {
        type: 'number',
      },
      d15L: {
        type: 'number',
      },
      d16L: {
        type: 'number',
      },
      d17L: {
        type: 'number',
      },
      d18L: {
        type: 'number',
      },
      d19L: {
        type: 'number',
      },
      d20L: {
        type: 'number',
      },
      d21L: {
        type: 'number',
      },
      d22L: {
        type: 'number',
      },
      d23L: {
        type: 'number',
      },
      d24L: {
        type: 'number',
      },
      d25L: {
        type: 'number',
      },
      d26L: {
        type: 'number',
      },
      d27L: {
        type: 'number',
      },
      d28L: {
        type: 'number',
      },
      d29L: {
        type: 'number',
      },
      d30L: {
        type: 'number',
      },
      d31L: {
        type: 'number',
      },
    },
  ];

  configTicketMedio: any = [
    {
      tipo: {
        type: 'string',
      },
      d01: {
        type: 'number',
      },
      d02: {
        type: 'number',
      },
      d03: {
        type: 'number',
      },
      d04: {
        type: 'number',
      },
      d05: {
        type: 'number',
      },
      d06: {
        type: 'number',
      },
      d07: {
        type: 'number',
      },
      d08: {
        type: 'number',
      },
      d09: {
        type: 'number',
      },
      d10: {
        type: 'number',
      },
      d11: {
        type: 'number',
      },
      d12: {
        type: 'number',
      },
      d13: {
        type: 'number',
      },
      d14: {
        type: 'number',
      },
      d15: {
        type: 'number',
      },
      d16: {
        type: 'number',
      },
      d17: {
        type: 'number',
      },
      d18: {
        type: 'number',
      },
      d19: {
        type: 'number',
      },
      d20: {
        type: 'number',
      },
      d21: {
        type: 'number',
      },
      d22: {
        type: 'number',
      },
      d23: {
        type: 'number',
      },
      d24: {
        type: 'number',
      },
      d25: {
        type: 'number',
      },
      d26: {
        type: 'number',
      },
      d27: {
        type: 'number',
      },
      d28: {
        type: 'number',
      },
      d29: {
        type: 'number',
      },
      d30: {
        type: 'number',
      },
      d31: {
        type: 'number',
      },

      d01L: {
        type: 'number',
      },
      d02L: {
        type: 'number',
      },
      d03L: {
        type: 'number',
      },
      d04L: {
        type: 'number',
      },
      d05L: {
        type: 'number',
      },
      d06L: {
        type: 'number',
      },
      d07L: {
        type: 'number',
      },
      d08L: {
        type: 'number',
      },
      d09L: {
        type: 'number',
      },
      d10L: {
        type: 'number',
      },
      d11L: {
        type: 'number',
      },
      d12L: {
        type: 'number',
      },
      d13L: {
        type: 'number',
      },
      d14L: {
        type: 'number',
      },
      d15L: {
        type: 'number',
      },
      d16L: {
        type: 'number',
      },
      d17L: {
        type: 'number',
      },
      d18L: {
        type: 'number',
      },
      d19L: {
        type: 'number',
      },
      d20L: {
        type: 'number',
      },
      d21L: {
        type: 'number',
      },
      d22L: {
        type: 'number',
      },
      d23L: {
        type: 'number',
      },
      d24L: {
        type: 'number',
      },
      d25L: {
        type: 'number',
      },
      d26L: {
        type: 'number',
      },
      d27L: {
        type: 'number',
      },
      d28L: {
        type: 'number',
      },
      d29L: {
        type: 'number',
      },
      d30L: {
        type: 'number',
      },
      d31L: {
        type: 'number',
      },
    },
  ];

  configControleConferencia: any = [
    {
      grupo: {
        type: 'string',
      },
      valorInformado: {
        type: 'number',
      },
      valorRecebido: {
        type: 'number',
      },
    },
  ];

  configDespesas: any = [
    {
      grupo: {
        type: 'string',
      },
      tipo: {
        type: 'string',
      },
      descricao: {
        type: 'string',
      },
      valorVencimento: {
        type: 'number',
      },
      valorPagamento: {
        type: 'number',
      },
    },
  ];

  constructor(
    protected relatorioComandaService: RelatorioComandaService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'descricao',
      enableCheckAll: false,
      selectAllText: 'Selecione tudo',
      unSelectAllText: 'Limpar seleção',
      searchPlaceholderText: 'Pesquisar',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.dropdownSettingsAno = {
      singleSelection: true,
      idField: 'id',
      textField: 'descricao',
      enableCheckAll: false,
      selectAllText: 'Selecione tudo',
      unSelectAllText: 'Limpar seleção',
      searchPlaceholderText: 'Pesquisar',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    const dateObj = new Date();
    const monthNameLong = dateObj.toLocaleString('pt-BR', { month: 'long' });

    this.selectedAno = [{ id: '2023', descricao: '2023' }];
    //this.selectedMes = [{id: new Date().getMonth().toString() + 1, descricao: monthNameLong }];
    this.selectedMes = [{ id: 12, descricao: 'dezembro' }];

    const mes: { id: string; descricao: string } = this.selectedMes[0];
    const ano: { id: string; descricao: string } = this.selectedAno[0];

    this.dataInicio = ano.id + '-' + mes.id + '-' + 1;
    this.dataFim = ano.id + '-' + mes.id + '-' + 1;

    const ultimaData = moment(this.dataInicio).endOf('month').format('YYYY-MM-DD');
    const ultimoDia = ultimaData.substring(ultimaData.lastIndexOf('-') + 1);
    this.ultimoDia = Number(ultimoDia);

    this.load(1);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  navChanged1(event: any): void {
    this.load(event);
  }

  montaRelatorioControleComanda(tab: string): void {
    const tagControleComanda = '#wdr-relatorio-comanda-1-' + tab;

    this.pivotControleComanda = new WebDataRocks({
      container: tagControleComanda,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.customControleComanda,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataControleComanda,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 200,
            },
            {
              idx: 1,
              width: 140,
            },
            {
              idx: 2,
              width: 140,
            },
            {
              idx: 3,
              width: 140,
            },
            {
              idx: 4,
              width: 140,
            },
            {
              idx: 5,
              width: 140,
            },
            {
              idx: 5,
              width: 140,
            },
            {
              idx: 7,
              width: 140,
            },
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'turno',
              sort: 'asc',
            },
          ],
          columns: [
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'inicio',
              aggregation: 'sum',
              caption: 'Início',
              format: 'numero',
            },
            {
              uniqueName: 'fim',
              aggregation: 'sum',
              caption: 'Término',
              format: 'numero',
            },
            {
              uniqueName: 'Formula #1',
              formula: 'sum("abertas") + sum("lancadas") + sum("desviadas") + sum("naoUsadas") + sum("emAnalise") + sum("fechadas")',
              caption: 'Qtde',
              format: 'numero',
            },
            {
              uniqueName: 'abertas',
              aggregation: 'sum',
              caption: 'Abertas',
              format: 'numero',
            },
            {
              uniqueName: 'fechadas',
              aggregation: 'sum',
              caption: 'Fechadas',
              format: 'numero',
            },
            {
              uniqueName: 'lancadas',
              aggregation: 'sum',
              caption: 'Lançadas',
              format: 'numero',
            },
            {
              uniqueName: 'desviadas',
              aggregation: 'sum',
              caption: 'Desviadas',
              format: 'numero',
            },
            {
              uniqueName: 'naoUsadas',
              aggregation: 'sum',
              caption: 'Não usadas',
              format: 'numero',
            },
            {
              uniqueName: 'emAnalise',
              aggregation: 'sum',
              caption: 'Em análise',
              format: 'numero',
            },

            {
              uniqueName: 'valor',
              aggregation: 'sum',
              caption: 'Valor Total',
              format: 'decimal',
            },
          ],
          drills: {
            drillAll: true,
          },
        },
        formats: [
          {
            name: 'numero',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 0,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'decimal',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'texto',
            textAlign: 'left',
          },
        ],

        conditions: [
          {
            formula: '#value > 0',
            measure: 'desviadas',
            format: {
              backgroundColor: '#FF0000',
              color: '#000000',
              fontFamily: 'Arial',
              fontSize: '14px',
            },
          },
          {
            formula: '#value > 0',
            measure: 'emAnalise',
            format: {
              backgroundColor: '#ffff00',
              color: '#000000',
              fontFamily: 'Arial',
              fontSize: '14px',
            },
          },
        ],

        options: {
          grid: {
            type: 'flat',
            title: '',
            showFilter: false,
            showHeaders: false,
            showTotals: true,

            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: false,
          showAggregations: true,

          showCalculatedValuesButton: true,
          drillThrough: true,
          sorting: 'on',
          datePattern: 'dd/MM/yyyy',
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          showDefaultSlice: true,
          defaultHierarchySortName: 'asc',
        },
      },
    });

    this.pivotControleComanda.expandAllData();
  }

  montaRelatorioValoresRecebidos(tab: string): void {
    const tagValoresRecebidos = '#wdr-relatorio-comanda-2-' + tab;

    this.pivotValoresRecebidos = new WebDataRocks({
      container: tagValoresRecebidos,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.customValoresRecebidos,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataControleValoresRecebidos,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 200,
            },
            {
              idx: 1,
              width: 240,
            },
            {
              idx: 2,
              width: 150,
            },
            {
              idx: 3,
              width: 100,
            },
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'origem',
              sort: 'asc',
            },
            {
              uniqueName: 'equipamento',
              sort: 'asc',
            },
            {
              uniqueName: 'tipo',
              sort: 'asc',
            },
          ],
          columns: [
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'valor',
              aggregation: 'sum',
              caption: 'Total',
              format: 'decimal',
            },
          ],
          drills: {
            drillAll: true,
          },
        },
        formats: [
          {
            name: 'numero',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 0,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'decimal',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'texto',
            textAlign: 'left',
          },
        ],

        conditions: [
          {
            formula: '#value > 0',
            measure: 'desviadas',
            format: {
              backgroundColor: '#FF0000',
              color: '#000000',
              fontFamily: 'Arial',
              fontSize: '14px',
            },
          },
          {
            formula: '#value > 0',
            measure: 'emAnalise',
            format: {
              backgroundColor: '#ffff00',
              color: '#000000',
              fontFamily: 'Arial',
              fontSize: '14px',
            },
          },
        ],

        options: {
          grid: {
            type: 'flat',
            title: '',
            showFilter: false,
            showHeaders: false,
            showTotals: true,

            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: false,
          showAggregations: true,

          showCalculatedValuesButton: true,
          drillThrough: true,
          sorting: 'on',
          datePattern: 'dd/MM/yyyy',
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          showDefaultSlice: true,
          defaultHierarchySortName: 'asc',
        },
        //localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivotValoresRecebidos.expandAllData();
  }

  montaRelatorioConferenciaExtrato(tab: string): void {
    const tag = '#wdr-relatorio-comanda-7-' + tab;

    this.pivotConferenciaExtrato = new WebDataRocks({
      container: tag,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.customValoresRecebidos,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataConferenciaExtrato,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 230,
            },
            {
              idx: 1,
              width: 180,
            },
            {
              idx: 2,
              width: 150,
            },
            {
              idx: 3,
              width: 150,
            },
            {
              idx: 4,
              width: 150,
            },
            {
              idx: 5,
              width: 150,
            },
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'equipamento',
              sort: 'asc',
            },
            {
              uniqueName: 'tipo',
              sort: 'asc',
            },
          ],
          columns: [
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'valorPrevisto',
              aggregation: 'sum',
              caption: 'Previsto',
              format: 'decimal',
            },
            {
              uniqueName: 'valorConfirmado',
              aggregation: 'sum',
              caption: 'Confirmado',
              format: 'decimal',
            },
            {
              uniqueName: 'valorTaxa',
              aggregation: 'sum',
              caption: 'Taxa',
              format: 'decimal',
            },
            {
              uniqueName: 'diferenca',
              formula: 'sum("valorPrevisto") - sum("valorConfirmado") ',
              caption: 'Diferença',
              format: 'decimal',
            },
          ],
          drills: {
            drillAll: true,
          },
        },
        formats: [
          {
            name: 'numero',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 0,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'decimal',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'texto',
            textAlign: 'left',
          },
        ],

        conditions: [
          {
            formula: '#value > 0',
            measure: 'diferenca',
            format: {
              backgroundColor: '#FF0000',
              color: '#000000',
              fontFamily: 'Arial',
              fontSize: '14px',
            },
          },
        ],

        options: {
          grid: {
            type: 'flat',
            title: '',
            showFilter: false,
            showHeaders: false,
            showTotals: true,

            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: false,
          showAggregations: true,

          showCalculatedValuesButton: true,
          drillThrough: true,
          sorting: 'on',
          datePattern: 'dd/MM/yyyy',
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          showDefaultSlice: true,
          defaultHierarchySortName: 'asc',
        },
        //localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivotConferenciaExtrato.expandAllData();
  }

  montaRelatorioConferenciaExtratoAcumulado(tab: string): void {
    const tag = '#wdr-relatorio-comanda-8-' + tab;

    this.pivotConferenciaExtratoAcumulado = new WebDataRocks({
      container: tag,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.customValoresRecebidosResumo,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataConferenciaExtratoAcumulado,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 230,
            },
            {
              idx: 1,
              width: 180,
            },
            {
              idx: 2,
              width: 150,
            },
            {
              idx: 3,
              width: 150,
            },
            {
              idx: 4,
              width: 150,
            },
            {
              idx: 5,
              width: 150,
            },
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'equipamento',
              sort: 'asc',
            },
            {
              uniqueName: 'tipo',
              sort: 'asc',
            },
          ],
          columns: [
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'Formula #1',
              formula:
                'sum("d01") + sum("d02") + sum("d03") + sum("d04") + sum("d05") + sum("d06") + sum("d07") + sum("d08") + sum("d09") + sum("d10") + sum("d11") + sum("d12") + sum("d13") + sum("d14") + sum("d15") + sum("d16") + sum("d17") + sum("d18") + sum("d19") + sumsum("d20") + (sum("d21") + sum("d22") + sum("d23") + sum("d24") + sum("d25") + sum("d26") + sum("d27") + sum("d28") + sum("d29") + sum("d30") + sum("d31") ',
              caption: 'Total',
              format: 'decimal',
            },
            {
              uniqueName: 'd01',
              aggregation: 'sum',
              caption: '01',
              format: 'decimal',
            },
            {
              uniqueName: 'd02',
              aggregation: 'sum',
              caption: '02',
              format: 'decimal',
            },
            {
              uniqueName: 'd03',
              aggregation: 'sum',
              caption: '03',
              format: 'decimal',
            },
            {
              uniqueName: 'd04',
              aggregation: 'sum',
              caption: '04',
              format: 'decimal',
            },
            {
              uniqueName: 'd05',
              aggregation: 'sum',
              caption: '05',
              format: 'decimal',
            },
            {
              uniqueName: 'd06',
              aggregation: 'sum',
              caption: '06',
              format: 'decimal',
            },
            {
              uniqueName: 'd07',
              aggregation: 'sum',
              caption: '07',
              format: 'decimal',
            },
            {
              uniqueName: 'd08',
              aggregation: 'sum',
              caption: '08',
              format: 'decimal',
            },
            {
              uniqueName: 'd09',
              aggregation: 'sum',
              caption: '09',
              format: 'decimal',
            },
            {
              uniqueName: 'd10',
              aggregation: 'sum',
              caption: '10',
              format: 'decimal',
            },
            {
              uniqueName: 'd11',
              aggregation: 'sum',
              caption: '11',
              format: 'decimal',
            },
            {
              uniqueName: 'd12',
              aggregation: 'sum',
              caption: '12',
              format: 'decimal',
            },
            {
              uniqueName: 'd13',
              aggregation: 'sum',
              caption: '13',
              format: 'decimal',
            },
            {
              uniqueName: 'd14',
              aggregation: 'sum',
              caption: '14',
              format: 'decimal',
            },
            {
              uniqueName: 'd15',
              aggregation: 'sum',
              caption: '15',
              format: 'decimal',
            },
            {
              uniqueName: 'd16',
              aggregation: 'sum',
              caption: '16',
              format: 'decimal',
            },
            {
              uniqueName: 'd17',
              aggregation: 'sum',
              caption: '17',
              format: 'decimal',
            },
            {
              uniqueName: 'd18',
              aggregation: 'sum',
              caption: '18',
              format: 'decimal',
            },
            {
              uniqueName: 'd19',
              aggregation: 'sum',
              caption: '19',
              format: 'decimal',
            },
            {
              uniqueName: 'd20',
              aggregation: 'sum',
              caption: '20',
              format: 'decimal',
            },
            {
              uniqueName: 'd21',
              aggregation: 'sum',
              caption: '21',
              format: 'decimal',
            },
            {
              uniqueName: 'd22',
              aggregation: 'sum',
              caption: '22',
              format: 'decimal',
            },
            {
              uniqueName: 'd23',
              aggregation: 'sum',
              caption: '23',
              format: 'decimal',
            },
            {
              uniqueName: 'd24',
              aggregation: 'sum',
              caption: '24',
              format: 'decimal',
            },
            {
              uniqueName: 'd25',
              aggregation: 'sum',
              caption: '25',
              format: 'decimal',
            },
            {
              uniqueName: 'd26',
              aggregation: 'sum',
              caption: '26',
              format: 'decimal',
            },
            {
              uniqueName: 'd27',
              aggregation: 'sum',
              caption: '27',
              format: 'decimal',
            },
            {
              uniqueName: 'd28',
              aggregation: 'sum',
              caption: '28',
              format: 'decimal',
            },
            {
              uniqueName: 'd29',
              aggregation: 'sum',
              caption: '29',
              format: 'decimal',
            },
            {
              uniqueName: 'd30',
              aggregation: 'sum',
              caption: '30',
              format: 'decimal',
            },
            {
              uniqueName: 'd31',
              aggregation: 'sum',
              caption: '31',
              format: 'decimal',
            },
          ],
          drills: {
            drillAll: true,
          },
        },
        formats: [
          {
            name: 'numero',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 0,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'decimal',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'texto',
            textAlign: 'left',
          },
        ],

        conditions: [
          {
            formula: '#value > 0',
            measure: 'diferenca',
            format: {
              backgroundColor: '#FF0000',
              color: '#000000',
              fontFamily: 'Arial',
              fontSize: '14px',
            },
          },
        ],

        options: {
          grid: {
            type: 'flat',
            title: '',
            showFilter: false,
            showHeaders: false,
            showTotals: true,

            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: false,
          showAggregations: true,

          showCalculatedValuesButton: true,
          drillThrough: true,
          sorting: 'on',
          datePattern: 'dd/MM/yyyy',
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          showDefaultSlice: true,
          defaultHierarchySortName: 'asc',
        },
        //localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivotConferenciaExtratoAcumulado.expandAllData();
  }

  montaRelatorioValoresRecebidosResumoRecebidos(tab: string): void {
    const tagValoresRecebidos = '#wdr-relatorio-comanda-4-' + tab;

    this.pivotValoresRecebidosResumoRecebidos = new WebDataRocks({
      container: tagValoresRecebidos,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.customValoresRecebidosResumo,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataControleValoresRecebidosResumo,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 180,
            },
            {
              idx: 1,
              width: 100,
            },
            {
              idx: 2,
              width: 100,
            },
            {
              idx: 3,
              width: 100,
            },
            {
              idx: 4,
              width: 100,
            },
            {
              idx: 5,
              width: 100,
            },
            {
              idx: 6,
              width: 100,
            },
            {
              idx: 7,
              width: 100,
            },
            {
              idx: 8,
              width: 100,
            },
            {
              idx: 9,
              width: 100,
            },
            {
              idx: 10,
              width: 100,
            },
            {
              idx: 11,
              width: 100,
            },
            {
              idx: 12,
              width: 100,
            },
            {
              idx: 13,
              width: 100,
            },
            {
              idx: 14,
              width: 100,
            },
            {
              idx: 15,
              width: 100,
            },
            {
              idx: 16,
              width: 100,
            },
            {
              idx: 17,
              width: 100,
            },
            {
              idx: 18,
              width: 100,
            },
            {
              idx: 19,
              width: 100,
            },
            {
              idx: 20,
              width: 100,
            },
            {
              idx: 21,
              width: 100,
            },
            {
              idx: 22,
              width: 100,
            },
            {
              idx: 23,
              width: 100,
            },
            {
              idx: 24,
              width: 100,
            },
            {
              idx: 25,
              width: 100,
            },
            {
              idx: 26,
              width: 100,
            },
            {
              idx: 27,
              width: 100,
            },
            {
              idx: 28,
              width: 100,
            },
            {
              idx: 29,
              width: 100,
            },
            {
              idx: 30,
              width: 100,
            },
            {
              idx: 31,
              width: 100,
            },
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'tipo',
              sort: 'asc',
            },
          ],
          columns: [
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'Formula #1',
              formula:
                'sum("d01") + sum("d02") + sum("d03") + sum("d04") + sum("d05") + sum("d06") + sum("d07") + sum("d08") + sum("d09") + sum("d10") + sum("d11") + sum("d12") + sum("d13") + sum("d14") + sum("d15") + sum("d16") + sum("d17") + sum("d18") + sum("d19") + sumsum("d20") + (sum("d21") + sum("d22") + sum("d23") + sum("d24") + sum("d25") + sum("d26") + sum("d27") + sum("d28") + sum("d29") + sum("d30") + sum("d31") ',
              caption: 'Total',
              format: 'decimal',
            },
            {
              uniqueName: 'd01',
              aggregation: 'sum',
              caption: '01',
              format: 'decimal',
            },
            {
              uniqueName: 'd02',
              aggregation: 'sum',
              caption: '02',
              format: 'decimal',
            },
            {
              uniqueName: 'd03',
              aggregation: 'sum',
              caption: '03',
              format: 'decimal',
            },
            {
              uniqueName: 'd04',
              aggregation: 'sum',
              caption: '04',
              format: 'decimal',
            },
            {
              uniqueName: 'd05',
              aggregation: 'sum',
              caption: '05',
              format: 'decimal',
            },
            {
              uniqueName: 'd06',
              aggregation: 'sum',
              caption: '06',
              format: 'decimal',
            },
            {
              uniqueName: 'd07',
              aggregation: 'sum',
              caption: '07',
              format: 'decimal',
            },
            {
              uniqueName: 'd08',
              aggregation: 'sum',
              caption: '08',
              format: 'decimal',
            },
            {
              uniqueName: 'd09',
              aggregation: 'sum',
              caption: '09',
              format: 'decimal',
            },
            {
              uniqueName: 'd10',
              aggregation: 'sum',
              caption: '10',
              format: 'decimal',
            },
            {
              uniqueName: 'd11',
              aggregation: 'sum',
              caption: '11',
              format: 'decimal',
            },
            {
              uniqueName: 'd12',
              aggregation: 'sum',
              caption: '12',
              format: 'decimal',
            },
            {
              uniqueName: 'd13',
              aggregation: 'sum',
              caption: '13',
              format: 'decimal',
            },
            {
              uniqueName: 'd14',
              aggregation: 'sum',
              caption: '14',
              format: 'decimal',
            },
            {
              uniqueName: 'd15',
              aggregation: 'sum',
              caption: '15',
              format: 'decimal',
            },
            {
              uniqueName: 'd16',
              aggregation: 'sum',
              caption: '16',
              format: 'decimal',
            },
            {
              uniqueName: 'd17',
              aggregation: 'sum',
              caption: '17',
              format: 'decimal',
            },
            {
              uniqueName: 'd18',
              aggregation: 'sum',
              caption: '18',
              format: 'decimal',
            },
            {
              uniqueName: 'd19',
              aggregation: 'sum',
              caption: '19',
              format: 'decimal',
            },
            {
              uniqueName: 'd20',
              aggregation: 'sum',
              caption: '20',
              format: 'decimal',
            },
            {
              uniqueName: 'd21',
              aggregation: 'sum',
              caption: '21',
              format: 'decimal',
            },
            {
              uniqueName: 'd22',
              aggregation: 'sum',
              caption: '22',
              format: 'decimal',
            },
            {
              uniqueName: 'd23',
              aggregation: 'sum',
              caption: '23',
              format: 'decimal',
            },
            {
              uniqueName: 'd24',
              aggregation: 'sum',
              caption: '24',
              format: 'decimal',
            },
            {
              uniqueName: 'd25',
              aggregation: 'sum',
              caption: '25',
              format: 'decimal',
            },
            {
              uniqueName: 'd26',
              aggregation: 'sum',
              caption: '26',
              format: 'decimal',
            },
            {
              uniqueName: 'd27',
              aggregation: 'sum',
              caption: '27',
              format: 'decimal',
            },
            {
              uniqueName: 'd28',
              aggregation: 'sum',
              caption: '28',
              format: 'decimal',
            },
            {
              uniqueName: 'd29',
              aggregation: 'sum',
              caption: '29',
              format: 'decimal',
            },
            {
              uniqueName: 'd30',
              aggregation: 'sum',
              caption: '30',
              format: 'decimal',
            },
            {
              uniqueName: 'd31',
              aggregation: 'sum',
              caption: '31',
              format: 'decimal',
            },
          ],
          drills: {
            drillAll: true,
          },
        },
        formats: [
          {
            name: 'numero',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 0,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'decimal',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'texto',
            textAlign: 'left',
          },
        ],

        options: {
          grid: {
            type: 'flat',
            title: '',
            showFilter: false,
            showHeaders: false,
            showTotals: true,

            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: false,
          showAggregations: true,

          showCalculatedValuesButton: true,
          drillThrough: true,
          sorting: 'on',
          datePattern: 'dd/MM/yyyy',
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          showDefaultSlice: true,
          defaultHierarchySortName: 'asc',
        },
        // localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivotValoresRecebidosResumoRecebidos.expandAllData();
  }

  montaRelatorioValoresRecebidosResumoLancados(tab: string): void {
    const tagValoresRecebidos = '#wdr-relatorio-comanda-5-' + tab;

    this.pivotValoresRecebidosResumoLancados = new WebDataRocks({
      container: tagValoresRecebidos,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.customValoresRecebidosResumo,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataControleValoresRecebidosResumo,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 180,
            },
            {
              idx: 1,
              width: 100,
            },
            {
              idx: 2,
              width: 100,
            },
            {
              idx: 3,
              width: 100,
            },
            {
              idx: 4,
              width: 100,
            },
            {
              idx: 5,
              width: 100,
            },
            {
              idx: 6,
              width: 100,
            },
            {
              idx: 7,
              width: 100,
            },
            {
              idx: 8,
              width: 100,
            },
            {
              idx: 9,
              width: 100,
            },
            {
              idx: 10,
              width: 100,
            },
            {
              idx: 11,
              width: 100,
            },
            {
              idx: 12,
              width: 100,
            },
            {
              idx: 13,
              width: 100,
            },
            {
              idx: 14,
              width: 100,
            },
            {
              idx: 15,
              width: 100,
            },
            {
              idx: 16,
              width: 100,
            },
            {
              idx: 17,
              width: 100,
            },
            {
              idx: 18,
              width: 100,
            },
            {
              idx: 19,
              width: 100,
            },
            {
              idx: 20,
              width: 100,
            },
            {
              idx: 21,
              width: 100,
            },
            {
              idx: 22,
              width: 100,
            },
            {
              idx: 23,
              width: 100,
            },
            {
              idx: 24,
              width: 100,
            },
            {
              idx: 25,
              width: 100,
            },
            {
              idx: 26,
              width: 100,
            },
            {
              idx: 27,
              width: 100,
            },
            {
              idx: 28,
              width: 100,
            },
            {
              idx: 29,
              width: 100,
            },
            {
              idx: 30,
              width: 100,
            },
            {
              idx: 31,
              width: 100,
            },
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'tipo',
              sort: 'asc',
            },
          ],
          columns: [
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'Formula #1',
              formula:
                'sum("d01L") + sum("d02L") + sum("d03L") + sum("d04L") + sum("d05L") + sum("d06L") + sum("d07L") + sum("d08L") + sum("d09L") + sum("d10L") + sum("d11L") + sum("d12L") + sum("d13L") + sum("d14L") + sum("d15L") + sum("d16L") + sum("d17L") + sum("d18L") + sum("d19L") + sumsum("d20L") + sum("d21L") + sum("d22L") + sum("d23L") + sum("d24L") + sum("d25L") + sum("d26L") + sum("d27L") + sum("d28L") + sum("d29L") + sum("d30L") + sum("d31L") ',
              caption: 'Total',
              format: 'decimal',
            },
            {
              uniqueName: 'd01L',
              aggregation: 'sum',
              caption: '01',
              format: 'decimal',
            },
            {
              uniqueName: 'd02L',
              aggregation: 'sum',
              caption: '02',
              format: 'decimal',
            },
            {
              uniqueName: 'd03L',
              aggregation: 'sum',
              caption: '03',
              format: 'decimal',
            },
            {
              uniqueName: 'd04L',
              aggregation: 'sum',
              caption: '04',
              format: 'decimal',
            },
            {
              uniqueName: 'd05L',
              aggregation: 'sum',
              caption: '05',
              format: 'decimal',
            },
            {
              uniqueName: 'd06L',
              aggregation: 'sum',
              caption: '06',
              format: 'decimal',
            },
            {
              uniqueName: 'd07L',
              aggregation: 'sum',
              caption: '07',
              format: 'decimal',
            },
            {
              uniqueName: 'd08L',
              aggregation: 'sum',
              caption: '08',
              format: 'decimal',
            },
            {
              uniqueName: 'd09L',
              aggregation: 'sum',
              caption: '09',
              format: 'decimal',
            },
            {
              uniqueName: 'd10L',
              aggregation: 'sum',
              caption: '10',
              format: 'decimal',
            },
            {
              uniqueName: 'd11L',
              aggregation: 'sum',
              caption: '11',
              format: 'decimal',
            },
            {
              uniqueName: 'd12L',
              aggregation: 'sum',
              caption: '12',
              format: 'decimal',
            },
            {
              uniqueName: 'd13L',
              aggregation: 'sum',
              caption: '13',
              format: 'decimal',
            },
            {
              uniqueName: 'd14L',
              aggregation: 'sum',
              caption: '14',
              format: 'decimal',
            },
            {
              uniqueName: 'd15L',
              aggregation: 'sum',
              caption: '15',
              format: 'decimal',
            },
            {
              uniqueName: 'd16L',
              aggregation: 'sum',
              caption: '16',
              format: 'decimal',
            },
            {
              uniqueName: 'd17L',
              aggregation: 'sum',
              caption: '17',
              format: 'decimal',
            },
            {
              uniqueName: 'd18L',
              aggregation: 'sum',
              caption: '18',
              format: 'decimal',
            },
            {
              uniqueName: 'd19L',
              aggregation: 'sum',
              caption: '19',
              format: 'decimal',
            },
            {
              uniqueName: 'd20L',
              aggregation: 'sum',
              caption: '20',
              format: 'decimal',
            },
            {
              uniqueName: 'd21L',
              aggregation: 'sum',
              caption: '21',
              format: 'decimal',
            },
            {
              uniqueName: 'd22L',
              aggregation: 'sum',
              caption: '22',
              format: 'decimal',
            },
            {
              uniqueName: 'd23L',
              aggregation: 'sum',
              caption: '23',
              format: 'decimal',
            },
            {
              uniqueName: 'd24L',
              aggregation: 'sum',
              caption: '24',
              format: 'decimal',
            },
            {
              uniqueName: 'd25L',
              aggregation: 'sum',
              caption: '25',
              format: 'decimal',
            },
            {
              uniqueName: 'd26L',
              aggregation: 'sum',
              caption: '26',
              format: 'decimal',
            },
            {
              uniqueName: 'd27L',
              aggregation: 'sum',
              caption: '27',
              format: 'decimal',
            },
            {
              uniqueName: 'd28L',
              aggregation: 'sum',
              caption: '28',
              format: 'decimal',
            },
            {
              uniqueName: 'd29L',
              aggregation: 'sum',
              caption: '29',
              format: 'decimal',
            },
            {
              uniqueName: 'd30L',
              aggregation: 'sum',
              caption: '30',
              format: 'decimal',
            },
            {
              uniqueName: 'd31L',
              aggregation: 'sum',
              caption: '31',
              format: 'decimal',
            },
          ],
          drills: {
            drillAll: true,
          },
        },
        formats: [
          {
            name: 'numero',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 0,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'decimal',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'texto',
            textAlign: 'left',
          },
        ],

        options: {
          grid: {
            type: 'flat',
            title: '',
            showFilter: false,
            showHeaders: false,
            showTotals: true,

            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: false,
          showAggregations: true,

          showCalculatedValuesButton: true,
          drillThrough: true,
          sorting: 'on',
          datePattern: 'dd/MM/yyyy',
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          showDefaultSlice: true,
          defaultHierarchySortName: 'asc',
        },
        // localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivotValoresRecebidosResumoLancados.expandAllData();
  }

  montaConferencia(tab: string): void {
    const tagConferencia = '#wdr-relatorio-comanda-3-' + tab;

    this.pivotConferencia = new WebDataRocks({
      container: tagConferencia,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.customConferencia,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataControleConferencia,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 180,
            },
            {
              idx: 1,
              width: 220,
            },
            {
              idx: 2,
              width: 220,
            },
            {
              idx: 3,
              width: 120,
            },
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'grupo',
              sort: 'asc',
            },
          ],
          columns: [
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'valorRecebido',
              aggregation: 'sum',
              caption: 'Valores Recebidos',
              format: 'decimal',
            },
            {
              uniqueName: 'valorInformado',
              aggregation: 'sum',
              caption: 'Valores Lançados',
              format: 'decimal',
            },
            {
              uniqueName: 'diferenca',
              formula: 'sum("valorInformado") - sum("valorRecebido") ',
              caption: 'Diferença',
              format: 'decimal',
            },
          ],
          expands: {
            expandAll: true,
          },
          drills: {
            drillAll: true,
          },
        },
        formats: [
          {
            name: 'numero',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 0,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'decimal',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'texto',
            textAlign: 'left',
          },
        ],

        conditions: [
          {
            formula: '#value != 0',
            measure: 'diferenca',
            format: {
              backgroundColor: '#FF0000',
              color: '#000000',
              fontFamily: 'Arial',
              fontSize: '14px',
            },
          },
        ],

        options: {
          grid: {
            type: 'flat',
            title: '',
            showFilter: false,
            showHeaders: false,
            showTotals: true,
            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: false,
          showAggregations: true,
          showCalculatedValuesButton: true,
          drillThrough: true,
          sorting: 'on',
          datePattern: 'dd/MM/yyyy',
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          showDefaultSlice: true,
          defaultHierarchySortName: 'asc',
        },
        // localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivotConferencia.expandAllData();
  }

  montaDespesas(tab: string): void {
    const tagDespesas = '#wdr-relatorio-comanda-8-' + tab;

    this.pivotDespesas = new WebDataRocks({
      container: tagDespesas,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.customConferencia,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataDespesas,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 180,
            },
            {
              idx: 1,
              width: 220,
            },
            {
              idx: 2,
              width: 220,
            },
            {
              idx: 3,
              width: 120,
            },
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'grupo',
              sort: 'asc',
            },
            {
              uniqueName: 'tipo',
              sort: 'asc',
            },
            {
              uniqueName: 'descricao',
              sort: 'asc',
            },
          ],
          columns: [
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'valorVencimento',
              aggregation: 'sum',
              caption: 'Valor',
              format: 'decimal',
            },
            {
              uniqueName: 'valorPagamento',
              aggregation: 'sum',
              caption: 'Valor Pago',
              format: 'decimal',
            },
          ],
          expands: {
            expandAll: true,
          },
          drills: {
            drillAll: true,
          },
        },
        formats: [
          {
            name: 'numero',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 0,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'decimal',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'texto',
            textAlign: 'left',
          },
        ],

        conditions: [
          {
            formula: '#value != 0',
            measure: 'diferenca',
            format: {
              backgroundColor: '#FF0000',
              color: '#000000',
              fontFamily: 'Arial',
              fontSize: '14px',
            },
          },
        ],

        options: {
          grid: {
            type: 'flat',
            title: '',
            showFilter: false,
            showHeaders: false,
            showTotals: true,
            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: false,
          showAggregations: true,
          showCalculatedValuesButton: true,
          drillThrough: true,
          sorting: 'on',
          datePattern: 'dd/MM/yyyy',
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          showDefaultSlice: true,
          defaultHierarchySortName: 'asc',
        },
        //localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivotDespesas.expandAllData();
  }

  montaRelatorio(tab: string): void {
    this.montaRelatorioControleComanda(tab);

    this.montaRelatorioValoresRecebidos(tab);

    this.montaConferencia(tab);

    if (tab !== '99') {
      this.montaRelatorioConferenciaExtrato(tab);
      this.montaDespesas(tab);
    }

    if (tab === '99') {
      this.montaRelatorioValoresRecebidosResumoRecebidos(tab);
      this.montaRelatorioValoresRecebidosResumoLancados(tab);
      this.montaRelatorioTicketMedio(tab);
      this.montaRelatorioConferenciaExtratoAcumulado(tab);
    }
  }

  montaRelatorioTicketMedio(tab: string): void {
    const tagValoresTickeMedio = '#wdr-relatorio-comanda-6-' + tab;

    this.pivotTicketMedio = new WebDataRocks({
      container: tagValoresTickeMedio,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.customValoresRecebidosResumo,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataTicketMedio,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 180,
            },
            {
              idx: 1,
              width: 100,
            },
            {
              idx: 2,
              width: 100,
            },
            {
              idx: 3,
              width: 100,
            },
            {
              idx: 4,
              width: 100,
            },
            {
              idx: 5,
              width: 100,
            },
            {
              idx: 6,
              width: 100,
            },
            {
              idx: 7,
              width: 100,
            },
            {
              idx: 8,
              width: 100,
            },
            {
              idx: 9,
              width: 100,
            },
            {
              idx: 10,
              width: 100,
            },
            {
              idx: 11,
              width: 100,
            },
            {
              idx: 12,
              width: 100,
            },
            {
              idx: 13,
              width: 100,
            },
            {
              idx: 14,
              width: 100,
            },
            {
              idx: 15,
              width: 100,
            },
            {
              idx: 16,
              width: 100,
            },
            {
              idx: 17,
              width: 100,
            },
            {
              idx: 18,
              width: 100,
            },
            {
              idx: 19,
              width: 100,
            },
            {
              idx: 20,
              width: 100,
            },
            {
              idx: 21,
              width: 100,
            },
            {
              idx: 22,
              width: 100,
            },
            {
              idx: 23,
              width: 100,
            },
            {
              idx: 24,
              width: 100,
            },
            {
              idx: 25,
              width: 100,
            },
            {
              idx: 26,
              width: 100,
            },
            {
              idx: 27,
              width: 100,
            },
            {
              idx: 28,
              width: 100,
            },
            {
              idx: 29,
              width: 100,
            },
            {
              idx: 30,
              width: 100,
            },
            {
              idx: 31,
              width: 100,
            },
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'tipo',
              sort: 'asc',
            },
          ],
          columns: [
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'Formula #1',
              formula:
                '(sum("d01") + sum("d02") + sum("d03") + sum("d04") + sum("d05") + sum("d06") + sum("d07") + sum("d08") + sum("d09") + sum("d10") + sum("d11") + sum("d12") + sum("d13") + sum("d14") + sum("d15") + sum("d16") + sum("d17") + sum("d18") + sum("d19") + sumsum("d20") + sum("d21") + sum("d22") + sum("d23") + sum("d24") + sum("d25") + sum("d26") + sum("d27") + sum("d28") + sum("d29") + sum("d30") + sum("d31")) / 31',
              caption: 'Total',
              format: 'decimal',
            },
            {
              uniqueName: 'd01',
              aggregation: 'sum',
              caption: '01',
              format: 'decimal',
            },
            {
              uniqueName: 'd02',
              aggregation: 'sum',
              caption: '02',
              format: 'decimal',
            },
            {
              uniqueName: 'd03',
              aggregation: 'sum',
              caption: '03',
              format: 'decimal',
            },
            {
              uniqueName: 'd04',
              aggregation: 'sum',
              caption: '04',
              format: 'decimal',
            },
            {
              uniqueName: 'd05',
              aggregation: 'sum',
              caption: '05',
              format: 'decimal',
            },
            {
              uniqueName: 'd06',
              aggregation: 'sum',
              caption: '06',
              format: 'decimal',
            },
            {
              uniqueName: 'd07',
              aggregation: 'sum',
              caption: '07',
              format: 'decimal',
            },
            {
              uniqueName: 'd08',
              aggregation: 'sum',
              caption: '08',
              format: 'decimal',
            },
            {
              uniqueName: 'd09',
              aggregation: 'sum',
              caption: '09',
              format: 'decimal',
            },
            {
              uniqueName: 'd10',
              aggregation: 'sum',
              caption: '10',
              format: 'decimal',
            },
            {
              uniqueName: 'd11',
              aggregation: 'sum',
              caption: '11',
              format: 'decimal',
            },
            {
              uniqueName: 'd12',
              aggregation: 'sum',
              caption: '12',
              format: 'decimal',
            },
            {
              uniqueName: 'd13',
              aggregation: 'sum',
              caption: '13',
              format: 'decimal',
            },
            {
              uniqueName: 'd14',
              aggregation: 'sum',
              caption: '14',
              format: 'decimal',
            },
            {
              uniqueName: 'd15',
              aggregation: 'sum',
              caption: '15',
              format: 'decimal',
            },
            {
              uniqueName: 'd16',
              aggregation: 'sum',
              caption: '16',
              format: 'decimal',
            },
            {
              uniqueName: 'd17',
              aggregation: 'sum',
              caption: '17',
              format: 'decimal',
            },
            {
              uniqueName: 'd18',
              aggregation: 'sum',
              caption: '18',
              format: 'decimal',
            },
            {
              uniqueName: 'd19',
              aggregation: 'sum',
              caption: '19',
              format: 'decimal',
            },
            {
              uniqueName: 'd20',
              aggregation: 'sum',
              caption: '20',
              format: 'decimal',
            },
            {
              uniqueName: 'd21',
              aggregation: 'sum',
              caption: '21',
              format: 'decimal',
            },
            {
              uniqueName: 'd22',
              aggregation: 'sum',
              caption: '22',
              format: 'decimal',
            },
            {
              uniqueName: 'd23',
              aggregation: 'sum',
              caption: '23',
              format: 'decimal',
            },
            {
              uniqueName: 'd24',
              aggregation: 'sum',
              caption: '24',
              format: 'decimal',
            },
            {
              uniqueName: 'd25',
              aggregation: 'sum',
              caption: '25',
              format: 'decimal',
            },
            {
              uniqueName: 'd26',
              aggregation: 'sum',
              caption: '26',
              format: 'decimal',
            },
            {
              uniqueName: 'd27',
              aggregation: 'sum',
              caption: '27',
              format: 'decimal',
            },
            {
              uniqueName: 'd28',
              aggregation: 'sum',
              caption: '28',
              format: 'decimal',
            },
            {
              uniqueName: 'd29',
              aggregation: 'sum',
              caption: '29',
              format: 'decimal',
            },
            {
              uniqueName: 'd30',
              aggregation: 'sum',
              caption: '30',
              format: 'decimal',
            },
            {
              uniqueName: 'd31',
              aggregation: 'sum',
              caption: '31',
              format: 'decimal',
            },
          ],
          drills: {
            drillAll: true,
          },
        },
        formats: [
          {
            name: 'numero',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 0,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'decimal',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
          {
            name: 'texto',
            textAlign: 'left',
          },
        ],

        options: {
          grid: {
            type: 'flat',
            title: '',
            showFilter: false,
            showHeaders: false,
            showTotals: true,

            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: false,
          showAggregations: true,

          showCalculatedValuesButton: true,
          drillThrough: true,
          sorting: 'on',
          datePattern: 'dd/MM/yyyy',
          dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
          showDefaultSlice: true,
          defaultHierarchySortName: 'asc',
        },
        // localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivotTicketMedio.expandAllData();
  }

  onItemSelectAno(item: any): void {}

  onItemDeSelectAno(item: any): void {}

  onItemSelectMes(item: any): void {}

  onItemDeSelectMes(item: any): void {}

  customControleComanda(cell: any, data: any): void {
    let col = 0;
    let row = 0;

    if (data.columnIndex > col) {
      col = data.columnIndex;
    }
    if (data.rowIndex > row) {
      row = data.rowIndex;
    }

    cell.addClass('fonte-tamanho');

    const altura = 30 * (row + 1) + 35 + 'px';

    for (let aba = 1; aba < 31; aba++) {
      const relatorio = 'wdr-relatorio-comanda-1-' + aba;
      const elemento = document.getElementById(relatorio);
      const filhos = elemento?.getElementsByTagName('div');
      if (filhos) {
        for (let i = 0; i < filhos.length; i++) {
          if (filhos[i].id === 'wdr-pivot-view' || filhos[i].id === 'wdr-grid-layout' || filhos[i].id === 'wdr-grid-view') {
            filhos[i].style.height = altura;
          }
        }
      }
    }

    const relatorio = 'wdr-relatorio-comanda-1-' + '99';
    const elemento = document.getElementById(relatorio);
    const filhos = elemento?.getElementsByTagName('div');
    if (filhos) {
      for (let i = 0; i < filhos.length; i++) {
        if (filhos[i].id === 'wdr-pivot-view' || filhos[i].id === 'wdr-grid-layout' || filhos[i].id === 'wdr-grid-view') {
          filhos[i].style.height = altura;
        }
      }
    }

    if (data.rowIndex === 1 && data.columnIndex === 0) {
      cell.text = 'TOTAL';
    }

    if (data.rowIndex === 1) {
      cell.style.background = '#e5e7e9';
    }

    if (data.columnIndex === 0 && data.label.indexOf('#') >= 0) {
      cell.style.background = cell.text.substring(cell.text.indexOf('#'));
      cell.text = cell.text.substring(0, cell.text.indexOf('#'));
    }
  }

  customValoresRecebidos(cell: any, data: any): void {
    let col = 0;
    let row = 0;

    if (data.columnIndex > col) {
      col = data.columnIndex;
    }
    if (data.rowIndex > row) {
      row = data.rowIndex;
    }

    cell.addClass('fonte-tamanho');

    const altura = 30 * (row + 1) + 35 + 'px';

    for (let aba = 1; aba < 31; aba++) {
      const relatorio = 'wdr-relatorio-comanda-2-' + aba;
      const elemento = document.getElementById(relatorio);
      const filhos = elemento?.getElementsByTagName('div');
      if (filhos) {
        for (let i = 0; i < filhos.length; i++) {
          if (filhos[i].id === 'wdr-pivot-view' || filhos[i].id === 'wdr-grid-layout' || filhos[i].id === 'wdr-grid-view') {
            filhos[i].style.height = altura;
          }
        }
      }
    }

    const relatorio = 'wdr-relatorio-comanda-2-' + '99';
    const elemento = document.getElementById(relatorio);
    const filhos = elemento?.getElementsByTagName('div');
    if (filhos) {
      for (let i = 0; i < filhos.length; i++) {
        if (filhos[i].id === 'wdr-pivot-view' || filhos[i].id === 'wdr-grid-layout' || filhos[i].id === 'wdr-grid-view') {
          filhos[i].style.height = altura;
        }
      }
    }

    if (data.rowIndex === 1 && data.columnIndex === 0) {
      cell.text = 'TOTAL';
    }

    if (data.rowIndex === 1) {
      cell.style.background = '#e5e7e9';
    }
  }

  customValoresRecebidosResumo(cell: any, data: any): void {
    let col = 0;
    let row = 0;

    if (data.columnIndex > col) {
      col = data.columnIndex;
    }
    if (data.rowIndex > row) {
      row = data.rowIndex;
    }

    if (data.type === 'value') {
      if (data.value < 0) {
        cell.text = cell.text.replace('-', '');
        cell.style.background = '#FF0000';
      }
    }
    cell.addClass('fonte-tamanho');

    const altura = 30 * (row + 1) + 95 + 'px';

    for (let aba = 1; aba < 31; aba++) {
      const relatorio = 'wdr-relatorio-comanda-2-' + aba;
      const elemento = document.getElementById(relatorio);
      const filhos = elemento?.getElementsByTagName('div');
      if (filhos) {
        for (let i = 0; i < filhos.length; i++) {
          if (filhos[i].id === 'wdr-pivot-view' || filhos[i].id === 'wdr-grid-layout' || filhos[i].id === 'wdr-grid-view') {
            filhos[i].style.height = altura;
          }
        }
      }
    }

    const relatorio = 'wdr-relatorio-comanda-2-' + '99';
    const elemento = document.getElementById(relatorio);
    const filhos = elemento?.getElementsByTagName('div');
    if (filhos) {
      for (let i = 0; i < filhos.length; i++) {
        if (filhos[i].id === 'wdr-pivot-view' || filhos[i].id === 'wdr-grid-layout' || filhos[i].id === 'wdr-grid-view') {
          filhos[i].style.height = altura;
        }
      }
    }

    if (data.rowIndex === 1 && data.columnIndex === 0) {
      cell.text = 'TOTAL';
    }

    if (data.rowIndex === 1) {
      cell.style.background = '#e5e7e9';
    }
  }

  customConferencia(cell: any, data: any): void {
    let col = 0;
    let row = 0;

    const id = 'wdr-relatorio-comanda-3';

    if (data.columnIndex > col) {
      col = data.columnIndex;
    }
    if (data.rowIndex > row) {
      row = data.rowIndex;
    }

    cell.addClass('fonte-tamanho');

    const altura = 30 * (row + 1) + 35 + 'px';

    for (let aba = 1; aba < 31; aba++) {
      const relatorio = 'wdr-relatorio-comanda-3-' + aba;
      const elemento = document.getElementById(relatorio);
      const filhos = elemento?.getElementsByTagName('div');
      if (filhos) {
        for (let i = 0; i < filhos.length; i++) {
          if (filhos[i].id === 'wdr-pivot-view' || filhos[i].id === 'wdr-grid-layout' || filhos[i].id === 'wdr-grid-view') {
            filhos[i].style.height = altura;
          }
        }
      }
    }

    const relatorio = 'wdr-relatorio-comanda-3-' + '99';
    const elemento = document.getElementById(relatorio);
    const filhos = elemento?.getElementsByTagName('div');
    if (filhos) {
      for (let i = 0; i < filhos.length; i++) {
        if (filhos[i].id === 'wdr-pivot-view' || filhos[i].id === 'wdr-grid-layout' || filhos[i].id === 'wdr-grid-view') {
          filhos[i].style.height = altura;
        }
      }
    }

    if (data.rowIndex === 1 && data.columnIndex === 0) {
      cell.text = 'TOTAL';
    }

    if (data.rowIndex === 1) {
      cell.style.background = '#e5e7e9';
    }
  }

  load(dia: number): void {
    this.dia = dia;
    if (dia === 99) {
      dia = 1;
    }
    const mes: { id: string; descricao: string } = this.selectedMes[0];
    const ano: { id: string; descricao: string } = this.selectedAno[0];

    this.dataInicio = ano.id + '-' + mes.id + '-' + dia;
    this.dataFim = ano.id + '-' + mes.id + '-' + dia;

    const ultimaData = moment(this.dataInicio).endOf('month').format('YYYY-MM-DD');
    const ultimoDia = ultimaData.substring(ultimaData.lastIndexOf('-') + 1);
    this.ultimoDia = Number(ultimoDia);
    if (this.dia === 99) {
      this.dataFim = ultimaData;
    }

    this.dataControleComanda = [];
    this.dataControleValoresRecebidos = [];
    this.dataControleValoresRecebidosResumo = [];
    this.dataControleConferencia = [];
    this.dataConferenciaExtrato = [];
    this.dataConferenciaExtratoAcumulado = [];

    this.isLoading = true;

    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });

    this.loadFromBackendWithRouteInformationsControleValoresRecebidos().subscribe({
      next: (res: EntityArrayResponseTypeControle) => {
        this.onResponseSuccessControleValoresRecebidos(res);
      },
    });

    this.loadFromBackendWithRouteInformationsControleConferencia().subscribe({
      next: (res: EntityArrayResponseTypeControle4) => {
        this.onResponseSuccessControleConferencia(res);
      },
    });

    this.loadFromBackendWithRouteInformationsConferenciaExtrato().subscribe({
      next: (res: EntityArrayResponseTypeConferenciaExtrato) => {
        this.onResponseSuccessConferenciaExtrato(res);
      },
    });

    this.loadFromBackendWithRouteInformationsConferenciaExtratoAcumulado().subscribe({
      next: (res: EntityArrayResponseTypeConferenciaExtratoAcumulado) => {
        this.onResponseSuccessConferenciaExtratoAcumulado(res);
      },
    });

    this.loadFromBackendWithRouteInformationsTicketMedio().subscribe({
      next: (res: EntityArrayResponseTypeTicketMedio) => {
        this.onResponseSuccessTicketMedio(res);
      },
    });

    this.loadFromBackendWithRouteInformationsControleValoresRecebidosResumo().subscribe({
      next: (res: EntityArrayResponseTypeValoresRecebidosResumo) => {
        this.onResponseSuccessControleValoresRecebidosResumo(res);
      },
    });

    this.loadFromBackendWithRouteInformationsDespesas().subscribe({
      next: (res: EntityArrayResponseTypeDespesas) => {
        this.onResponseSuccessDespesas(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending)),
    );
  }

  protected loadFromBackendWithRouteInformationsControleValoresRecebidos(): Observable<EntityArrayResponseTypeControle> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendControleValoresRecebidos(this.predicate, this.ascending)),
    );
  }

  protected loadFromBackendWithRouteInformationsControleValoresRecebidosResumo(): Observable<EntityArrayResponseTypeValoresRecebidosResumo> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendControleValoresRecebidosResumo(this.predicate, this.ascending)),
    );
  }

  protected loadFromBackendWithRouteInformationsControleConferencia(): Observable<EntityArrayResponseTypeControle4> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendControleConferencia(this.predicate, this.ascending)),
    );
  }

  protected loadFromBackendWithRouteInformationsConferenciaExtrato(): Observable<EntityArrayResponseTypeConferenciaExtrato> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendConferenciaExtrato(this.predicate, this.ascending)),
    );
  }

  protected loadFromBackendWithRouteInformationsConferenciaExtratoAcumulado(): Observable<EntityArrayResponseTypeConferenciaExtratoAcumulado> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendConferenciaExtratoAcumulado(this.predicate, this.ascending)),
    );
  }

  protected loadFromBackendWithRouteInformationsTicketMedio(): Observable<EntityArrayResponseTypeTicketMedio> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendTicketMedio(this.predicate, this.ascending)),
    );
  }

  protected loadFromBackendWithRouteInformationsDespesas(): Observable<EntityArrayResponseTypeDespesas> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendDespesas(this.predicate, this.ascending)),
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.relatorioControleComanda = this.refineDataControleComanda(dataFromBody);
    this.dataControleComanda = this.configControleComanda.concat(this.relatorioControleComanda);
  }

  protected onResponseSuccessControleConferencia(response: EntityArrayResponseTypeControle4): void {
    const dataFromBody = this.fillComponentAttributesControle4FromResponseBody(response.body);
    this.ControleConferencia = this.refineDataControleConferencia(dataFromBody);
    this.dataControleConferencia = this.configControleConferencia.concat(this.ControleConferencia);
  }

  protected onResponseSuccessConferenciaExtrato(response: EntityArrayResponseTypeConferenciaExtrato): void {
    const dataFromBody = this.fillComponentAttributesConferenciaExtratoFromResponseBody(response.body);
    this.ConferenciaExtrato = this.refineDataConferenciaExtrato(dataFromBody);
    this.dataConferenciaExtrato = this.configConferenciaExtrato.concat(this.ConferenciaExtrato);
  }

  protected onResponseSuccessConferenciaExtratoAcumulado(response: EntityArrayResponseTypeConferenciaExtratoAcumulado): void {
    const dataFromBody = this.fillComponentAttributesConferenciaExtratoAcumuladoFromResponseBody(response.body);
    this.ConferenciaExtratoAcumulado = this.refineDataConferenciaExtratoAcumulado(dataFromBody);
    this.dataConferenciaExtratoAcumulado = this.configConferenciaExtratoAcumulado.concat(this.ConferenciaExtratoAcumulado);
  }

  protected onResponseSuccessControleValoresRecebidos(response: EntityArrayResponseTypeControle): void {
    const dataFromBody = this.fillComponentAttributesControleFromResponseBody(response.body);
    this.ControleValoresRecebidos = this.refineDataControleValoresRecebidos(dataFromBody);
    this.dataControleValoresRecebidos = this.configControleValoresRecebidos.concat(this.ControleValoresRecebidos);
  }

  protected onResponseSuccessControleValoresRecebidosResumo(response: EntityArrayResponseTypeValoresRecebidosResumo): void {
    const dataFromBody = this.fillComponentAttributesControleValoresRecebidosResumoFromResponseBody(response.body);
    this.ControleValoresRecebidosResumo = this.refineDataControleValoresRecebidosResumo(dataFromBody);

    this.dataControleValoresRecebidosResumo = this.configControleValoresRecebidosResumo.concat(this.ControleValoresRecebidosResumo);
  }

  protected onResponseSuccessTicketMedio(response: EntityArrayResponseTypeTicketMedio): void {
    const dataFromBody = this.fillComponentAttributesTicketMedioFromResponseBody(response.body);
    this.ControleTicketMedio = this.refineDataTicketMedio(dataFromBody);

    this.dataTicketMedio = this.configTicketMedio.concat(this.ControleTicketMedio);
  }

  protected onResponseSuccessDespesas(response: EntityArrayResponseTypeTicketMedio): void {
    const dataFromBody = this.fillComponentAttributesDespesasFromResponseBody(response.body);
    this.Despesas = this.refineDataDespesas(dataFromBody);

    this.dataDespesas = this.configDespesas.concat(this.Despesas);

    setTimeout(() => {
      this.montaRelatorio(String(this.dia));
      this.isLoading = false;
    }, 1000);
  }

  protected refineDataControleComanda(data: IRelatorioControleComanda[]): IRelatorioControleComanda[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected refineDataControleValoresRecebidos(data: IRelatorioValoresRecebidos[]): IRelatorioValoresRecebidos[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected refineDataControleValoresRecebidosResumo(data: IRelatorioValoresRecebidosResumo[]): IRelatorioValoresRecebidosResumo[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected refineDataTicketMedio(data: IRelatorioValoresRecebidosResumo[]): IRelatorioValoresRecebidosResumo[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected refineDataDespesas(data: IRelatorioDespesa[]): IRelatorioDespesa[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected refineDataControleConferencia(data: IRelatorioConferencia[]): IRelatorioConferencia[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected refineDataConferenciaExtrato(data: IRelatorioConferenciaExtrato[]): IRelatorioConferenciaExtrato[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected refineDataConferenciaExtratoAcumulado(data: IRelatorioConferenciaExtratoAcumulado[]): IRelatorioConferenciaExtratoAcumulado[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IRelatorioControleComanda[] | null): IRelatorioControleComanda[] {
    return data ?? [];
  }

  protected fillComponentAttributesControleFromResponseBody(data: IRelatorioValoresRecebidos[] | null): IRelatorioValoresRecebidos[] {
    return data ?? [];
  }

  protected fillComponentAttributesDespesasFromResponseBody(data: IRelatorioDespesa[] | null): IRelatorioDespesa[] {
    return data ?? [];
  }

  protected fillComponentAttributesControleValoresRecebidosResumoFromResponseBody(
    data: IRelatorioValoresRecebidosResumo[] | null,
  ): IRelatorioValoresRecebidosResumo[] {
    return data ?? [];
  }

  protected fillComponentAttributesTicketMedioFromResponseBody(
    data: IRelatorioValoresRecebidosResumo[] | null,
  ): IRelatorioValoresRecebidosResumo[] {
    return data ?? [];
  }

  protected fillComponentAttributesConferenciaExtratoFromResponseBody(
    data: IRelatorioConferenciaExtrato[] | null,
  ): IRelatorioConferenciaExtrato[] {
    return data ?? [];
  }

  protected fillComponentAttributesConferenciaExtratoAcumuladoFromResponseBody(
    data: IRelatorioConferenciaExtratoAcumulado[] | null,
  ): IRelatorioConferenciaExtratoAcumulado[] {
    return data ?? [];
  }

  protected fillComponentAttributesControle4FromResponseBody(data: IRelatorioConferencia[] | null): IRelatorioConferencia[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService.query(this.dataInicio, this.dataFim, queryObject).pipe(tap(() => (this.isLoading = true)));
  }

  protected queryBackendControleValoresRecebidosResumo(
    predicate?: string,
    ascending?: boolean,
  ): Observable<EntityArrayResponseTypeValoresRecebidosResumo> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService
      .queryControleValoresRecebidosResumo(this.dataInicio, this.dataFim, queryObject)
      .pipe(tap(() => (this.isLoading = true)));
  }

  protected queryBackendTicketMedio(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseTypeTicketMedio> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService
      .queryTicketMedio(this.dataInicio, this.dataFim, queryObject)
      .pipe(tap(() => (this.isLoading = true)));
  }

  protected queryBackendDespesas(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseTypeDespesas> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService.queryDespesas(this.dataInicio, this.dataFim, queryObject).pipe(tap(() => (this.isLoading = true)));
  }

  protected queryBackendControleValoresRecebidos(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseTypeControle> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService
      .queryControleValoresRecebidos(this.dataInicio, this.dataFim, queryObject)
      .pipe(tap(() => (this.isLoading = true)));
  }

  protected queryBackendControleConferencia(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseTypeControle4> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService
      .queryControleConferencia(this.dataInicio, this.dataFim, queryObject)
      .pipe(tap(() => (this.isLoading = false)));
  }

  protected queryBackendConferenciaExtrato(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseTypeConferenciaExtrato> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService
      .queryConferenciaExtrato(this.dataInicio, this.dataFim, queryObject)
      .pipe(tap(() => (this.isLoading = false)));
  }

  protected queryBackendConferenciaExtratoAcumulado(
    predicate?: string,
    ascending?: boolean,
  ): Observable<EntityArrayResponseTypeConferenciaExtratoAcumulado> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService
      .queryConferenciaExtratoAcumulado(this.dataInicio, this.dataFim, queryObject)
      .pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
