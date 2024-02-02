import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITipoCaixa } from 'app/entities/tipo-caixa/tipo-caixa.model';
import { TipoCaixaService } from 'app/entities/tipo-caixa/service/tipo-caixa.service';
import { ITipoOrigem } from 'app/entities/tipo-origem/tipo-origem.model';
import { TipoOrigemService } from 'app/entities/tipo-origem/service/tipo-origem.service';
import { CaixaService } from '../service/caixa.service';
import { ICaixa } from '../caixa.model';
import { CaixaFormService, CaixaFormGroup } from './caixa-form.service';
import { NgxCurrencyDirective } from 'ngx-currency';
import dayjs from 'dayjs/esm';

@Component({
  standalone: true,
  selector: 'jhi-caixa-update',
  templateUrl: './caixa-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule, NgxCurrencyDirective],
})
export class CaixaUpdateComponent implements OnInit {
  isSaving = false;
  caixa: ICaixa | null = null;

  tipoCaixasCollection: ITipoCaixa[] = [];
  tipoOrigemsCollection: ITipoOrigem[] = [];

  editForm: CaixaFormGroup = this.caixaFormService.createCaixaFormGroup();

  constructor(
    protected caixaService: CaixaService,
    protected caixaFormService: CaixaFormService,
    protected tipoCaixaService: TipoCaixaService,
    protected tipoOrigemService: TipoOrigemService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTipoCaixa = (o1: ITipoCaixa | null, o2: ITipoCaixa | null): boolean => this.tipoCaixaService.compareTipoCaixa(o1, o2);

  compareTipoOrigem = (o1: ITipoOrigem | null, o2: ITipoOrigem | null): boolean => this.tipoOrigemService.compareTipoOrigem(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ caixa }) => {
      this.caixa = caixa;
      if (caixa) {
        this.updateForm(caixa);
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
    const caixa = this.caixaFormService.getCaixa(this.editForm);
    if (caixa.id !== null) {
      this.subscribeToSaveResponse(this.caixaService.update(caixa));
    } else {
      this.subscribeToSaveResponse(this.caixaService.create(caixa));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICaixa>>): void {
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

  protected updateForm(caixa: ICaixa): void {
    this.caixa = caixa;
    this.caixaFormService.resetForm(this.editForm, caixa);

    this.tipoCaixasCollection = this.tipoCaixaService.addTipoCaixaToCollectionIfMissing<ITipoCaixa>(
      this.tipoCaixasCollection,
      caixa.tipoCaixa,
    );
    this.tipoOrigemsCollection = this.tipoOrigemService.addTipoOrigemToCollectionIfMissing<ITipoOrigem>(
      this.tipoOrigemsCollection,
      caixa.tipoOrigem,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoCaixaService
      .query({ filter: 'caixa-is-null' })
      .pipe(map((res: HttpResponse<ITipoCaixa[]>) => res.body ?? []))
      .pipe(
        map((tipoCaixas: ITipoCaixa[]) =>
          this.tipoCaixaService.addTipoCaixaToCollectionIfMissing<ITipoCaixa>(tipoCaixas, this.caixa?.tipoCaixa),
        ),
      )
      .subscribe((tipoCaixas: ITipoCaixa[]) => (this.tipoCaixasCollection = tipoCaixas));

    this.tipoOrigemService
      .query({ filter: 'caixa-is-null' })
      .pipe(map((res: HttpResponse<ITipoOrigem[]>) => res.body ?? []))
      .pipe(
        map((tipoOrigems: ITipoOrigem[]) =>
          this.tipoOrigemService.addTipoOrigemToCollectionIfMissing<ITipoOrigem>(tipoOrigems, this.caixa?.tipoOrigem),
        ),
      )
      .subscribe((tipoOrigems: ITipoOrigem[]) => (this.tipoOrigemsCollection = tipoOrigems));
  }
}
