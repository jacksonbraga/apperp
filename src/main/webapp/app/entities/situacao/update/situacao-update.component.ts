import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISituacao } from '../situacao.model';
import { SituacaoService } from '../service/situacao.service';
import { SituacaoFormService, SituacaoFormGroup } from './situacao-form.service';

@Component({
  standalone: true,
  selector: 'jhi-situacao-update',
  templateUrl: './situacao-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SituacaoUpdateComponent implements OnInit {
  isSaving = false;
  situacao: ISituacao | null = null;

  editForm: SituacaoFormGroup = this.situacaoFormService.createSituacaoFormGroup();

  constructor(
    protected situacaoService: SituacaoService,
    protected situacaoFormService: SituacaoFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ situacao }) => {
      this.situacao = situacao;
      if (situacao) {
        this.updateForm(situacao);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const situacao = this.situacaoFormService.getSituacao(this.editForm);
    if (situacao.id !== null) {
      this.subscribeToSaveResponse(this.situacaoService.update(situacao));
    } else {
      this.subscribeToSaveResponse(this.situacaoService.create(situacao));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISituacao>>): void {
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

  protected updateForm(situacao: ISituacao): void {
    this.situacao = situacao;
    this.situacaoFormService.resetForm(this.editForm, situacao);
  }
}
