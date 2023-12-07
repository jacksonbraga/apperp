import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITipoDespesa } from '../tipo-despesa.model';

@Component({
  standalone: true,
  selector: 'jhi-tipo-despesa-detail',
  templateUrl: './tipo-despesa-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TipoDespesaDetailComponent {
  @Input() tipoDespesa: ITipoDespesa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
