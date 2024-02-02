import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITipoDespesa } from 'app/entities/tipo-despesa/tipo-despesa.model';
import { TipoDespesaService } from 'app/entities/tipo-despesa/service/tipo-despesa.service';
import { IDespesa } from '../despesa.model';
import { DespesaService } from '../service/despesa.service';
import { DespesaFormService, DespesaFormGroup } from './despesa-form.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import dayjs, { Dayjs } from 'dayjs/esm';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  standalone: true,
  selector: 'jhi-despesa-update',
  templateUrl: './despesa-update.component.html',
  styleUrls: ['./despesa-update.component.css'],
  imports: [
    NgxCurrencyDirective,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
  ],
})
export class DespesaUpdateComponent implements OnInit {
  isSaving = false;
  despesa: IDespesa | null = null;
  mensagem = '';
  tipoDespesasSharedCollection: ITipoDespesa[] = [];

  numeroParcelas: number | null | undefined = 0;
  valorParcela: number | null | undefined = 0;
  dataVencimento: Dayjs | null | undefined = null;

  editForm: DespesaFormGroup = this.despesaFormService.createDespesaFormGroup();

  constructor(
    protected despesaService: DespesaService,
    protected despesaFormService: DespesaFormService,
    protected tipoDespesaService: TipoDespesaService,
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
  ) {}

  compareTipoDespesa = (o1: ITipoDespesa | null, o2: ITipoDespesa | null): boolean => this.tipoDespesaService.compareTipoDespesa(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ despesa }) => {
      this.despesa = despesa;
      if (despesa) {
        this.updateForm(despesa);
      } else {
        this.editForm.get('data')?.setValue(dayjs());
      }
      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(content: any): void {
    this.isSaving = true;
    const despesa = this.despesaFormService.getDespesa(this.editForm);
    if (despesa.id !== null) {
      this.subscribeToSaveResponse(this.despesaService.update(despesa));
    } else {
      const parcela = despesa.parcela;
      const totalParcela = despesa.totalParcela;
      if (parcela && totalParcela) {
        if (parcela < totalParcela) {
          this.numeroParcelas = totalParcela - parcela + 1;
          this.valorParcela = despesa.valor;
          this.dataVencimento = despesa.dataVencimento;
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            result => {
              this.subscribeToSaveResponse(this.despesaService.create(despesa));
            },
            reason => {},
          );
        } else {
          this.subscribeToSaveResponse(this.despesaService.create(despesa));
        }
      } else {
        this.subscribeToSaveResponse(this.despesaService.create(despesa));
      }
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDespesa>>): void {
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

  protected updateForm(despesa: IDespesa): void {
    this.despesa = despesa;
    this.despesaFormService.resetForm(this.editForm, despesa);

    this.tipoDespesasSharedCollection = this.tipoDespesaService.addTipoDespesaToCollectionIfMissing<ITipoDespesa>(
      this.tipoDespesasSharedCollection,
      despesa.tipoDespesa,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoDespesaService
      .query()
      .pipe(map((res: HttpResponse<ITipoDespesa[]>) => res.body ?? []))
      .pipe(
        map((tipoDespesas: ITipoDespesa[]) =>
          this.tipoDespesaService.addTipoDespesaToCollectionIfMissing<ITipoDespesa>(tipoDespesas, this.despesa?.tipoDespesa),
        ),
      )
      .subscribe((tipoDespesas: ITipoDespesa[]) => (this.tipoDespesasSharedCollection = tipoDespesas));
  }
}
