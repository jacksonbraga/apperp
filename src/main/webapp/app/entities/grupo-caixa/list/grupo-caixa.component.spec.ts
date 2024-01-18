import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GrupoCaixaService } from '../service/grupo-caixa.service';

import { GrupoCaixaComponent } from './grupo-caixa.component';

describe('GrupoCaixa Management Component', () => {
  let comp: GrupoCaixaComponent;
  let fixture: ComponentFixture<GrupoCaixaComponent>;
  let service: GrupoCaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'grupo-caixa', component: GrupoCaixaComponent }]),
        HttpClientTestingModule,
        GrupoCaixaComponent,
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
      .overrideTemplate(GrupoCaixaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoCaixaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GrupoCaixaService);

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
    expect(comp.grupoCaixas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to grupoCaixaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getGrupoCaixaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getGrupoCaixaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
