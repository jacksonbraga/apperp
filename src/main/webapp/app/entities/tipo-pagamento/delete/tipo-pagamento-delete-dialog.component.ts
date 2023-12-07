import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITipoPagamento } from '../tipo-pagamento.model';
import { TipoPagamentoService } from '../service/tipo-pagamento.service';

@Component({
  standalone: true,
  templateUrl: './tipo-pagamento-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TipoPagamentoDeleteDialogComponent {
  tipoPagamento?: ITipoPagamento;

  constructor(
    protected tipoPagamentoService: TipoPagamentoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoPagamentoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
