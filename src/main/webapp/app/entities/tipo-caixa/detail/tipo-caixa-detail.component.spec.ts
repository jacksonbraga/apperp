import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoCaixaDetailComponent } from './tipo-caixa-detail.component';

describe('TipoCaixa Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoCaixaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TipoCaixaDetailComponent,
              resolve: { tipoCaixa: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TipoCaixaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tipoCaixa on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TipoCaixaDetailComponent);

      // THEN
      expect(instance.tipoCaixa).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
