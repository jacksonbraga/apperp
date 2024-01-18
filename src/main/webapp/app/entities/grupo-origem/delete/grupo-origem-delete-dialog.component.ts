import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IGrupoOrigem } from '../grupo-origem.model';
import { GrupoOrigemService } from '../service/grupo-origem.service';

@Component({
  standalone: true,
  templateUrl: './grupo-origem-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class GrupoOrigemDeleteDialogComponent {
  grupoOrigem?: IGrupoOrigem;

  constructor(
    protected grupoOrigemService: GrupoOrigemService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.grupoOrigemService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
