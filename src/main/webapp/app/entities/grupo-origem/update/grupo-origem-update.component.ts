import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoOrigem } from '../grupo-origem.model';
import { GrupoOrigemService } from '../service/grupo-origem.service';
import { GrupoOrigemFormService, GrupoOrigemFormGroup } from './grupo-origem-form.service';

@Component({
  standalone: true,
  selector: 'jhi-grupo-origem-update',
  templateUrl: './grupo-origem-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GrupoOrigemUpdateComponent implements OnInit {
  isSaving = false;
  grupoOrigem: IGrupoOrigem | null = null;

  editForm: GrupoOrigemFormGroup = this.grupoOrigemFormService.createGrupoOrigemFormGroup();

  constructor(
    protected grupoOrigemService: GrupoOrigemService,
    protected grupoOrigemFormService: GrupoOrigemFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoOrigem }) => {
      this.grupoOrigem = grupoOrigem;
      if (grupoOrigem) {
        this.updateForm(grupoOrigem);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupoOrigem = this.grupoOrigemFormService.getGrupoOrigem(this.editForm);
    if (grupoOrigem.id !== null) {
      this.subscribeToSaveResponse(this.grupoOrigemService.update(grupoOrigem));
    } else {
      this.subscribeToSaveResponse(this.grupoOrigemService.create(grupoOrigem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoOrigem>>): void {
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

  protected updateForm(grupoOrigem: IGrupoOrigem): void {
    this.grupoOrigem = grupoOrigem;
    this.grupoOrigemFormService.resetForm(this.editForm, grupoOrigem);
  }
}
