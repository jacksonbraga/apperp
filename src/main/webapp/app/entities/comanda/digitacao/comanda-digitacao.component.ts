import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, finalize, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortDirective, SortByDirective } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ItemCountComponent } from 'app/shared/pagination';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA, ITEM_ALTERED_EVENT } from 'app/config/navigation.constants';
import { FilterComponent, FilterOptions, IFilterOptions, IFilterOption } from 'app/shared/filter';
import { IComanda } from '../comanda.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { EntityArrayResponseType, ComandaService } from '../service/comanda.service';
import { ComandaDeleteDialogComponent } from '../delete/comanda-delete-dialog.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ControleComandaService } from 'app/entities/controle-comanda/service/controle-comanda.service';
import { IControleComanda } from 'app/entities/controle-comanda/controle-comanda.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemComandaComponent } from 'app/entities/item-comanda/list/item-comanda.component';
import { ISituacao } from 'app/entities/situacao/situacao.model';
import { IRespostaItemComanda } from 'app/entities/situacao/resposta-item-comanda.model';
import { TabDirective } from 'app/shared/entertab/tab.directive';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  standalone: true,
  selector: 'jhi-comanda',
  templateUrl: './comanda-digitacao.component.html',
  styleUrls: ['./comanda-digitacao.component.scss'],
  encapsulation: ViewEncapsulation.None,

  imports: [
    RouterModule,
    TabDirective,
    FormsModule,
    SharedModule,
    NgxCurrencyDirective,
    SortDirective,
    NgMultiSelectDropDownModule,
    SortByDirective,
    ButtonModule,
    MultiSelectModule,
    DurationPipe,
    ReactiveFormsModule,
    NgbDatepickerModule,
    DialogModule,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    FilterComponent,
    ItemCountComponent,
  ],
})
export class ComandaDigitacaoComponent implements OnInit, AfterViewInit {
  @ViewChild('inputNumero') numeroField!: ElementRef;
  @ViewChild('inputCartao') cartaoField!: ElementRef;

  comandas?: IComanda[];
  isLoading = false;
  visible = false;

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

  myForm!: FormGroup;
  contador: number = 0;

  listaComandas: any[] = [];
  selectedComandas: any[] = [];

  dropdownSettings = {};

  listaControles: any[] = [];
  selectedControles: any[] = [];

  dataFiltro = new Date().toISOString().substring(0, 10);

  closeResult = '';

  turno: string | null | undefined = '';
  data: any | null | undefined;
  fb: any;

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
    this.formGroup = this.formBuilder.group({
      numero: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      cartao: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      pix: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dinheiro: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      transferido: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    this.formGroup.controls['cartao'].disable();
    this.formGroup.controls['pix'].disable();
    this.formGroup.controls['dinheiro'].disable();
    this.formGroup.controls['transferido'].disable();

    this.dataFiltro = new Date().toISOString().substring(0, 10);
    this.load();

    this.filters.filterChanges.subscribe(filterOptions => this.handleNavigation(1, this.predicate, this.ascending, filterOptions));

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
  }

  ngAfterViewInit(): void {
    this.numeroField.nativeElement.focus();
    this.numeroField.nativeElement.addEventListener('keydown', this.preventTab.bind(this));
    this.numeroField.nativeElement.addEventListener('click', this.reseta());
  }

  preventTab(e: any): void {
    e = e || window.event;
    if (e.keyCode === 9) {
      // If tab key is pressed
      e.preventDefault(); // Stop event from its action
    }
  }

  previousState(): void {
    window.history.back();
  }

  pesquisaComanda(event: any): void {
    this.formGroup.controls['cartao'].disable();
    this.formGroup.controls['pix'].disable();
    this.formGroup.controls['dinheiro'].disable();
    this.formGroup.controls['transferido'].disable();

    const numero = this.formGroup.get('numero')?.value;
    if (numero) {
      const encontrou = this.comandas?.filter(comanda => comanda.numero === numero);
      if (encontrou && encontrou.length > 0) {
        this.formGroup.controls['cartao'].enable();
        this.formGroup.controls['pix'].enable();
        this.formGroup.controls['dinheiro'].enable();
        this.formGroup.controls['transferido'].enable();
        this.cartaoField.nativeElement.focus();
      } else {
        alert('Comanda ' + numero + ' não encontrada para esse Turno/Controle de comanda');
        this.formGroup.reset();
        this.formGroup.get('numero')?.setValue('');
        this.numeroField.nativeElement.focus();
      }
    }
  }

  reseta(): void {
    this.formGroup.reset();
    this.formGroup.get('numero')?.setValue('');
    this.formGroup.get('cartao')?.setValue('');
    this.formGroup.get('pix')?.setValue('');
    this.formGroup.get('dinheiro')?.setValue('');
    this.formGroup.get('transferido')?.setValue('');
    this.formGroup.controls['cartao'].disable();
    this.formGroup.controls['pix'].disable();
    this.formGroup.controls['dinheiro'].disable();
    this.formGroup.controls['transferido'].disable();
    this.numeroField.nativeElement.focus();
  }
  atualizaComanda(): void {
    const numero = this.formGroup.get('numero')?.value;
    const encontrou = this.comandas?.filter(comanda => comanda.numero === numero);
    if (encontrou) {
      const cartao = this.formGroup.get('cartao')?.value;
      const pix = this.formGroup.get('pix')?.value;
      const dinheiro = this.formGroup.get('dinheiro')?.value;
      const transferido = this.formGroup.get('transferido')?.value;

      encontrou[0].cartao = cartao;
      encontrou[0].pix = pix;
      encontrou[0].dinheiro = dinheiro;
      encontrou[0].transferido = transferido;
      if (cartao != null || pix != null || dinheiro != null || transferido != null) {
        encontrou[0].situacao = { id: 4, descricao: 'LANÇADA' };
      } else {
        encontrou[0].situacao = { id: 4, descricao: 'ABERTA' };
      }
    }

    this.formGroup.reset();
    this.formGroup.controls['cartao'].disable();
    this.formGroup.controls['pix'].disable();
    this.formGroup.controls['dinheiro'].disable();
    this.formGroup.controls['transferido'].disable();

    if (encontrou) {
      this.subscribeToSaveResponse(this.comandaService.updateDigitacao(encontrou[0]));
    }
    this.numeroField.nativeElement.focus();
    document.getElementById('field_numero')?.focus();
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

  delete2(comanda: IComanda): void {
    const modalRef = this.modalService.open(ItemComandaComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.argComanda = comanda.id;
    modalRef.componentInstance.argControle = comanda.controleComanda?.cor?.descricao;
    // unsubscribe not needed because closed completes on modal close
    //modalRef.closed.forEach(item => this.setaSituacao(comanda));

    modalRef.closed.subscribe({
      next: (res: IRespostaItemComanda) => {
        this.setaSituacao(comanda, res);
      },
    });
  }

  setaSituacao(comanda: IComanda, resposta: IRespostaItemComanda): void {
    let situacao: ISituacao = { id: 1, descricao: 'ABERTA' };
    if (resposta.total > 0) {
      situacao = { id: 4, descricao: 'LANÇADA' };
    }

    comanda.situacao = situacao;
    comanda.valor = resposta.total;
    comanda.resumo = resposta.resumo;
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.numeroField.nativeElement.focus();
        this.onResponseSuccess(res);
      },
    });

    /*    this.loadFromBackendWithRouteInformationsControle().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccessControle(res);
      },
    }); */
  }

  onItemSelectComandas(item: any): void {
    this.load();
  }

  onItemDeSelectComandas(item: any): void {
    this.load();
  }

  onSelectAllComandas(items: any): void {}

  onDeSelectAllComandas(items: any): void {}

  onItemSelectControles(item: any): void {
    //this.filters.addFilter('foo', 'addedValue1', 'addedValue2');
  }

  onItemDeSelectControles(item: any): void {
    //this.filters.addFilter('foo', 'addedValue1', 'addedValue2');
  }

  onSelectAllControles(items: any): void {}

  onDeSelectAllControles(items: any): void {}

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending, this.filters.filterOptions);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending, this.filters.filterOptions);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComanda[]>>): void {
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

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending, this.filters.filterOptions)),
    );
  }

  /*  protected loadFromBackendWithRouteInformationsControle(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackendControle(this.page, this.predicate, this.ascending, this.filters.filterOptions)),
    );
  } */
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
    this.comandas.forEach(item => {
      this.turno = item.controleComanda?.cor?.descricao;
      this.data = item.controleComanda?.data;
    });
    this.listaComandas = this.comandas;
  }

  protected onResponseSuccessControle(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBodyControle(response.body);
    this.listaControles = dataFromBody;

    this.filters.filterOptions.forEach(item => {
      if (item.name === 'controleComandaId.in') {
        item.values.forEach(valor => {
          const controle: IControleComanda = this.listaControles.find(itemx => itemx.id === Number(valor));
          if (controle) {
            this.turno = controle.cor?.descricao;
            this.data = controle.data;
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

    filterOptions?.forEach(filterOption => {
      queryObject[filterOption.name] = filterOption.values;
    });

    this.selectedComandas.forEach(item => {
      queryObject['id.in'] = item.id;
    });

    this.selectedControles.forEach(item => {
      queryObject['controleComandaId.in'] = item.id;
    });

    return this.comandaService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected getBackgroundColor(cor: string | undefined | null): string {
    if (!cor) {
      return '';
    } else {
      return cor;
    }
  }

  /*   protected queryBackendControle(
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
 */
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
