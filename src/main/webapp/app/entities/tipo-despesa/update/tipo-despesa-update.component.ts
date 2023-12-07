import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoDespesa } from 'app/entities/grupo-despesa/grupo-despesa.model';
import { GrupoDespesaService } from 'app/entities/grupo-despesa/service/grupo-despesa.service';
import { ITipoDespesa } from '../tipo-despesa.model';
import { TipoDespesaService } from '../service/tipo-despesa.service';
import { TipoDespesaFormService, TipoDespesaFormGroup } from './tipo-despesa-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tipo-despesa-update',
  templateUrl: './tipo-despesa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TipoDespesaUpdateComponent implements OnInit {
  isSaving = false;
  tipoDespesa: ITipoDespesa | null = null;

  grupoDespesasSharedCollection: IGrupoDespesa[] = [];

  editForm: TipoDespesaFormGroup = this.tipoDespesaFormService.createTipoDespesaFormGroup();

  constructor(
    protected tipoDespesaService: TipoDespesaService,
    protected tipoDespesaFormService: TipoDespesaFormService,
    protected grupoDespesaService: GrupoDespesaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareGrupoDespesa = (o1: IGrupoDespesa | null, o2: IGrupoDespesa | null): boolean =>
    this.grupoDespesaService.compareGrupoDespesa(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDespesa }) => {
      this.tipoDespesa = tipoDespesa;
      if (tipoDespesa) {
        this.updateForm(tipoDespesa);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoDespesa = this.tipoDespesaFormService.getTipoDespesa(this.editForm);
    if (tipoDespesa.id !== null) {
      this.subscribeToSaveResponse(this.tipoDespesaService.update(tipoDespesa));
    } else {
      this.subscribeToSaveResponse(this.tipoDespesaService.create(tipoDespesa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDespesa>>): void {
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

  protected updateForm(tipoDespesa: ITipoDespesa): void {
    this.tipoDespesa = tipoDespesa;
    this.tipoDespesaFormService.resetForm(this.editForm, tipoDespesa);

    this.grupoDespesasSharedCollection = this.grupoDespesaService.addGrupoDespesaToCollectionIfMissing<IGrupoDespesa>(
      this.grupoDespesasSharedCollection,
      tipoDespesa.grupoDespesa,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.grupoDespesaService
      .query()
      .pipe(map((res: HttpResponse<IGrupoDespesa[]>) => res.body ?? []))
      .pipe(
        map((grupoDespesas: IGrupoDespesa[]) =>
          this.grupoDespesaService.addGrupoDespesaToCollectionIfMissing<IGrupoDespesa>(grupoDespesas, this.tipoDespesa?.grupoDespesa),
        ),
      )
      .subscribe((grupoDespesas: IGrupoDespesa[]) => (this.grupoDespesasSharedCollection = grupoDespesas));
  }
}
