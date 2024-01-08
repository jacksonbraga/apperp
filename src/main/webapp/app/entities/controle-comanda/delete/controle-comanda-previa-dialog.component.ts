import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { IControleComanda } from '../controle-comanda.model';
import { IControleComandaPrevia } from '../controle-comanda-previa.model';
import { FormatMediumDatePipe } from 'app/shared/date';
import { ControleComandaService } from '../service/controle-comanda.service';

@Component({
  standalone: true,
  templateUrl: './controle-comanda-previa-dialog.component.html',
  imports: [SharedModule, FormsModule, FormatMediumDatePipe],
})
export class ControleComandaPreviaDialogComponent implements OnInit {
  controleComanda?: IControleComanda;
  previaFechamento: IControleComandaPrevia[] = [];

  constructor(
    protected activeModal: NgbActiveModal,
    protected controleComandaService: ControleComandaService,
  ) {}

  ngOnInit(): void {
    this.controleComandaService.previa(this.controleComanda?.id).subscribe(res => {
      this.previaFechamento = res;
    });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmPrevia(id: number): void {
    this.controleComandaService.atualizaPrevia(this.controleComanda?.id).subscribe(res => {
      this.activeModal.close();
    });
  }

  protected getBackgroundColor(tipo: string | undefined | null): string {
    if (!tipo) {
      return '';
    } else if (tipo === 'ERRO') {
      return '#ff0000';
    } else if (tipo === 'ALERTA') {
      return '#0000ff';
    } else {
      return '';
    }
  }

  protected getFont(tipo: string | undefined | null): string {
    if (!tipo) {
      return '';
    } else if (tipo === 'ERRO') {
      return 'bold';
    } else if (tipo === 'ALERTA') {
      return 'bold';
    } else {
      return '';
    }
  }
}
