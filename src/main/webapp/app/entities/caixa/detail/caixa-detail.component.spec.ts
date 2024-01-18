import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CaixaDetailComponent } from './caixa-detail.component';

describe('Caixa Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaixaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CaixaDetailComponent,
              resolve: { caixa: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CaixaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load caixa on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CaixaDetailComponent);

      // THEN
      expect(instance.caixa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
