import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoServicoService } from '../service/grupo-servico.service';

import { GrupoServicoComponent } from './grupo-servico.component';

describe('GrupoServico Management Component', () => {
  let comp: GrupoServicoComponent;
  let fixture: ComponentFixture<GrupoServicoComponent>;
  let service: GrupoServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'grupo-servico', component: GrupoServicoComponent }]),
        HttpClientTestingModule,
        GrupoServicoComponent,
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
      .overrideTemplate(GrupoServicoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoServicoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GrupoServicoService);

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
    expect(comp.grupoServicos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to grupoServicoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getGrupoServicoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getGrupoServicoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
