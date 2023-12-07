import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IGrupoPagamento } from '../grupo-pagamento.model';
import { GrupoPagamentoService } from '../service/grupo-pagamento.service';

@Component({
  standalone: true,
  templateUrl: './grupo-pagamento-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class GrupoPagamentoDeleteDialogComponent {
  grupoPagamento?: IGrupoPagamento;

  constructor(
    protected grupoPagamentoService: GrupoPagamentoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.grupoPagamentoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
