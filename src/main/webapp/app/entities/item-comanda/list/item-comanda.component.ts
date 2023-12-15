import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, finalize, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortDirective, SortByDirective } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { SortService } from 'app/shared/sort/sort.service';
import { IItemComanda } from '../item-comanda.model';
import { EntityArrayResponseType, ItemComandaService } from '../service/item-comanda.service';
import { ItemComandaDeleteDialogComponent } from '../delete/item-comanda-delete-dialog.component';
import { FilterOptions, IFilterOption, IFilterOptions } from 'app/shared/filter';
import { HttpResponse } from '@angular/common/http';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

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
    InputTextModule,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
  ],
})
export class ItemComandaComponent implements OnInit {
  itemComandas!: IItemComanda[];
  isLoading = false;

  predicate = 'id';
  ascending = true;
  filters: IFilterOptions = new FilterOptions();
  mostraId = false;
  descricao: string = '';
  constructor(
    protected itemComandaService: ItemComandaService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal,
  ) {}

  trackId = (_index: number, item: IItemComanda): number => this.itemComandaService.getItemComandaIdentifier(item);

  ngOnInit(): void {
    this.load();
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

  atualizaItem(): void {
    this.subscribeToSaveResponse(this.itemComandaService.updateLista(this.itemComandas));
  }

  previousState(): void {
    window.history.back();
  }

  findServicos(itens: IItemComanda[]): IItemComanda[] {
    return itens.filter(p => p.tipo === 'S');
  }

  findPagamentos(itens: IItemComanda[] | undefined): IItemComanda[] {
    const itensVazio: IItemComanda[] = [];
    if (!itens) {
      return itensVazio;
    }
    return itens.filter(p => p.tipo === 'P');
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemComanda[]>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
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
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
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
      eagerload: true,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    filterOptions?.forEach(filterOption => {
      queryObject[filterOption.name] = filterOption.values;
    });

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
}
