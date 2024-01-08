import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRelatorioComanda } from '../relatorio-comanda.model';

export type EntityResponseType = HttpResponse<IRelatorioComanda>;
export type EntityArrayResponseType = HttpResponse<IRelatorioComanda[]>;

@Injectable({ providedIn: 'root' })
export class RelatorioComandaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/item-comandas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  query(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioComanda[]>(`${this.resourceUrl}/relatorio-comanda/` + dataInicio + '/' + dataFim, {
      params: options,
      observe: 'response',
    });
  }
}
