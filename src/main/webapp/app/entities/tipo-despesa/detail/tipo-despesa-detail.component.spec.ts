import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoDespesaDetailComponent } from './tipo-despesa-detail.component';

describe('TipoDespesa Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDespesaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TipoDespesaDetailComponent,
              resolve: { tipoDespesa: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TipoDespesaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tipoDespesa on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TipoDespesaDetailComponent);

      // THEN
      expect(instance.tipoDespesa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
