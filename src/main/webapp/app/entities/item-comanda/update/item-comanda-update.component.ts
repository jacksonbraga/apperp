import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITipoPagamento } from 'app/entities/tipo-pagamento/tipo-pagamento.model';
import { TipoPagamentoService } from 'app/entities/tipo-pagamento/service/tipo-pagamento.service';
import { ITipoServico } from 'app/entities/tipo-servico/tipo-servico.model';
import { TipoServicoService } from 'app/entities/tipo-servico/service/tipo-servico.service';
import { IComanda } from 'app/entities/comanda/comanda.model';
import { ComandaService } from 'app/entities/comanda/service/comanda.service';
import { ItemComandaService } from '../service/item-comanda.service';
import { IItemComanda } from '../item-comanda.model';
import { ItemComandaFormService, ItemComandaFormGroup } from './item-comanda-form.service';
import dayjs from 'dayjs/esm';
@Component({
  standalone: true,
  selector: 'jhi-item-comanda-update',
  templateUrl: './item-comanda-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ItemComandaUpdateComponent implements OnInit {
  isSaving = false;
  itemComanda: IItemComanda | null = null;

  tipoPagamentosSharedCollection: ITipoPagamento[] = [];
  tipoServicosSharedCollection: ITipoServico[] = [];
  comandasSharedCollection: IComanda[] = [];

  editForm: ItemComandaFormGroup = this.itemComandaFormService.createItemComandaFormGroup();

  constructor(
    protected itemComandaService: ItemComandaService,
    protected itemComandaFormService: ItemComandaFormService,
    protected tipoPagamentoService: TipoPagamentoService,
    protected tipoServicoService: TipoServicoService,
    protected comandaService: ComandaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTipoPagamento = (o1: ITipoPagamento | null, o2: ITipoPagamento | null): boolean =>
    this.tipoPagamentoService.compareTipoPagamento(o1, o2);

  compareTipoServico = (o1: ITipoServico | null, o2: ITipoServico | null): boolean => this.tipoServicoService.compareTipoServico(o1, o2);

  compareComanda = (o1: IComanda | null, o2: IComanda | null): boolean => this.comandaService.compareComanda(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemComanda }) => {
      this.itemComanda = itemComanda;
      if (itemComanda) {
        this.updateForm(itemComanda);
      } else {
        this.editForm.get('data')?.setValue(dayjs());
      }
      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const itemComanda = this.itemComandaFormService.getItemComanda(this.editForm);
    if (itemComanda.id !== null) {
      this.subscribeToSaveResponse(this.itemComandaService.update(itemComanda));
    } else {
      this.subscribeToSaveResponse(this.itemComandaService.create(itemComanda));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemComanda>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(itemComanda: IItemComanda): void {
    this.itemComanda = itemComanda;
    this.itemComandaFormService.resetForm(this.editForm, itemComanda);

    this.tipoPagamentosSharedCollection = this.tipoPagamentoService.addTipoPagamentoToCollectionIfMissing<ITipoPagamento>(
      this.tipoPagamentosSharedCollection,
      itemComanda.tipoPagamento,
    );
    this.tipoServicosSharedCollection = this.tipoServicoService.addTipoServicoToCollectionIfMissing<ITipoServico>(
      this.tipoServicosSharedCollection,
      itemComanda.tipoServico,
    );
    this.comandasSharedCollection = this.comandaService.addComandaToCollectionIfMissing<IComanda>(
      this.comandasSharedCollection,
      itemComanda.comandaPai,
      itemComanda.comanda,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoPagamentoService
      .query()
      .pipe(map((res: HttpResponse<ITipoPagamento[]>) => res.body ?? []))
      .pipe(
        map((tipoPagamentos: ITipoPagamento[]) =>
          this.tipoPagamentoService.addTipoPagamentoToCollectionIfMissing<ITipoPagamento>(tipoPagamentos, this.itemComanda?.tipoPagamento),
        ),
      )
      .subscribe((tipoPagamentos: ITipoPagamento[]) => (this.tipoPagamentosSharedCollection = tipoPagamentos));

    this.tipoServicoService
      .query()
      .pipe(map((res: HttpResponse<ITipoServico[]>) => res.body ?? []))
      .pipe(
        map((tipoServicos: ITipoServico[]) =>
          this.tipoServicoService.addTipoServicoToCollectionIfMissing<ITipoServico>(tipoServicos, this.itemComanda?.tipoServico),
        ),
      )
      .subscribe((tipoServicos: ITipoServico[]) => (this.tipoServicosSharedCollection = tipoServicos));

    this.comandaService
      .query()
      .pipe(map((res: HttpResponse<IComanda[]>) => res.body ?? []))
      .pipe(
        map((comandas: IComanda[]) =>
          this.comandaService.addComandaToCollectionIfMissing<IComanda>(comandas, this.itemComanda?.comandaPai, this.itemComanda?.comanda),
        ),
      )
      .subscribe((comandas: IComanda[]) => (this.comandasSharedCollection = comandas));
  }
}
