import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import SharedModule from 'app/shared/shared.module';
import { SortDirective, SortByDirective } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ASC, DESC, SORT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { SortService } from 'app/shared/sort/sort.service';
import { IRelatorio } from '../relatorio.model';
import { EntityArrayResponseType, RelatorioService } from '../service/relatorio.service';
import { WebdatarocksComponent, WebdatarocksPivotModule } from '@webdatarocks/ngx-webdatarocks';
import FileSaver, { saveAs } from 'file-saver';
import WebDataRocks from '@webdatarocks/webdatarocks';
import $ from 'jquery';

@Component({
  standalone: true,
  selector: 'jhi-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    SortDirective,
    SortByDirective,
    DurationPipe,
    ReactiveFormsModule,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    WebdatarocksPivotModule,
  ],
})
export class RelatorioComponent implements OnInit {
  @ViewChild('pivot1') child!: WebdatarocksComponent;

  formGroup!: FormGroup;

  relatorios?: IRelatorio[];
  isLoading = false;

  predicate = 'id';
  ascending = true;
  dt: any;

  dataRelatorio: any = '';

  configGruposRelatorio: any = [
    {
      grupoContabil: {
        type: 'level',
        hierarchy: 'MOVIMENTO',
      },
      grupo: {
        type: 'level',
        hierarchy: 'MOVIMENTO',
        level: 'grupo',
        parent: 'grupoContabil',
      },
      tipo: {
        type: 'level',
        hierarchy: 'MOVIMENTO',
        level: 'tipo',
        parent: 'grupo',
      },
      valor: {
        type: 'number',
      },
      dia: {
        type: 'number',
      },
      mes: {
        type: 'number',
      },
      ano: {
        type: 'number',
      },
    },
  ];

  constructor(
    protected relatorioService: RelatorioService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    private formBuilder: FormBuilder,
    protected modalService: NgbModal,
  ) {
    this.formGroup = this.formBuilder.group({
      dataInicio: new FormControl(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substring(0, 10)),
      dataFim: new FormControl(new Date().toISOString().substring(0, 10)),
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
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

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.relatorios = this.refineData(dataFromBody);
    this.dataRelatorio = this.configGruposRelatorio.concat(this.relatorios);

    const pivot = new WebDataRocks({
      container: '#wdr-component',
      toolbar: true,
      width: '100%',
      height: 800,
      report: {
        dataSource: {
          dataSourceType: 'json',
          data: this.dataRelatorio,
        },
        slice: {
          rows: [
            {
              uniqueName: 'MOVIMENTO',
            },
          ],
          columns: [
            {
              uniqueName: 'ano',
            },
            {
              uniqueName: 'mes',
            },
            {
              uniqueName: 'dia',
            },
            {
              uniqueName: 'Measures',
            },
          ],
          measures: [
            {
              uniqueName: 'valor',
              aggregation: 'sum',
            },
          ],
          drills: {
            drillAll: true,
          },
        },
        conditions: [
          {
            formula: '#value < 0',
            format: {
              backgroundColor: '#FFFFFF',
              color: '#F44336',
              fontFamily: 'Arial',
              fontSize: '12px',
            },
          },
        ],
        formats: [
          {
            name: '',
            thousandsSeparator: '.',
            decimalSeparator: ',',
            decimalPlaces: 2,
            currencySymbol: '',
            currencySymbolAlign: 'left',
            nullValue: '',
            textAlign: 'right',
            isPercent: false,
          },
        ],
        options: {
          grid: {
            type: 'compact',
            title: '',
            showFilter: false,
            showHeaders: true,
            showTotals: true,
            showGrandTotals: 'on',
            showHierarchies: true,
            showHierarchyCaptions: true,
            showReportFiltersArea: false,
          },
          configuratorActive: false,
          configuratorButton: true,
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

    pivot.expandAllData();

    $('[id=wdr-tab-connect]').hide();
  }

  protected refineData(data: IRelatorio[]): IRelatorio[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IRelatorio[] | null): IRelatorio[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.getSortQueryParam(predicate, ascending),
    };
    const dataInicio = this.formGroup.get('dataInicio')?.value;
    const dataFim = this.formGroup.get('dataFim')?.value;
    return this.relatorioService.query(dataInicio, dataFim, queryObject).pipe(tap(() => (this.isLoading = false)));
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

  protected onPivotReady(pivot: WebDataRocks.Pivot): void {}

  protected onCustomizeCell(cell: WebDataRocks.CellBuilder, data: WebDataRocks.CellData): void {
    const object: any = { 'background-color': 'red' };
    if (data.isGrandTotalRow) {
      cell.addClass('teste');
    }
  }
}
