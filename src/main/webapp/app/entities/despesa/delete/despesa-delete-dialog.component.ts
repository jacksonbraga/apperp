import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDespesa } from '../despesa.model';
import { DespesaService } from '../service/despesa.service';

@Component({
  standalone: true,
  templateUrl: './despesa-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DespesaDeleteDialogComponent {
  despesa?: IDespesa;

  constructor(
    protected despesaService: DespesaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.despesaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
