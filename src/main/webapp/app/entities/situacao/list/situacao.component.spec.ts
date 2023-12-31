import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SituacaoService } from '../service/situacao.service';

import { SituacaoComponent } from './situacao.component';

describe('Situacao Management Component', () => {
  let comp: SituacaoComponent;
  let fixture: ComponentFixture<SituacaoComponent>;
  let service: SituacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'situacao', component: SituacaoComponent }]),
        HttpClientTestingModule,
        SituacaoComponent,
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
      .overrideTemplate(SituacaoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SituacaoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SituacaoService);

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
    expect(comp.situacaos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to situacaoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getSituacaoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getSituacaoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
