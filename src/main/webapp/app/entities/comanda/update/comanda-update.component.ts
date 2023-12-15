import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISituacao } from 'app/entities/situacao/situacao.model';
import { SituacaoService } from 'app/entities/situacao/service/situacao.service';
import { IControleComanda } from 'app/entities/controle-comanda/controle-comanda.model';
import { ControleComandaService } from 'app/entities/controle-comanda/service/controle-comanda.service';
import { ComandaService } from '../service/comanda.service';
import { IComanda } from '../comanda.model';
import { ComandaFormService, ComandaFormGroup } from './comanda-form.service';
import dayjs from 'dayjs/esm';

@Component({
  standalone: true,
  selector: 'jhi-comanda-update',
  templateUrl: './comanda-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ComandaUpdateComponent implements OnInit {
  isSaving = false;
  comanda: IComanda | null = null;

  situacaosSharedCollection: ISituacao[] = [];
  controleComandasSharedCollection: IControleComanda[] = [];

  editForm: ComandaFormGroup = this.comandaFormService.createComandaFormGroup();

  constructor(
    protected comandaService: ComandaService,
    protected comandaFormService: ComandaFormService,
    protected situacaoService: SituacaoService,
    protected controleComandaService: ControleComandaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareSituacao = (o1: ISituacao | null, o2: ISituacao | null): boolean => this.situacaoService.compareSituacao(o1, o2);

  compareControleComanda = (o1: IControleComanda | null, o2: IControleComanda | null): boolean =>
    this.controleComandaService.compareControleComanda(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ comanda }) => {
      this.comanda = comanda;
      if (comanda) {
        this.updateForm(comanda);
      } else {
        this.editForm.get('data')?.setValue(dayjs());
      }
      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const comanda = this.comandaFormService.getComanda(this.editForm);
    if (comanda.id !== null) {
      this.subscribeToSaveResponse(this.comandaService.update(comanda));
    } else {
      this.subscribeToSaveResponse(this.comandaService.create(comanda));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComanda>>): void {
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

  protected updateForm(comanda: IComanda): void {
    this.comanda = comanda;
    this.comandaFormService.resetForm(this.editForm, comanda);

    this.situacaosSharedCollection = this.situacaoService.addSituacaoToCollectionIfMissing<ISituacao>(
      this.situacaosSharedCollection,
      comanda.situacao,
    );
    this.controleComandasSharedCollection = this.controleComandaService.addControleComandaToCollectionIfMissing<IControleComanda>(
      this.controleComandasSharedCollection,
      comanda.controle,
      comanda.controleComanda,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.situacaoService
      .query()
      .pipe(map((res: HttpResponse<ISituacao[]>) => res.body ?? []))
      .pipe(
        map((situacaos: ISituacao[]) =>
          this.situacaoService.addSituacaoToCollectionIfMissing<ISituacao>(situacaos, this.comanda?.situacao),
        ),
      )
      .subscribe((situacaos: ISituacao[]) => (this.situacaosSharedCollection = situacaos));

    this.controleComandaService
      .query()
      .pipe(map((res: HttpResponse<IControleComanda[]>) => res.body ?? []))
      .pipe(
        map((controleComandas: IControleComanda[]) =>
          this.controleComandaService.addControleComandaToCollectionIfMissing<IControleComanda>(
            controleComandas,
            this.comanda?.controle,
            this.comanda?.controleComanda,
          ),
        ),
      )
      .subscribe((controleComandas: IControleComanda[]) => (this.controleComandasSharedCollection = controleComandas));
  }
}
