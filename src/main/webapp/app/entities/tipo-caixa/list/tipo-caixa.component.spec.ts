import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoCaixaService } from '../service/tipo-caixa.service';

import { TipoCaixaComponent } from './tipo-caixa.component';

describe('TipoCaixa Management Component', () => {
  let comp: TipoCaixaComponent;
  let fixture: ComponentFixture<TipoCaixaComponent>;
  let service: TipoCaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'tipo-caixa', component: TipoCaixaComponent }]),
        HttpClientTestingModule,
        TipoCaixaComponent,
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
      .overrideTemplate(TipoCaixaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoCaixaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TipoCaixaService);

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
    expect(comp.tipoCaixas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to tipoCaixaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTipoCaixaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTipoCaixaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
