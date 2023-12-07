import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoDespesaService } from '../service/tipo-despesa.service';

import { TipoDespesaComponent } from './tipo-despesa.component';

describe('TipoDespesa Management Component', () => {
  let comp: TipoDespesaComponent;
  let fixture: ComponentFixture<TipoDespesaComponent>;
  let service: TipoDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'tipo-despesa', component: TipoDespesaComponent }]),
        HttpClientTestingModule,
        TipoDespesaComponent,
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
      .overrideTemplate(TipoDespesaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoDespesaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TipoDespesaService);

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
    expect(comp.tipoDespesas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to tipoDespesaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTipoDespesaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTipoDespesaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
