import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoOrigemDetailComponent } from './grupo-origem-detail.component';

describe('GrupoOrigem Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoOrigemDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: GrupoOrigemDetailComponent,
              resolve: { grupoOrigem: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(GrupoOrigemDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load grupoOrigem on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GrupoOrigemDetailComponent);

      // THEN
      expect(instance.grupoOrigem).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
