import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGrupoServico } from '../grupo-servico.model';
import { GrupoServicoService } from '../service/grupo-servico.service';
import { GrupoServicoFormService, GrupoServicoFormGroup } from './grupo-servico-form.service';

@Component({
  standalone: true,
  selector: 'jhi-grupo-servico-update',
  templateUrl: './grupo-servico-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GrupoServicoUpdateComponent implements OnInit {
  isSaving = false;
  grupoServico: IGrupoServico | null = null;

  editForm: GrupoServicoFormGroup = this.grupoServicoFormService.createGrupoServicoFormGroup();

  constructor(
    protected grupoServicoService: GrupoServicoService,
    protected grupoServicoFormService: GrupoServicoFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grupoServico }) => {
      this.grupoServico = grupoServico;
      if (grupoServico) {
        this.updateForm(grupoServico);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grupoServico = this.grupoServicoFormService.getGrupoServico(this.editForm);
    if (grupoServico.id !== null) {
      this.subscribeToSaveResponse(this.grupoServicoService.update(grupoServico));
    } else {
      this.subscribeToSaveResponse(this.grupoServicoService.create(grupoServico));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrupoServico>>): void {
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

  protected updateForm(grupoServico: IGrupoServico): void {
    this.grupoServico = grupoServico;
    this.grupoServicoFormService.resetForm(this.editForm, grupoServico);
  }
}
