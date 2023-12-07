import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITipoServico } from '../tipo-servico.model';
import { TipoServicoService } from '../service/tipo-servico.service';

@Component({
  standalone: true,
  templateUrl: './tipo-servico-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TipoServicoDeleteDialogComponent {
  tipoServico?: ITipoServico;

  constructor(
    protected tipoServicoService: TipoServicoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoServicoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
