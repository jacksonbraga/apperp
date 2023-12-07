import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoPagamento } from '../grupo-pagamento.model';
import { GrupoPagamentoService } from '../service/grupo-pagamento.service';
import { GrupoPagamentoFormService, GrupoPagamentoFormGroup } from './grupo-pagamento-form.service';

@Component({
  standalone: true,
  selector: 'jhi-grupo-pagamento-update',
  templateUrl: './grupo-pagamento-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GrupoPagamentoUpdateComponent implements OnInit {
  isSaving = false;
  grupoPagamento: IGrupoPagamento | null = null;

  editForm: GrupoPagamentoFormGroup = this.grupoPagamentoFormService.createGrupoPagamentoFormGroup();

  constructor(
    protected grupoPagamentoService: GrupoPagamentoService,
    protected grupoPagamentoFormService: GrupoPagamentoFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoPagamento }) => {
      this.grupoPagamento = grupoPagamento;
      if (grupoPagamento) {
        this.updateForm(grupoPagamento);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupoPagamento = this.grupoPagamentoFormService.getGrupoPagamento(this.editForm);
    if (grupoPagamento.id !== null) {
      this.subscribeToSaveResponse(this.grupoPagamentoService.update(grupoPagamento));
    } else {
      this.subscribeToSaveResponse(this.grupoPagamentoService.create(grupoPagamento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoPagamento>>): void {
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

  protected updateForm(grupoPagamento: IGrupoPagamento): void {
    this.grupoPagamento = grupoPagamento;
    this.grupoPagamentoFormService.resetForm(this.editForm, grupoPagamento);
  }
}
