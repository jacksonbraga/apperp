import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICor } from 'app/entities/cor/cor.model';
import { CorService } from 'app/entities/cor/service/cor.service';
import { IControleComanda } from '../controle-comanda.model';
import { ControleComandaService } from '../service/controle-comanda.service';
import { ControleComandaFormService, ControleComandaFormGroup } from './controle-comanda-form.service';

@Component({
  standalone: true,
  selector: 'jhi-controle-comanda-update',
  templateUrl: './controle-comanda-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ControleComandaUpdateComponent implements OnInit {
  isSaving = false;
  controleComanda: IControleComanda | null = null;

  corsSharedCollection: ICor[] = [];

  editForm: ControleComandaFormGroup = this.controleComandaFormService.createControleComandaFormGroup();

  constructor(
    protected controleComandaService: ControleComandaService,
    protected controleComandaFormService: ControleComandaFormService,
    protected corService: CorService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCor = (o1: ICor | null, o2: ICor | null): boolean => this.corService.compareCor(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ controleComanda }) => {
      console.log('???????????????????????');
      console.log(controleComanda);
      this.controleComanda = controleComanda;
      if (controleComanda) {
        this.updateForm(controleComanda);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const controleComanda = this.controleComandaFormService.getControleComanda(this.editForm);
    console.log(controleComanda.cor?.id);
    console.log(controleComanda.cor?.descricao);
    if (controleComanda.id !== null) {
      this.subscribeToSaveResponse(this.controleComandaService.update(controleComanda));
    } else {
      this.subscribeToSaveResponse(this.controleComandaService.create(controleComanda));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IControleComanda>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected getBackgroundColor(rowData: ICor): string {
    if (!rowData.valor) {
      return '';
    } else {
      return rowData.valor;
    }
  }

  protected getBackgroundColor2(): string {
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    console.log(this.editForm.get('cor')!.value);
    if (this.editForm.get('cor') != null) {
      const cor = this.editForm.get('cor')!.value;
      if (cor?.valor == null) {
        return '';
      } else {
        return cor.valor;
      }
    } else {
      return '';
    }
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

  protected updateForm(controleComanda: IControleComanda): void {
    this.controleComanda = controleComanda;
    this.controleComandaFormService.resetForm(this.editForm, controleComanda);

    this.corsSharedCollection = this.corService.addCorToCollectionIfMissing<ICor>(this.corsSharedCollection, controleComanda.cor);
  }

  protected loadRelationshipsOptions(): void {
    this.corService
      .query()
      .pipe(map((res: HttpResponse<ICor[]>) => res.body ?? []))
      .pipe(map((cors: ICor[]) => this.corService.addCorToCollectionIfMissing<ICor>(cors, this.controleComanda?.cor)))
      .subscribe((cors: ICor[]) => (this.corsSharedCollection = cors));
  }
}
