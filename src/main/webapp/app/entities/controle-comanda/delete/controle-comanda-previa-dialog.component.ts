import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IControleComanda } from '../controle-comanda.model';
import { ControleComandaService } from '../service/controle-comanda.service';
import { IControleComandaPrevia } from '../controle-comanda-previa.model';

@Component({
  standalone: true,
  templateUrl: './controle-comanda-previa-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ControleComandaPreviaDialogComponent {
  controleComanda?: IControleComanda;
  previaFechamento: IControleComandaPrevia[] = [];

  mensagem: string = 'TESTE JACKSON FRONTENDA';

  constructor(
    protected controleComandaService: ControleComandaService,
    protected activeModal: NgbActiveModal,
  ) {
    const previa: IControleComandaPrevia = { descricao: 'TESTE' };

    this.previaFechamento.push(previa);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmPrevia(id: number): void {
    this.controleComandaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
