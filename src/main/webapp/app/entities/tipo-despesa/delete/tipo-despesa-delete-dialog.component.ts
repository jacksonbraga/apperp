import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITipoDespesa } from '../tipo-despesa.model';
import { TipoDespesaService } from '../service/tipo-despesa.service';

@Component({
  standalone: true,
  templateUrl: './tipo-despesa-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TipoDespesaDeleteDialogComponent {
  tipoDespesa?: ITipoDespesa;

  constructor(
    protected tipoDespesaService: TipoDespesaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoDespesaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
