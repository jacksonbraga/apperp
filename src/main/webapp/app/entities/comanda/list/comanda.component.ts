import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortDirective, SortByDirective } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ItemCountComponent } from 'app/shared/pagination';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { FilterComponent, FilterOptions, IFilterOptions, IFilterOption } from 'app/shared/filter';
import { IComanda } from '../comanda.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { EntityArrayResponseType, ComandaService } from '../service/comanda.service';
import { ComandaDeleteDialogComponent } from '../delete/comanda-delete-dialog.component';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ControleComandaService } from 'app/entities/controle-comanda/service/controle-comanda.service';
import { IControleComanda } from 'app/entities/controle-comanda/controle-comanda.model';

@Component({
  standalone: true,
  selector: 'jhi-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    SortDirective,
    NgMultiSelectDropDownModule,
    SortByDirective,
    MultiSelectModule,
    DurationPipe,
    ReactiveFormsModule,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    FilterComponent,
    ItemCountComponent,
  ],
})
export class ComandaComponent implements OnInit {
  comandas?: IComanda[];
  isLoading = false;

  predicate = 'id';
  ascending = true;
  filters: IFilterOptions = new FilterOptions();

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;

  formGroup!: FormGroup;

  maxDate: Date = new Date();
  ptbr: any;
  dt: any;

  listaComandas: any[] = [];
  selectedComandas: any[] = [];

  dropdownSettings = {};

  listaControles: any[] = [];
  selectedControles: any[] = [];

  dataFiltro = new Date().toISOString().substring(0, 10);

  constructor(
    protected comandaService: ComandaService,
    protected controleComandaService: ControleComandaService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    protected modalService: NgbModal,
  ) {
    this.formGroup = this.formBuilder.group({
      dataFiltro: new FormControl(new Date().toISOString().substring(0, 10)),
      selectedControles: new FormControl(),
      selectedComandas: new FormControl(),
    });
  }

  trackId = (_index: number, item: IComanda): number => this.comandaService.getComandaIdentifier(item);

  ngOnInit(): void {
    this.dataFiltro = new Date().toISOString().substring(0, 10);
    this.load();

    this.filters.filterChanges.subscribe(filterOptions => this.handleNavigation(1, this.predicate, this.ascending, filterOptions));

    this.filters.filterOptions.forEach(item => {
      console.log('PASSO 11111111111111');
      if (item.name === 'controleComandaId.in') {
        item.values.forEach(valor => {
          console.log('PASSO 2222222222222222');
          console.log(this.listaControles.length);
          const controlex: IControleComanda = this.listaControles.find(itemx => itemx.id === Number(valor));
          if (controlex) {
            const controle: IControleComanda = { id: Number(valor), descricao: controlex.descricao };
            this.selectedControles.push(controle);
          }
        });
      }
    });

    console.log('PASSSOOOOOOOOOOOXXXXXXXXXXXXXXXXXXXXXXXX');
    console.log(this.selectedControles);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'descricao',
      selectAllText: 'Selecione tudo',
      unSelectAllText: 'Limpar seleção',
      searchPlaceholderText: 'Pesquisar',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  previousState(): void {
    window.history.back();
  }

  delete(comanda: IComanda): void {
    const modalRef = this.modalService.open(ComandaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.comanda = comanda;
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

    this.loadFromBackendWithRouteInformationsControle().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccessControle(res);
      },
    });
  }

  onItemSelectComandas(item: any): void {
    // this.filters.removeFilter('id.in', item.id);
    // this.filters.addFilter('id.in', item.id);
    console.log(item);
  }

  onItemDeSelectComandas(item: any): void {
    // this.filters.removeFilter('id.in', item.id);
    console.log(item);
  }

  onSelectAllComandas(items: any): void {
    console.log(items);
  }

  onDeSelectAllComandas(items: any): void {
    console.log(items);
  }

  onItemSelectControles(item: any): void {
    //this.filters.addFilter('foo', 'addedValue1', 'addedValue2');
    console.log(item);
  }

  onItemDeSelectControles(item: any): void {
    //this.filters.addFilter('foo', 'addedValue1', 'addedValue2');
    console.log(item);
  }

  onSelectAllControles(items: any): void {
    console.log(items);
  }

  onDeSelectAllControles(items: any): void {
    console.log(items);
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

  protected loadFromBackendWithRouteInformationsControle(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendControle(this.page, this.predicate, this.ascending, this.filters.filterOptions)),
    );
  }
  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
    this.filters.initializeFromParams(params);
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.comandas = dataFromBody;
    this.listaComandas = this.comandas;
  }

  protected onResponseSuccessControle(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBodyControle(response.body);
    this.listaControles = dataFromBody;

    this.filters.filterOptions.forEach(item => {
      console.log('PASSO 11111111111111');
      if (item.name === 'controleComandaId.in') {
        item.values.forEach(valor => {
          console.log('PASSO 2222222222222222');
          console.log(Number(valor));
          console.log(this.listaControles.length);
          const controlex: IControleComanda = this.listaControles.find(itemx => itemx.id === Number(valor));
          console.log(controlex);
          if (controlex) {
            const controle: IControleComanda = { id: Number(valor), descricao: controlex.descricao };
            console.log(controle);
            this.selectedControles.push(controle);
          }
        });
      }
    });
  }

  protected fillComponentAttributesFromResponseBody(data: IComanda[] | null): IComanda[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseBodyControle(data: IControleComanda[] | null): IComanda[] {
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

    console.log('FILTROSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
    console.log(this.selectedComandas.length);
    filterOptions?.forEach(filterOption => {
      queryObject[filterOption.name] = filterOption.values;
    });

    this.selectedComandas.forEach(item => {
      console.log('id.in');
      console.log(item.id);
      queryObject['id.in'] = item.id;
    });

    this.selectedControles.forEach(item => {
      console.log('controleComandaId.in');
      console.log(item.id);
      queryObject['controleComandaId.in'] = item.id;
    });

    return this.comandaService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected queryBackendControle(
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
    return this.controleComandaService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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
}
