import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IGrupoCaixa } from '../grupo-caixa.model';
import { GrupoCaixaService } from '../service/grupo-caixa.service';

@Component({
  standalone: true,
  templateUrl: './grupo-caixa-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class GrupoCaixaDeleteDialogComponent {
  grupoCaixa?: IGrupoCaixa;

  constructor(
    protected grupoCaixaService: GrupoCaixaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.grupoCaixaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
