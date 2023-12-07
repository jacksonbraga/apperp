import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoServicoDetailComponent } from './grupo-servico-detail.component';

describe('GrupoServico Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoServicoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: GrupoServicoDetailComponent,
              resolve: { grupoServico: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(GrupoServicoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load grupoServico on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GrupoServicoDetailComponent);

      // THEN
      expect(instance.grupoServico).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
