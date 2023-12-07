import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IGrupoDespesa } from '../grupo-despesa.model';

@Component({
  standalone: true,
  selector: 'jhi-grupo-despesa-detail',
  templateUrl: './grupo-despesa-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class GrupoDespesaDetailComponent {
  @Input() grupoDespesa: IGrupoDespesa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
