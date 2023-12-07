import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITipoDespesa } from 'app/entities/tipo-despesa/tipo-despesa.model';
import { TipoDespesaService } from 'app/entities/tipo-despesa/service/tipo-despesa.service';
import { IDespesa } from '../despesa.model';
import { DespesaService } from '../service/despesa.service';
import { DespesaFormService, DespesaFormGroup } from './despesa-form.service';

@Component({
  standalone: true,
  selector: 'jhi-despesa-update',
  templateUrl: './despesa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DespesaUpdateComponent implements OnInit {
  isSaving = false;
  despesa: IDespesa | null = null;

  tipoDespesasSharedCollection: ITipoDespesa[] = [];

  editForm: DespesaFormGroup = this.despesaFormService.createDespesaFormGroup();

  constructor(
    protected despesaService: DespesaService,
    protected despesaFormService: DespesaFormService,
    protected tipoDespesaService: TipoDespesaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTipoDespesa = (o1: ITipoDespesa | null, o2: ITipoDespesa | null): boolean => this.tipoDespesaService.compareTipoDespesa(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ despesa }) => {
      this.despesa = despesa;
      if (despesa) {
        this.updateForm(despesa);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const despesa = this.despesaFormService.getDespesa(this.editForm);
    if (despesa.id !== null) {
      this.subscribeToSaveResponse(this.despesaService.update(despesa));
    } else {
      this.subscribeToSaveResponse(this.despesaService.create(despesa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDespesa>>): void {
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

  protected updateForm(despesa: IDespesa): void {
    this.despesa = despesa;
    this.despesaFormService.resetForm(this.editForm, despesa);

    this.tipoDespesasSharedCollection = this.tipoDespesaService.addTipoDespesaToCollectionIfMissing<ITipoDespesa>(
      this.tipoDespesasSharedCollection,
      despesa.tipoDespesa,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoDespesaService
      .query()
      .pipe(map((res: HttpResponse<ITipoDespesa[]>) => res.body ?? []))
      .pipe(
        map((tipoDespesas: ITipoDespesa[]) =>
          this.tipoDespesaService.addTipoDespesaToCollectionIfMissing<ITipoDespesa>(tipoDespesas, this.despesa?.tipoDespesa),
        ),
      )
      .subscribe((tipoDespesas: ITipoDespesa[]) => (this.tipoDespesasSharedCollection = tipoDespesas));
  }
}
