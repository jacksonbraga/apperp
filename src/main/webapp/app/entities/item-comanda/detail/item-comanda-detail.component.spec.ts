import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ItemComandaDetailComponent } from './item-comanda-detail.component';

describe('ItemComanda Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComandaDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ItemComandaDetailComponent,
              resolve: { itemComanda: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ItemComandaDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load itemComanda on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ItemComandaDetailComponent);

      // THEN
      expect(instance.itemComanda).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
