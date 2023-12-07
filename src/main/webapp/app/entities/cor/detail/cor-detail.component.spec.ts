import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CorDetailComponent } from './cor-detail.component';

describe('Cor Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CorDetailComponent,
              resolve: { cor: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CorDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load cor on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CorDetailComponent);

      // THEN
      expect(instance.cor).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
