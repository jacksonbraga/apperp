import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoPagamento } from 'app/entities/grupo-pagamento/grupo-pagamento.model';
import { GrupoPagamentoService } from 'app/entities/grupo-pagamento/service/grupo-pagamento.service';
import { ITipoPagamento } from '../tipo-pagamento.model';
import { TipoPagamentoService } from '../service/tipo-pagamento.service';
import { TipoPagamentoFormService, TipoPagamentoFormGroup } from './tipo-pagamento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tipo-pagamento-update',
  templateUrl: './tipo-pagamento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TipoPagamentoUpdateComponent implements OnInit {
  isSaving = false;
  tipoPagamento: ITipoPagamento | null = null;

  grupoPagamentosSharedCollection: IGrupoPagamento[] = [];

  editForm: TipoPagamentoFormGroup = this.tipoPagamentoFormService.createTipoPagamentoFormGroup();

  constructor(
    protected tipoPagamentoService: TipoPagamentoService,
    protected tipoPagamentoFormService: TipoPagamentoFormService,
    protected grupoPagamentoService: GrupoPagamentoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareGrupoPagamento = (o1: IGrupoPagamento | null, o2: IGrupoPagamento | null): boolean =>
    this.grupoPagamentoService.compareGrupoPagamento(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoPagamento }) => {
      this.tipoPagamento = tipoPagamento;
      if (tipoPagamento) {
        this.updateForm(tipoPagamento);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoPagamento = this.tipoPagamentoFormService.getTipoPagamento(this.editForm);
    if (tipoPagamento.id !== null) {
      this.subscribeToSaveResponse(this.tipoPagamentoService.update(tipoPagamento));
    } else {
      this.subscribeToSaveResponse(this.tipoPagamentoService.create(tipoPagamento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoPagamento>>): void {
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

  protected updateForm(tipoPagamento: ITipoPagamento): void {
    this.tipoPagamento = tipoPagamento;
    this.tipoPagamentoFormService.resetForm(this.editForm, tipoPagamento);

    this.grupoPagamentosSharedCollection = this.grupoPagamentoService.addGrupoPagamentoToCollectionIfMissing<IGrupoPagamento>(
      this.grupoPagamentosSharedCollection,
      tipoPagamento.grupoPagamento,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.grupoPagamentoService
      .query()
      .pipe(map((res: HttpResponse<IGrupoPagamento[]>) => res.body ?? []))
      .pipe(
        map((grupoPagamentos: IGrupoPagamento[]) =>
          this.grupoPagamentoService.addGrupoPagamentoToCollectionIfMissing<IGrupoPagamento>(
            grupoPagamentos,
            this.tipoPagamento?.grupoPagamento,
          ),
        ),
      )
      .subscribe((grupoPagamentos: IGrupoPagamento[]) => (this.grupoPagamentosSharedCollection = grupoPagamentos));
  }
}
