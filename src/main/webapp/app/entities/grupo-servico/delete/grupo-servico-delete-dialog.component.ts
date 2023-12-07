import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IGrupoServico } from '../grupo-servico.model';
import { GrupoServicoService } from '../service/grupo-servico.service';

@Component({
  standalone: true,
  templateUrl: './grupo-servico-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class GrupoServicoDeleteDialogComponent {
  grupoServico?: IGrupoServico;

  constructor(
    protected grupoServicoService: GrupoServicoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.grupoServicoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
