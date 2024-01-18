import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITipoOrigem } from '../tipo-origem.model';
import { TipoOrigemService } from '../service/tipo-origem.service';

@Component({
  standalone: true,
  templateUrl: './tipo-origem-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TipoOrigemDeleteDialogComponent {
  tipoOrigem?: ITipoOrigem;

  constructor(
    protected tipoOrigemService: TipoOrigemService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoOrigemService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
