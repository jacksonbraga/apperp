import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IComanda } from '../comanda.model';
import { ComandaService } from '../service/comanda.service';

@Component({
  standalone: true,
  templateUrl: './comanda-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ComandaDeleteDialogComponent {
  comanda?: IComanda;

  constructor(
    protected comandaService: ComandaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.comandaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
