import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoPagamentoService } from '../service/grupo-pagamento.service';

import { GrupoPagamentoComponent } from './grupo-pagamento.component';

describe('GrupoPagamento Management Component', () => {
  let comp: GrupoPagamentoComponent;
  let fixture: ComponentFixture<GrupoPagamentoComponent>;
  let service: GrupoPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'grupo-pagamento', component: GrupoPagamentoComponent }]),
        HttpClientTestingModule,
        GrupoPagamentoComponent,
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
      .overrideTemplate(GrupoPagamentoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoPagamentoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GrupoPagamentoService);

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
    expect(comp.grupoPagamentos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to grupoPagamentoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getGrupoPagamentoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getGrupoPagamentoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
