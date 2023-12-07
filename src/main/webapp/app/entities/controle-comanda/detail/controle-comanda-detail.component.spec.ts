import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ControleComandaDetailComponent } from './controle-comanda-detail.component';

describe('ControleComanda Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleComandaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ControleComandaDetailComponent,
              resolve: { controleComanda: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ControleComandaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load controleComanda on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ControleComandaDetailComponent);

      // THEN
      expect(instance.controleComanda).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
