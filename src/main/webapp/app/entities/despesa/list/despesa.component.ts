import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortDirective, SortByDirective } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { SortService } from 'app/shared/sort/sort.service';
import { IDespesa } from '../despesa.model';
import { EntityArrayResponseType, DespesaService } from '../service/despesa.service';
import { DespesaDeleteDialogComponent } from '../delete/despesa-delete-dialog.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import dayjs from 'dayjs';
import moment from 'moment';
import { LocalStorageService } from 'ngx-localstorage';

interface StoredObject {
  id: string;
  ano: string;
  mes: string;
}

@Component({
  standalone: true,
  selector: 'jhi-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    SharedModule,
    SortDirective,
    SortByDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
  ],
})
export class DespesaComponent implements OnInit {
  despesas?: IDespesa[];
  isLoading = false;
  storedObject: StoredObject | undefined | null;
  predicate = 'id';
  ascending = true;

  dataInicio: string = '';
  dataFim: string = '';

  selectedAno: any[] = [];
  selectedMes: any[] = [];

  dropdownSettings = {};
  dropdownSettingsAno = {};

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

  constructor(
    protected despesaService: DespesaService,
    private lss: LocalStorageService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal,
  ) {}

  trackId = (_index: number, item: IDespesa): number => this.despesaService.getDespesaIdentifier(item);

  ngOnInit(): void {
    let dateObj = new Date();

    this.storedObject = this.lss.get<StoredObject>('dataFiltroDespesa1');

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.storedObject?.ano !== null && this.storedObject?.ano !== undefined) {
      const ano = this.storedObject.ano;
      const mes = this.storedObject.mes;
      const data = ano + '-' + mes + '-01';
      dateObj = new Date(data);
    }

    const monthNameLong = dateObj.toLocaleString('pt-BR', { month: 'long' });

    this.selectedAno = [{ id: dateObj.getFullYear().toString(), descricao: dateObj.getFullYear().toString() }];
    this.selectedMes = [{ id: (dateObj.getMonth() + 1).toString(), descricao: monthNameLong }];

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

    this.load();
  }

  onItemSelectAno(item: any): void {}

  onItemDeSelectAno(item: any): void {}

  onItemSelectMes(item: any): void {}

  onItemDeSelectMes(item: any): void {}

  delete(despesa: IDespesa): void {
    const modalRef = this.modalService.open(DespesaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.despesa = despesa;
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
    this.despesas = this.refineData(dataFromBody);
  }

  protected refineData(data: IDespesa[]): IDespesa[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IDespesa[] | null): IDespesa[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    const mes: { id: string; descricao: string } = this.selectedMes[0];
    const ano: { id: string; descricao: string } = this.selectedAno[0];

    this.lss.set<StoredObject>('dataFiltroDespesa1', {
      id: 'dataFiltroDespesa1',
      ano: this.selectedAno[0].id,
      mes: this.selectedMes[0].id,
    });

    this.dataInicio = ano.id + '-' + mes.id + '-' + 1;
    const ultimaData = moment(this.dataInicio).endOf('month').format('YYYY-MM-DD');
    const ultimoDia = ultimaData.substring(ultimaData.lastIndexOf('-') + 1);
    this.dataFim = ano.id + '-' + mes.id + '-' + ultimoDia;

    queryObject['dataVencimento.greaterThanOrEqual'] = dayjs(this.dataInicio).format('YYYY-MM-DD');
    queryObject['dataVencimento.lessThanOrEqual'] = dayjs(this.dataFim).format('YYYY-MM-DD');

    return this.despesaService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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
