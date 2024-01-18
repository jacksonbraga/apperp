import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoCaixaDetailComponent } from './grupo-caixa-detail.component';

describe('GrupoCaixa Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoCaixaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: GrupoCaixaDetailComponent,
              resolve: { grupoCaixa: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(GrupoCaixaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load grupoCaixa on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GrupoCaixaDetailComponent);

      // THEN
      expect(instance.grupoCaixa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
