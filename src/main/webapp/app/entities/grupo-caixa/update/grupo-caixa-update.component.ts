import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoCaixa } from '../grupo-caixa.model';
import { GrupoCaixaService } from '../service/grupo-caixa.service';
import { GrupoCaixaFormService, GrupoCaixaFormGroup } from './grupo-caixa-form.service';

@Component({
  standalone: true,
  selector: 'jhi-grupo-caixa-update',
  templateUrl: './grupo-caixa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GrupoCaixaUpdateComponent implements OnInit {
  isSaving = false;
  grupoCaixa: IGrupoCaixa | null = null;

  editForm: GrupoCaixaFormGroup = this.grupoCaixaFormService.createGrupoCaixaFormGroup();

  constructor(
    protected grupoCaixaService: GrupoCaixaService,
    protected grupoCaixaFormService: GrupoCaixaFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoCaixa }) => {
      this.grupoCaixa = grupoCaixa;
      if (grupoCaixa) {
        this.updateForm(grupoCaixa);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupoCaixa = this.grupoCaixaFormService.getGrupoCaixa(this.editForm);
    if (grupoCaixa.id !== null) {
      this.subscribeToSaveResponse(this.grupoCaixaService.update(grupoCaixa));
    } else {
      this.subscribeToSaveResponse(this.grupoCaixaService.create(grupoCaixa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoCaixa>>): void {
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

  protected updateForm(grupoCaixa: IGrupoCaixa): void {
    this.grupoCaixa = grupoCaixa;
    this.grupoCaixaFormService.resetForm(this.editForm, grupoCaixa);
  }
}
