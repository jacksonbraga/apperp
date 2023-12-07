import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoPagamentoDetailComponent } from './grupo-pagamento-detail.component';

describe('GrupoPagamento Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoPagamentoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: GrupoPagamentoDetailComponent,
              resolve: { grupoPagamento: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(GrupoPagamentoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load grupoPagamento on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GrupoPagamentoDetailComponent);

      // THEN
      expect(instance.grupoPagamento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
