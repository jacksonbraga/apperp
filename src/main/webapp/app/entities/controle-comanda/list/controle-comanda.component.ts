import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import dayjs from 'dayjs/esm';
import SharedModule from 'app/shared/shared.module';
import { SortDirective, SortByDirective } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ItemCountComponent } from 'app/shared/pagination';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { FilterComponent, FilterOptions, IFilterOptions, IFilterOption } from 'app/shared/filter';
import { IControleComanda } from '../controle-comanda.model';
import { EntityArrayResponseType, ControleComandaService } from '../service/controle-comanda.service';
import { ControleComandaDeleteDialogComponent } from '../delete/controle-comanda-delete-dialog.component';
import { ControleComandaPreviaDialogComponent } from '../delete/controle-comanda-previa-dialog.component';
import { LocalStorageDirective, LocalStorageService } from 'ngx-localstorage';

interface StoredObject {
  id: string;
  valor: string;
}

@Component({
  standalone: true,
  selector: 'jhi-controle-comanda',
  templateUrl: './controle-comanda.component.html',
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    SortDirective,
    LocalStorageDirective,
    SortByDirective,
    DurationPipe,

    ReactiveFormsModule,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    FilterComponent,
    ItemCountComponent,
  ],
})
export class ControleComandaComponent implements OnInit {
  controleComandas?: IControleComanda[];
  isLoading = false;

  formGroup!: FormGroup;

  storedObject: StoredObject | undefined | null;

  // cache: any = new Cache();

  predicate = 'cor.descricao';
  ascending = true;
  filters: IFilterOptions = new FilterOptions();

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;

  maxDate: Date = new Date();
  ptbr: any;
  // dt: any;

  constructor(
    private lss: LocalStorageService,
    protected controleComandaService: ControleComandaService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    protected modalService: NgbModal,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
  ) {}

  public readonly defaultFalsyTransformer: () => any = () => false;

  trackId = (_index: number, item: IControleComanda): number => this.controleComandaService.getControleComandaIdentifier(item);

  ngOnInit(): void {
    let data = this.ngbCalendar.getToday();
    this.storedObject = this.lss.get<StoredObject>('dataFiltro');

    if (this.storedObject?.valor != null && this.storedObject.valor !== 'Invalid Date') {
      const ano = this.storedObject.valor.substring(0, 4);
      const mes = this.storedObject.valor.substring(5, 7);
      const dia = this.storedObject.valor.substring(8, 10);
      data = new NgbDate(Number(ano), Number(mes), Number(dia));
    }

    this.formGroup = this.formBuilder.group({
      dataFiltro: new FormControl(this.dateAdapter.toModel(data)),
    });

    this.load();
    this.filters.filterChanges.subscribe(filterOptions => this.handleNavigation(1, this.predicate, this.ascending, filterOptions));
  }

  delete(controleComanda: IControleComanda): void {
    const modalRef = this.modalService.open(ControleComandaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.controleComanda = controleComanda;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations()),
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  loadComFiltro(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending, this.filters.filterOptions);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending, this.filters.filterOptions);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending, this.filters.filterOptions)),
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = true;

    this.filters.initializeFromParams(params);
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.controleComandas = dataFromBody;
    this.predicate = 'cor.descricao';
    this.navigateToWithComponentValues();
  }

  protected fillComponentAttributesFromResponseBody(data: IControleComanda[] | null): IControleComanda[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  protected queryBackend(
    page?: number,
    predicate?: string,
    ascending?: boolean,
    filterOptions?: IFilterOption[],
  ): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const pageToLoad: number = page ?? 1;
    const queryObject: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    filterOptions?.forEach(filterOption => {
      queryObject[filterOption.name] = filterOption.values;
    });

    this.lss.set<StoredObject>('dataFiltro', {
      id: 'dataFiltro',
      valor: dayjs(this.formGroup.get('dataFiltro')!.value).format('YYYY-MM-DD'),
    });

    queryObject['data.equals'] = dayjs(this.formGroup.get('dataFiltro')!.value).format('YYYY-MM-DD');

    return this.controleComandaService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected getBackgroundColor(cor: string | undefined | null): string {
    if (!cor) {
      return '';
    } else {
      return cor;
    }
  }

  protected handleNavigation(page = this.page, predicate?: string, ascending?: boolean, filterOptions?: IFilterOption[]): void {
    const queryParamsObj: any = {
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    filterOptions?.forEach(filterOption => {
      queryParamsObj[filterOption.nameAsQueryParam()] = filterOption.values;
    });

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

  protected previaFechamento(controle: IControleComanda): void {
    const modalRef = this.modalService.open(ControleComandaPreviaDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.controleComanda = controle;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      // .pipe(
      //   filter(reason => reason === ITEM_DELETED_EVENT),
      //   switchMap(() => this.loadFromBackendWithRouteInformations()),
      // )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.loadComFiltro();
        },
      });
  }
}
