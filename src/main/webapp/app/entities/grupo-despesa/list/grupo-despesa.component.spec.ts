import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoDespesaService } from '../service/grupo-despesa.service';

import { GrupoDespesaComponent } from './grupo-despesa.component';

describe('GrupoDespesa Management Component', () => {
  let comp: GrupoDespesaComponent;
  let fixture: ComponentFixture<GrupoDespesaComponent>;
  let service: GrupoDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'grupo-despesa', component: GrupoDespesaComponent }]),
        HttpClientTestingModule,
        GrupoDespesaComponent,
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
      .overrideTemplate(GrupoDespesaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoDespesaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GrupoDespesaService);

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
    expect(comp.grupoDespesas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to grupoDespesaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getGrupoDespesaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getGrupoDespesaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
