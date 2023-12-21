import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, finalize, Observable, switchMap, tap } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SplitterModule } from 'primeng/splitter';
import SharedModule from 'app/shared/shared.module';
import { SortDirective, SortByDirective } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA, ITEM_ALTERED_EVENT } from 'app/config/navigation.constants';
import { SortService } from 'app/shared/sort/sort.service';
import { IItemComanda } from '../item-comanda.model';
import { EntityArrayResponseType, ItemComandaService } from '../service/item-comanda.service';
import { ItemComandaDeleteDialogComponent } from '../delete/item-comanda-delete-dialog.component';
import { FilterOptions, IFilterOption, IFilterOptions } from 'app/shared/filter';
import { HttpResponse } from '@angular/common/http';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TipoPagamentoService } from 'app/entities/tipo-pagamento/service/tipo-pagamento.service';
import { AutoFocusModule } from 'primeng/autofocus';
@Component({
  standalone: true,
  selector: 'jhi-item-comanda',
  templateUrl: './item-comanda.component.html',
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    SortDirective,
    SortByDirective,
    InputNumberModule,
    AutoFocusModule,
    InputTextModule,
    DurationPipe,
    FormatMediumDatetimePipe,
    SplitterModule,
    FormatMediumDatePipe,
  ],
})
export class ItemComandaComponent implements OnInit {
  itemComandas!: IItemComanda[];
  isLoading = false;
  argComanda = null;
  argControle = null;
  predicate = 'id';
  total: number = 0;
  primeiro = 0;
  ascending = true;
  filters: IFilterOptions = new FilterOptions();
  mostraId = false;
  descricao: string = '';
  constructor(
    protected tipoPagamentoService: TipoPagamentoService,
    protected itemComandaService: ItemComandaService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal,
    protected activeModal: NgbActiveModal,
  ) {}

  trackId = (_index: number, item: IItemComanda): number => this.itemComandaService.getItemComandaIdentifier(item);

  ngOnInit(): void {
    this.load();
    document.getElementById('field_valor')?.focus();
  }

  delete(itemComanda: IItemComanda): void {
    const modalRef = this.modalService.open(ItemComandaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemComanda = itemComanda;
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

  save(): void {
    this.itemComandas.forEach(item => {
      item.situacao = '4';
    });
    this.subscribeToSaveResponse(this.itemComandaService.updateLista(this.itemComandas));
    this.activeModal.close(ITEM_ALTERED_EVENT);
  }

  atualizaValor(): void {
    this.total = 0;
    this.itemComandas.forEach(item => {
      this.total += item.valor ?? 0;
    });
  }

  previousState(): void {
    window.history.back();
  }

  close() {
    this.activeModal.dismiss();
  }

  findServicos(itens: IItemComanda[]): IItemComanda[] {
    return itens.filter(p => p.tipo === 'S');
  }

  findPagamentos(itens: IItemComanda[] | undefined, tipo: string): IItemComanda[] {
    const itensVazio: IItemComanda[] = [];
    if (!itens) {
      return itensVazio;
    }

    return itens.filter(p => p.tipo === 'P' && p.tipoPagamento?.grupoPagamento?.tipoColuna?.trim() === tipo);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemComanda[]>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected getFocus(index: number): boolean {
    if (index === 0) {
      return true;
    }
    return false;
  }

  protected onSaveSuccess(): void {
    //this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    //this.isSaving = false;
  }

  protected navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending, this.filters.filterOptions)),
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    if (!params) {
      return;
    }

    if (!data) {
      return;
    }

    // const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    // this.predicate = sort[0];
    // this.ascending = sort[1] === ASC;
    this.filters.initializeFromParams(params);
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.itemComandas = this.refineData(dataFromBody);

    this.itemComandas.forEach(item => {
      if (item.comanda?.descricao != null) {
        this.descricao = item.comanda.descricao;
      }
    });

    this.atualizaValor();
  }

  protected refineData(data: IItemComanda[]): IItemComanda[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IItemComanda[] | null): IItemComanda[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean, filterOptions?: IFilterOption[]): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      eagerload: false,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    filterOptions?.forEach(filterOption => {
      queryObject[filterOption.name] = filterOption.values;
    });
    queryObject['comandaId.in'] = this.argComanda;
    return this.itemComandaService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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

  protected queryBackendTiposPagamento(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.tipoPagamentoService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }
}
