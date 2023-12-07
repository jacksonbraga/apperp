import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoServico } from 'app/entities/grupo-servico/grupo-servico.model';
import { GrupoServicoService } from 'app/entities/grupo-servico/service/grupo-servico.service';
import { ITipoServico } from '../tipo-servico.model';
import { TipoServicoService } from '../service/tipo-servico.service';
import { TipoServicoFormService, TipoServicoFormGroup } from './tipo-servico-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tipo-servico-update',
  templateUrl: './tipo-servico-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TipoServicoUpdateComponent implements OnInit {
  isSaving = false;
  tipoServico: ITipoServico | null = null;

  grupoServicosSharedCollection: IGrupoServico[] = [];

  editForm: TipoServicoFormGroup = this.tipoServicoFormService.createTipoServicoFormGroup();

  constructor(
    protected tipoServicoService: TipoServicoService,
    protected tipoServicoFormService: TipoServicoFormService,
    protected grupoServicoService: GrupoServicoService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareGrupoServico = (o1: IGrupoServico | null, o2: IGrupoServico | null): boolean =>
    this.grupoServicoService.compareGrupoServico(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoServico }) => {
      this.tipoServico = tipoServico;
      if (tipoServico) {
        this.updateForm(tipoServico);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoServico = this.tipoServicoFormService.getTipoServico(this.editForm);
    if (tipoServico.id !== null) {
      this.subscribeToSaveResponse(this.tipoServicoService.update(tipoServico));
    } else {
      this.subscribeToSaveResponse(this.tipoServicoService.create(tipoServico));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoServico>>): void {
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

  protected updateForm(tipoServico: ITipoServico): void {
    this.tipoServico = tipoServico;
    this.tipoServicoFormService.resetForm(this.editForm, tipoServico);

    this.grupoServicosSharedCollection = this.grupoServicoService.addGrupoServicoToCollectionIfMissing<IGrupoServico>(
      this.grupoServicosSharedCollection,
      tipoServico.grupoServico,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.grupoServicoService
      .query()
      .pipe(map((res: HttpResponse<IGrupoServico[]>) => res.body ?? []))
      .pipe(
        map((grupoServicos: IGrupoServico[]) =>
          this.grupoServicoService.addGrupoServicoToCollectionIfMissing<IGrupoServico>(grupoServicos, this.tipoServico?.grupoServico),
        ),
      )
      .subscribe((grupoServicos: IGrupoServico[]) => (this.grupoServicosSharedCollection = grupoServicos));
  }
}
