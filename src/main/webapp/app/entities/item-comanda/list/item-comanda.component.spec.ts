import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ItemComandaService } from '../service/item-comanda.service';

import { ItemComandaComponent } from './item-comanda.component';

describe('ItemComanda Management Component', () => {
  let comp: ItemComandaComponent;
  let fixture: ComponentFixture<ItemComandaComponent>;
  let service: ItemComandaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'item-comanda', component: ItemComandaComponent }]),
        HttpClientTestingModule,
        ItemComandaComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
                'filter[someId.in]': 'dc4279ea-cfb9-11ec-9d64-0242ac120002',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ItemComandaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ItemComandaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ItemComandaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.itemComandas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to itemComandaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getItemComandaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getItemComandaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
