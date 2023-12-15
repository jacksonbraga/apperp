import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRelatorio } from '../relatorio.model';

export type EntityResponseType = HttpResponse<IRelatorio>;
export type EntityArrayResponseType = HttpResponse<IRelatorio[]>;

@Injectable({ providedIn: 'root' })
export class RelatorioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/item-comandas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  query(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorio[]>(`${this.resourceUrl}/relatorio/` + dataInicio + '/' + dataFim, {
      params: options,
      observe: 'response',
    });
  }
}
