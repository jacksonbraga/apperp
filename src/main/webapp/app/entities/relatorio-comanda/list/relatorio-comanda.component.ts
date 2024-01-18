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
import { IRelatorioComanda } from '../relatorio-comanda.model';
import { EntityArrayResponseType, RelatorioComandaService } from '../service/relatorio-comanda.service';
import { WebdatarocksComponent, WebdatarocksPivotModule } from '@webdatarocks/ngx-webdatarocks';
import WebDataRocks from '@webdatarocks/webdatarocks';
import { SplitterModule } from 'primeng/splitter';
import { TabViewModule } from 'primeng/tabview';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import moment from 'moment';
import { ICor } from 'app/entities/cor/cor.model';
import { IRelatorioControle } from '../relatorio-controle.model';

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
  @ViewChild('pivot1') child!: WebdatarocksComponent;

  formGroup!: FormGroup;
  activeIndex: number = 0;
  active = 1;
  dia = 1;

  dropdownSettings = {};
  dropdownSettingsAno = {};

  selectedAno: any[] = [];
  selectedMes: any[] = [];

  relatorios?: IRelatorioComanda[];
  relatoriosControle?: IRelatorioControle[];

  isLoading = false;

  pivot: WebDataRocks.Pivot | undefined;
  pivot2: WebDataRocks.Pivot | undefined;
  pivot3: WebDataRocks.Pivot | undefined;

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

  listaAnos: any[] = [
    { id: '2024', descricao: '2024' },
    { id: '2023', descricao: '2023' },
    { id: '2022', descricao: '2022' },
  ];

  dataControle: any = '';
  dataControle2: any = '';
  dataControle3: any = '';

  configGruposRelatorio: any = [
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

  configGruposRelatorioControle3: any = [
    {
      id: {
        type: 'number',
      },
      turno: {
        type: 'string',
      },
      grupo: {
        type: 'string',
      },
      tipo: {
        type: 'string',
      },
      qtde: {
        type: 'number',
      },
      valor: {
        type: 'number',
      },
      valorCaixa: {
        type: 'number',
      },
      taxaCobrada: {
        type: 'number',
      },
      valorCobrado: {
        type: 'number',
      },
    },
  ];

  // configGruposRelatorioControle2: any = [
  //   {
  //     turno: {
  //       type: 'string',
  //     },
  //     inicio: {
  //       type: 'number',
  //     },
  //     fim: {
  //       type: 'number',
  //     },
  //     qtde: {
  //       type: 'number',
  //     },
  //     valor: {
  //       type: 'number',
  //     },
  //   }
  // ];

  constructor(
    protected relatorioComandaService: RelatorioComandaService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    private formBuilder: FormBuilder,
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
    console.log('ultimo diaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' + moment(this.dataInicio).endOf('month').format('YYYY-MM-DD'));

    const ultimaData = moment(this.dataInicio).endOf('month').format('YYYY-MM-DD');
    const ultimoDia = ultimaData.substring(ultimaData.lastIndexOf('-') + 1);
    this.ultimoDia = Number(ultimoDia);
    console.log(this.ultimoDia);

    this.load(1);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  navChanged1(event: any): void {
    this.load(event);
  }

  montaRelatorio(tab: string): void {
    const id1 = '#wdr-relatorio-comanda-1-' + tab;
    // const id2 = "#wdr-relatorio-comanda-2-" + tab;
    const id3 = '#wdr-relatorio-comanda-3-' + tab;

    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    console.log(id1);
    //console.log(id2);
    console.log(id3);
    console.log(this.dataControle);

    this.pivot = new WebDataRocks({
      container: id1,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.onCustomizeCell,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataControle,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 200,
            },
            {
              idx: 1,
              width: 120,
            },
            {
              idx: 2,
              width: 120,
            },
            {
              idx: 3,
              width: 120,
            },
            {
              idx: 4,
              width: 120,
            },
            {
              idx: 5,
              width: 120,
            },
            {
              idx: 5,
              width: 120,
            },
            {
              idx: 7,
              width: 120,
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
            },
            {
              uniqueName: 'fim',
              aggregation: 'sum',
              caption: 'Término',
            },
            {
              uniqueName: 'abertas',
              aggregation: 'sum',
              caption: 'Abertas',
            },
            {
              uniqueName: 'fechadas',
              aggregation: 'sum',
              caption: 'Fechadas',
            },
            {
              uniqueName: 'lancadas',
              aggregation: 'sum',
              caption: 'Lançadas',
            },
            {
              uniqueName: 'desviadas',
              aggregation: 'sum',
              caption: 'Desviadas',
            },
            {
              uniqueName: 'naoUsadas',
              aggregation: 'sum',
              caption: 'Não usadas',
            },
            {
              uniqueName: 'emAnalise',
              aggregation: 'sum',
              caption: 'Em análise',
            },
            {
              uniqueName: 'Formula #1',
              formula: 'sum("abertas") + sum("lancadas") + sum("desviadas") + sum("naoUsadas") + sum("emAnalise") + sum("fechadas")',
              caption: 'Total',
            },
            {
              uniqueName: 'valor',
              aggregation: 'sum',
              caption: 'Valor total',
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
        localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivot.expandAllData();

    // this.pivot2 = new WebDataRocks({
    //   container: id2,
    //   toolbar: false,
    //   width: "100%",
    //   height: "100%",
    //   customizeCell: this.onCustomizeCell2,
    //   report: {
    //     dataSource: {
    //       dataSourceType: 'json',
    //       data: this.dataControle2,
    //     },
    //     tableSizes: {
    //       columns: [
    //         {
    //           idx: 0,
    //           width: 200
    //         },
    //         {
    //           idx: 1,
    //           width: 90
    //         },
    //         {
    //           idx: 2,
    //           width: 90
    //         },
    //         {
    //           idx: 3,
    //           width: 90
    //         },
    //       ]
    //     },
    //     "slice": {
    //       "rows": [
    //         {
    //           "uniqueName": "turno",
    //           "sort": "asc"
    //         },
    //         {
    //           "uniqueName": "inicio"
    //         },
    //         {
    //           "uniqueName": "fim"
    //         },

    //       ],
    //       "columns": [
    //         {
    //           "uniqueName": "Measures"
    //         }
    //       ],
    //       "measures": [
    //         {
    //           "uniqueName": "qtde",
    //           "format": "numero"
    //         },
    //         {
    //           "uniqueName": "valor",
    //           "format": "decimal"
    //         }

    //       ],
    //       "expands": {
    //         "expandAll": true
    //       },
    //       "drills": {
    //         "drillAll": true
    //       }
    //     },
    //     formats: [
    //       {
    //         name: 'numero',
    //         thousandsSeparator: '.',
    //         decimalSeparator: ',',
    //         decimalPlaces: 0,
    //         currencySymbol: '',
    //         currencySymbolAlign: 'left',
    //         nullValue: '',
    //         textAlign: 'right',
    //         isPercent: false,
    //       },
    //       {
    //         name: 'decimal',
    //         thousandsSeparator: '.',
    //         decimalSeparator: ',',
    //         decimalPlaces: 2,
    //         currencySymbol: '',
    //         currencySymbolAlign: 'left',
    //         nullValue: '',
    //         textAlign: 'right',
    //         isPercent: false,
    //       },
    //       {
    //         name: 'texto',
    //         textAlign: 'left',
    //       },

    //     ],
    //     options: {
    //       grid: {
    //         type: 'flat',
    //         title: '',
    //         showFilter: false,
    //         showHeaders: false,
    //         showTotals: true,
    //         showGrandTotals: 'on',
    //         showHierarchies: false,
    //         showHierarchyCaptions: true,
    //         showReportFiltersArea: false,
    //       },
    //       configuratorActive: false,
    //       configuratorButton: false,
    //       showAggregations: false,
    //       showCalculatedValuesButton: false,
    //       drillThrough: false,
    //       sorting: 'on',
    //       datePattern: 'dd/MM/yyyy',
    //       dateTimePattern: 'dd/MM/yyyy HH:mm:ss',
    //       showDefaultSlice: false,
    //       defaultHierarchySortName: 'asc',
    //     },
    //     localization: 'http://localhost:4200/content/pr.json',
    //   },
    // });

    // this.pivot2.expandAllData();

    this.pivot3 = new WebDataRocks({
      container: id3,
      toolbar: false,
      width: '100%',
      height: '100%',
      customizeCell: this.onCustomizeCell3,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataControle3,
        },
        tableSizes: {
          columns: [
            {
              idx: 0,
              width: 200,
            },
            {
              idx: 1,
              width: 300,
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
          ],
        },
        slice: {
          rows: [
            {
              uniqueName: 'turno',
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
              uniqueName: 'qtde',
              aggregation: 'sum',
            },
            {
              uniqueName: 'valor',
              aggregation: 'sum',
            },
            {
              uniqueName: 'valorCaixa',
              aggregation: 'sum',
            },
            {
              uniqueName: 'diferenca',
              formula: 'sum("valor") - sum("valorCaixa") ',
              caption: 'Soma diferenca',
            },
            {
              uniqueName: 'taxaCobrada',
              aggregation: 'sum',
            },
            {
              uniqueName: 'valorCobrado',
              aggregation: 'sum',
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
        localization: 'http://localhost:4200/content/pr.json',
      },
    });

    this.pivot3.expandAllData();
  }

  onItemSelectAno(item: any): void {}

  onItemDeSelectAno(item: any): void {}

  onItemSelectMes(item: any): void {}

  onItemDeSelectMes(item: any): void {}

  onCustomizeCell(cell: any, data: any): void {
    let col = 0;
    let row = 0;

    if (data.columnIndex > col) {
      col = data.columnIndex;
    }
    if (data.rowIndex > row) {
      row = data.rowIndex;
    }

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

    const listaCores: ICor[] = [
      {
        id: 1,
        descricao: 'CAFÉ AVULSO',
        valor: '#aed7ff',
      },
      {
        id: 2,
        descricao: 'ALMOÇO',
        valor: '#ffffff',
      },
      {
        id: 3,
        descricao: 'LANCHE',
        valor: '#ffffff',
      },
      {
        id: 4,
        descricao: 'LANCHE AVULSO',
        valor: '#bfdfff',
      },
      {
        id: 5,
        descricao: 'CAFÉ',
        valor: '#ffffff',
      },
      {
        id: 6,
        descricao: 'ALMOÇO AVULSO',
        valor: '#b7dbff',
      },
      {
        id: 7,
        descricao: 'ENCOMENDA',
        valor: '#ffffc4',
      },
      {
        id: 8,
        descricao: 'EVENTO',
        valor: '#c4ffc4',
      },
      {
        id: 9,
        descricao: 'MASSA',
        valor: '#ffcaca',
      },
    ];

    const cor: ICor[] = listaCores.filter(turno => turno.descricao === data.label);
    if (cor.length > 0) {
      cell.style.background = cor[0].valor;
    }
  }

  // onCustomizeCell2(cell: any, data: any): void {

  //   let col = 0;
  //   let row = 0;

  //   const id = "wdr-relatorio-comanda-2";

  //   if (data.columnIndex > col) { col = data.columnIndex; }
  //   if (data.rowIndex > row) { row = data.rowIndex; }

  //   const altura = 30 * (row + 1) + 35 + 'px';

  //   for(let aba=1; aba < 31; aba++) {
  //     const relatorio = "wdr-relatorio-comanda-2-" + aba;
  //     const elemento = document.getElementById(relatorio);
  //     const filhos = elemento?.getElementsByTagName('div');
  //     if (filhos) {
  //       for (let i = 0; i < filhos.length; i++) {
  //         if (filhos[i].id === 'wdr-pivot-view' || filhos[i].id === 'wdr-grid-layout' || filhos[i].id === 'wdr-grid-view') {
  //            filhos[i].style.height = altura;
  //         }
  //       }
  //     }
  //   }
  //   const listaCores: ICor[] = [{
  //     id : 1,
  //     descricao : "CAFÉ AVULSO",
  //     valor : "#aed7ff"
  //   },
  //   {
  //     id : 2,
  //     descricao : "ALMOÇO",
  //     valor : "#ffffff"
  //   },
  //   {
  //     id : 3,
  //     descricao : "LANCHE",
  //     valor : "#ffffff"
  //   },
  //   {
  //     id : 4,
  //     descricao : "LANCHE AVULSO",
  //     valor : "#bfdfff"
  //   },
  //   {
  //     id : 5,
  //     descricao : "CAFÉ",
  //     valor : "#ffffff"
  //   },
  //   {
  //     id : 6,
  //     descricao : "ALMOÇO AVULSO",
  //     valor : "#b7dbff"
  //   },
  //   {
  //     id : 7,
  //     descricao : "ENCOMENDA",
  //     valor : "#ffffc4"
  //   },
  //   {
  //     id : 8,
  //     descricao : "EVENTO",
  //     valor : "#c4ffc4"
  //   },
  //   {
  //     id : 9,
  //     descricao : "MASSA",
  //     valor : "#ffcaca"
  //   }];

  //   const cor:ICor[] = listaCores.filter(turno => turno.descricao === data.label);
  //   if(cor.length > 0) {
  //      cell.style.background = cor[0].valor;
  //   }

  // }

  onCustomizeCell3(cell: any, data: any): void {
    let col = 0;
    let row = 0;

    const id = 'wdr-relatorio-comanda-3';

    if (data.columnIndex > col) {
      col = data.columnIndex;
    }
    if (data.rowIndex > row) {
      row = data.rowIndex;
    }

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

    const listaCores: ICor[] = [
      {
        id: 1,
        descricao: 'CAFÉ AVULSO',
        valor: '#aed7ff',
      },
      {
        id: 2,
        descricao: 'ALMOÇO',
        valor: '#ffffff',
      },
      {
        id: 3,
        descricao: 'LANCHE',
        valor: '#ffffff',
      },
      {
        id: 4,
        descricao: 'LANCHE AVULSO',
        valor: '#bfdfff',
      },
      {
        id: 5,
        descricao: 'CAFÉ',
        valor: '#ffffff',
      },
      {
        id: 6,
        descricao: 'ALMOÇO AVULSO',
        valor: '#b7dbff',
      },
      {
        id: 7,
        descricao: 'ENCOMENDA',
        valor: '#ffffc4',
      },
      {
        id: 8,
        descricao: 'EVENTO',
        valor: '#c4ffc4',
      },
      {
        id: 9,
        descricao: 'MASSA',
        valor: '#ffcaca',
      },
    ];

    const cor: ICor[] = listaCores.filter(turno => turno.descricao === data.label);
    if (cor.length > 0) {
      cell.style.background = cor[0].valor;
    }
  }

  load(dia: number): void {
    console.log('LOADDDDDDDDDDDDDDDDDDDDDDDDDDDDD');

    this.dia = dia;

    const mes: { id: string; descricao: string } = this.selectedMes[0];
    const ano: { id: string; descricao: string } = this.selectedAno[0];

    this.dataInicio = ano.id + '-' + mes.id + '-' + this.dia;
    this.dataFim = ano.id + '-' + mes.id + '-' + this.dia;
    console.log('LOADDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
    const ultimaData = moment(this.dataInicio).endOf('month').format('YYYY-MM-DD');
    const ultimoDia = ultimaData.substring(ultimaData.lastIndexOf('-') + 1);
    this.ultimoDia = Number(ultimoDia);

    console.log('LOADDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
    this.dataControle = [];
    this.dataControle2 = [];
    this.dataControle3 = [];

    this.isLoading = true;
    console.log('LOADDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
    console.log('>>>>>>>>>>>>> ' + this.dataInicio);
    console.log(this.dataFim);
    console.log('LOADDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });

    this.loadFromBackendWithRouteInformationsControle().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccessControle(res);
      },
    });

    this.loadFromBackendWithRouteInformationsCaixa().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccessCaixa(res);
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

  protected loadFromBackendWithRouteInformationsControle(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendControle(this.predicate, this.ascending)),
    );
  }

  protected loadFromBackendWithRouteInformationsCaixa(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendCaixa(this.predicate, this.ascending)),
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.relatorios = this.refineData(dataFromBody);
    this.dataControle = this.configGruposRelatorio.concat(this.relatorios);
  }

  protected onResponseSuccessCaixa(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.relatorios = this.refineData(dataFromBody);
    this.dataControle3 = this.configGruposRelatorioControle3.concat(this.relatorios);
    this.montaRelatorio(String(this.dia));
    this.isLoading = false;
  }

  protected onResponseSuccessControle(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.relatoriosControle = this.refineData(dataFromBody);
    // this.dataControle2 = this.configGruposRelatorioControle2.concat(this.relatoriosControle);
  }

  protected refineData(data: IRelatorioComanda[]): IRelatorioComanda[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IRelatorioComanda[] | null): IRelatorioComanda[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService.query(this.dataInicio, this.dataFim, queryObject).pipe(tap(() => (this.isLoading = true)));
  }

  protected queryBackendControle(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService.queryControle(this.dataInicio, this.dataFim, queryObject).pipe(tap(() => (this.isLoading = true)));
  }

  protected queryBackendCaixa(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    return this.relatorioComandaService.queryCaixa(this.dataInicio, this.dataFim, queryObject).pipe(tap(() => (this.isLoading = false)));
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
