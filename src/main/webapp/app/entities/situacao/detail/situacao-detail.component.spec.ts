import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SituacaoDetailComponent } from './situacao-detail.component';

describe('Situacao Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SituacaoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: SituacaoDetailComponent,
              resolve: { situacao: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(SituacaoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load situacao on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', SituacaoDetailComponent);

      // THEN
      expect(instance.situacao).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
