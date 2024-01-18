import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoOrigem } from 'app/entities/grupo-origem/grupo-origem.model';
import { GrupoOrigemService } from 'app/entities/grupo-origem/service/grupo-origem.service';
import { ITipoOrigem } from '../tipo-origem.model';
import { TipoOrigemService } from '../service/tipo-origem.service';
import { TipoOrigemFormService, TipoOrigemFormGroup } from './tipo-origem-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tipo-origem-update',
  templateUrl: './tipo-origem-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TipoOrigemUpdateComponent implements OnInit {
  isSaving = false;
  tipoOrigem: ITipoOrigem | null = null;

  grupoOrigemsSharedCollection: IGrupoOrigem[] = [];

  editForm: TipoOrigemFormGroup = this.tipoOrigemFormService.createTipoOrigemFormGroup();

  constructor(
    protected tipoOrigemService: TipoOrigemService,
    protected tipoOrigemFormService: TipoOrigemFormService,
    protected grupoOrigemService: GrupoOrigemService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareGrupoOrigem = (o1: IGrupoOrigem | null, o2: IGrupoOrigem | null): boolean => this.grupoOrigemService.compareGrupoOrigem(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoOrigem }) => {
      this.tipoOrigem = tipoOrigem;
      if (tipoOrigem) {
        this.updateForm(tipoOrigem);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoOrigem = this.tipoOrigemFormService.getTipoOrigem(this.editForm);
    if (tipoOrigem.id !== null) {
      this.subscribeToSaveResponse(this.tipoOrigemService.update(tipoOrigem));
    } else {
      this.subscribeToSaveResponse(this.tipoOrigemService.create(tipoOrigem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoOrigem>>): void {
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

  protected updateForm(tipoOrigem: ITipoOrigem): void {
    this.tipoOrigem = tipoOrigem;
    this.tipoOrigemFormService.resetForm(this.editForm, tipoOrigem);

    this.grupoOrigemsSharedCollection = this.grupoOrigemService.addGrupoOrigemToCollectionIfMissing<IGrupoOrigem>(
      this.grupoOrigemsSharedCollection,
      ...(tipoOrigem.grupoOrigems ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.grupoOrigemService
      .query()
      .pipe(map((res: HttpResponse<IGrupoOrigem[]>) => res.body ?? []))
      .pipe(
        map((grupoOrigems: IGrupoOrigem[]) =>
          this.grupoOrigemService.addGrupoOrigemToCollectionIfMissing<IGrupoOrigem>(grupoOrigems, ...(this.tipoOrigem?.grupoOrigems ?? [])),
        ),
      )
      .subscribe((grupoOrigems: IGrupoOrigem[]) => (this.grupoOrigemsSharedCollection = grupoOrigems));
  }
}
