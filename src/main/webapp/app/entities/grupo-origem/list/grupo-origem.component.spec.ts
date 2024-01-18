import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoOrigemService } from '../service/grupo-origem.service';

import { GrupoOrigemComponent } from './grupo-origem.component';

describe('GrupoOrigem Management Component', () => {
  let comp: GrupoOrigemComponent;
  let fixture: ComponentFixture<GrupoOrigemComponent>;
  let service: GrupoOrigemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'grupo-origem', component: GrupoOrigemComponent }]),
        HttpClientTestingModule,
        GrupoOrigemComponent,
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
      .overrideTemplate(GrupoOrigemComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoOrigemComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GrupoOrigemService);

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
    expect(comp.grupoOrigems?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to grupoOrigemService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getGrupoOrigemIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getGrupoOrigemIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
