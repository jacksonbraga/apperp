import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoDespesaDetailComponent } from './grupo-despesa-detail.component';

describe('GrupoDespesa Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoDespesaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: GrupoDespesaDetailComponent,
              resolve: { grupoDespesa: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(GrupoDespesaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load grupoDespesa on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GrupoDespesaDetailComponent);

      // THEN
      expect(instance.grupoDespesa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
