import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DespesaDetailComponent } from './despesa-detail.component';

describe('Despesa Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DespesaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: DespesaDetailComponent,
              resolve: { despesa: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DespesaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load despesa on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DespesaDetailComponent);

      // THEN
      expect(instance.despesa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
