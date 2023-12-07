import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IItemComanda } from '../item-comanda.model';
import { ItemComandaService } from '../service/item-comanda.service';

@Component({
  standalone: true,
  templateUrl: './item-comanda-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ItemComandaDeleteDialogComponent {
  itemComanda?: IItemComanda;

  constructor(
    protected itemComandaService: ItemComandaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.itemComandaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
