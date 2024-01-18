import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITipoCaixa } from '../tipo-caixa.model';
import { TipoCaixaService } from '../service/tipo-caixa.service';

@Component({
  standalone: true,
  templateUrl: './tipo-caixa-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TipoCaixaDeleteDialogComponent {
  tipoCaixa?: ITipoCaixa;

  constructor(
    protected tipoCaixaService: TipoCaixaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoCaixaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
