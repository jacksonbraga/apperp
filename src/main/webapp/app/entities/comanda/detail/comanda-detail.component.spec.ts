import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ComandaDetailComponent } from './comanda-detail.component';

describe('Comanda Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComandaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ComandaDetailComponent,
              resolve: { comanda: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ComandaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load comanda on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ComandaDetailComponent);

      // THEN
      expect(instance.comanda).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
