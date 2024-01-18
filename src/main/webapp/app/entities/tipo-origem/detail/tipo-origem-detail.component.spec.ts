import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoOrigemDetailComponent } from './tipo-origem-detail.component';

describe('TipoOrigem Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoOrigemDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TipoOrigemDetailComponent,
              resolve: { tipoOrigem: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TipoOrigemDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tipoOrigem on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TipoOrigemDetailComponent);

      // THEN
      expect(instance.tipoOrigem).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
