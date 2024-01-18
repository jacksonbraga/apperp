import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoCaixa } from 'app/entities/grupo-caixa/grupo-caixa.model';
import { GrupoCaixaService } from 'app/entities/grupo-caixa/service/grupo-caixa.service';
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

  grupoCaixasSharedCollection: IGrupoCaixa[] = [];

  editForm: TipoCaixaFormGroup = this.tipoCaixaFormService.createTipoCaixaFormGroup();

  constructor(
    protected tipoCaixaService: TipoCaixaService,
    protected tipoCaixaFormService: TipoCaixaFormService,
    protected grupoCaixaService: GrupoCaixaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareGrupoCaixa = (o1: IGrupoCaixa | null, o2: IGrupoCaixa | null): boolean => this.grupoCaixaService.compareGrupoCaixa(o1, o2);

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

    this.grupoCaixasSharedCollection = this.grupoCaixaService.addGrupoCaixaToCollectionIfMissing<IGrupoCaixa>(
      this.grupoCaixasSharedCollection,
      ...(tipoCaixa.grupoCaixas ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.grupoCaixaService
      .query()
      .pipe(map((res: HttpResponse<IGrupoCaixa[]>) => res.body ?? []))
      .pipe(
        map((grupoCaixas: IGrupoCaixa[]) =>
          this.grupoCaixaService.addGrupoCaixaToCollectionIfMissing<IGrupoCaixa>(grupoCaixas, ...(this.tipoCaixa?.grupoCaixas ?? [])),
        ),
      )
      .subscribe((grupoCaixas: IGrupoCaixa[]) => (this.grupoCaixasSharedCollection = grupoCaixas));
  }
}
