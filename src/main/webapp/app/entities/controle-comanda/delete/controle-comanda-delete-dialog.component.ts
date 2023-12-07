import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IControleComanda } from '../controle-comanda.model';
import { ControleComandaService } from '../service/controle-comanda.service';

@Component({
  standalone: true,
  templateUrl: './controle-comanda-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ControleComandaDeleteDialogComponent {
  controleComanda?: IControleComanda;

  constructor(
    protected controleComandaService: ControleComandaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.controleComandaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
