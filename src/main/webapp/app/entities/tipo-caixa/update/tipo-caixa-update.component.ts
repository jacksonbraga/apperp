import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoPagamento } from 'app/entities/grupo-pagamento/grupo-pagamento.model';
import { GrupoPagamentoService } from 'app/entities/grupo-pagamento/service/grupo-pagamento.service';
import { ITipoCaixa } from '../tipo-caixa.model';
import { TipoCaixaService } from '../service/tipo-caixa.service';
import { TipoCaixaFormService, TipoCaixaFormGroup } from './tipo-caixa-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tipo-caixa-update',
  templateUrl: './tipo-caixa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TipoCaixaUpdateComponent implements OnInit {
  isSaving = false;
  tipoCaixa: ITipoCaixa | null = null;

  grupoPagamentosCollection: IGrupoPagamento[] = [];

  editForm: TipoCaixaFormGroup = this.tipoCaixaFormService.createTipoCaixaFormGroup();

  constructor(
    protected tipoCaixaService: TipoCaixaService,
    protected tipoCaixaFormService: TipoCaixaFormService,
    protected grupoPagamentoService: GrupoPagamentoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareGrupoPagamento = (o1: IGrupoPagamento | null, o2: IGrupoPagamento | null): boolean =>
    this.grupoPagamentoService.compareGrupoPagamento(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoCaixa }) => {
      this.tipoCaixa = tipoCaixa;
      if (tipoCaixa) {
        this.updateForm(tipoCaixa);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoCaixa = this.tipoCaixaFormService.getTipoCaixa(this.editForm);
    if (tipoCaixa.id !== null) {
      this.subscribeToSaveResponse(this.tipoCaixaService.update(tipoCaixa));
    } else {
      this.subscribeToSaveResponse(this.tipoCaixaService.create(tipoCaixa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoCaixa>>): void {
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

  protected updateForm(tipoCaixa: ITipoCaixa): void {
    this.tipoCaixa = tipoCaixa;
    this.tipoCaixaFormService.resetForm(this.editForm, tipoCaixa);

    this.grupoPagamentosCollection = this.grupoPagamentoService.addGrupoPagamentoToCollectionIfMissing<IGrupoPagamento>(
      this.grupoPagamentosCollection,
      tipoCaixa.grupoPagamento,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.grupoPagamentoService
      .query({ filter: 'tipocaixa-is-null' })
      .pipe(map((res: HttpResponse<IGrupoPagamento[]>) => res.body ?? []))
      .pipe(
        map((grupoPagamentos: IGrupoPagamento[]) =>
          this.grupoPagamentoService.addGrupoPagamentoToCollectionIfMissing<IGrupoPagamento>(
            grupoPagamentos,
            this.tipoCaixa?.grupoPagamento,
          ),
        ),
      )
      .subscribe((grupoPagamentos: IGrupoPagamento[]) => (this.grupoPagamentosCollection = grupoPagamentos));
  }
}
