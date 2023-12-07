import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoServicoDetailComponent } from './tipo-servico-detail.component';

describe('TipoServico Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoServicoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TipoServicoDetailComponent,
              resolve: { tipoServico: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TipoServicoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tipoServico on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TipoServicoDetailComponent);

      // THEN
      expect(instance.tipoServico).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
