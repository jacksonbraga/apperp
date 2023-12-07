import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICor } from '../cor.model';
import { CorService } from '../service/cor.service';

@Component({
  standalone: true,
  templateUrl: './cor-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CorDeleteDialogComponent {
  cor?: ICor;

  constructor(
    protected corService: CorService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.corService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
