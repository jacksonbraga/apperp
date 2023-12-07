import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoDespesa } from '../grupo-despesa.model';
import { GrupoDespesaService } from '../service/grupo-despesa.service';
import { GrupoDespesaFormService, GrupoDespesaFormGroup } from './grupo-despesa-form.service';

@Component({
  standalone: true,
  selector: 'jhi-grupo-despesa-update',
  templateUrl: './grupo-despesa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GrupoDespesaUpdateComponent implements OnInit {
  isSaving = false;
  grupoDespesa: IGrupoDespesa | null = null;

  editForm: GrupoDespesaFormGroup = this.grupoDespesaFormService.createGrupoDespesaFormGroup();

  constructor(
    protected grupoDespesaService: GrupoDespesaService,
    protected grupoDespesaFormService: GrupoDespesaFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoDespesa }) => {
      this.grupoDespesa = grupoDespesa;
      if (grupoDespesa) {
        this.updateForm(grupoDespesa);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupoDespesa = this.grupoDespesaFormService.getGrupoDespesa(this.editForm);
    if (grupoDespesa.id !== null) {
      this.subscribeToSaveResponse(this.grupoDespesaService.update(grupoDespesa));
    } else {
      this.subscribeToSaveResponse(this.grupoDespesaService.create(grupoDespesa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoDespesa>>): void {
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

  protected updateForm(grupoDespesa: IGrupoDespesa): void {
    this.grupoDespesa = grupoDespesa;
    this.grupoDespesaFormService.resetForm(this.editForm, grupoDespesa);
  }
}
