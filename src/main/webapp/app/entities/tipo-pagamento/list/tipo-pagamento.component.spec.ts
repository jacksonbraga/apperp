import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoPagamentoService } from '../service/tipo-pagamento.service';

import { TipoPagamentoComponent } from './tipo-pagamento.component';

describe('TipoPagamento Management Component', () => {
  let comp: TipoPagamentoComponent;
  let fixture: ComponentFixture<TipoPagamentoComponent>;
  let service: TipoPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'tipo-pagamento', component: TipoPagamentoComponent }]),
        HttpClientTestingModule,
        TipoPagamentoComponent,
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
      .overrideTemplate(TipoPagamentoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoPagamentoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TipoPagamentoService);

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
    expect(comp.tipoPagamentos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to tipoPagamentoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTipoPagamentoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTipoPagamentoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
