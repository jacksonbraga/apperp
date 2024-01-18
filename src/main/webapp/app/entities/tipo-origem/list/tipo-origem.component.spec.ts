import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoOrigemService } from '../service/tipo-origem.service';

import { TipoOrigemComponent } from './tipo-origem.component';

describe('TipoOrigem Management Component', () => {
  let comp: TipoOrigemComponent;
  let fixture: ComponentFixture<TipoOrigemComponent>;
  let service: TipoOrigemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'tipo-origem', component: TipoOrigemComponent }]),
        HttpClientTestingModule,
        TipoOrigemComponent,
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
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(TipoOrigemComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoOrigemComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TipoOrigemService);

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
    expect(comp.tipoOrigems?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to tipoOrigemService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTipoOrigemIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTipoOrigemIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
