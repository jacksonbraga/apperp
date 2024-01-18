import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITipoCaixa } from 'app/entities/tipo-caixa/tipo-caixa.model';
import { TipoCaixaService } from 'app/entities/tipo-caixa/service/tipo-caixa.service';
import { ITipoOrigem } from 'app/entities/tipo-origem/tipo-origem.model';
import { TipoOrigemService } from 'app/entities/tipo-origem/service/tipo-origem.service';
import { CaixaService } from '../service/caixa.service';
import { ICaixa } from '../caixa.model';
import { CaixaFormService, CaixaFormGroup } from './caixa-form.service';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  standalone: true,
  selector: 'jhi-caixa-update',
  templateUrl: './caixa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule, NgxCurrencyDirective],
})
export class CaixaUpdateComponent implements OnInit {
  isSaving = false;
  caixa: ICaixa | null = null;

  tipoCaixasSharedCollection: ITipoCaixa[] = [];
  tipoOrigemsSharedCollection: ITipoOrigem[] = [];

  editForm: CaixaFormGroup = this.caixaFormService.createCaixaFormGroup();

  constructor(
    protected caixaService: CaixaService,
    protected caixaFormService: CaixaFormService,
    protected tipoCaixaService: TipoCaixaService,
    protected tipoOrigemService: TipoOrigemService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTipoCaixa = (o1: ITipoCaixa | null, o2: ITipoCaixa | null): boolean => this.tipoCaixaService.compareTipoCaixa(o1, o2);

  compareTipoOrigem = (o1: ITipoOrigem | null, o2: ITipoOrigem | null): boolean => this.tipoOrigemService.compareTipoOrigem(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ caixa }) => {
      this.caixa = caixa;
      if (caixa) {
        this.updateForm(caixa);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const caixa = this.caixaFormService.getCaixa(this.editForm);
    if (caixa.id !== null) {
      this.subscribeToSaveResponse(this.caixaService.update(caixa));
    } else {
      this.subscribeToSaveResponse(this.caixaService.create(caixa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICaixa>>): void {
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

  protected updateForm(caixa: ICaixa): void {
    this.caixa = caixa;
    this.caixaFormService.resetForm(this.editForm, caixa);

    this.tipoCaixasSharedCollection = this.tipoCaixaService.addTipoCaixaToCollectionIfMissing<ITipoCaixa>(
      this.tipoCaixasSharedCollection,
      ...(caixa.tipoCaixas ?? []),
    );
    this.tipoOrigemsSharedCollection = this.tipoOrigemService.addTipoOrigemToCollectionIfMissing<ITipoOrigem>(
      this.tipoOrigemsSharedCollection,
      ...(caixa.tipoOrigems ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoCaixaService
      .query()
      .pipe(map((res: HttpResponse<ITipoCaixa[]>) => res.body ?? []))
      .pipe(
        map((tipoCaixas: ITipoCaixa[]) =>
          this.tipoCaixaService.addTipoCaixaToCollectionIfMissing<ITipoCaixa>(tipoCaixas, ...(this.caixa?.tipoCaixas ?? [])),
        ),
      )
      .subscribe((tipoCaixas: ITipoCaixa[]) => (this.tipoCaixasSharedCollection = tipoCaixas));

    this.tipoOrigemService
      .query()
      .pipe(map((res: HttpResponse<ITipoOrigem[]>) => res.body ?? []))
      .pipe(
        map((tipoOrigems: ITipoOrigem[]) =>
          this.tipoOrigemService.addTipoOrigemToCollectionIfMissing<ITipoOrigem>(tipoOrigems, ...(this.caixa?.tipoOrigems ?? [])),
        ),
      )
      .subscribe((tipoOrigems: ITipoOrigem[]) => (this.tipoOrigemsSharedCollection = tipoOrigems));
  }
}
