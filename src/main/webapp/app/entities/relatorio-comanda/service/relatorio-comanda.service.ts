import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRelatorioComanda } from '../relatorio-comanda.model';
import { IRelatorioControle4 } from '../relatorio-controle-conferencia.model';
import { IRelatorioValoresRecebidosResumo } from '../relatorio-controle-valores-recebidos-resumo.model';
import { IRelatorioControle } from '../relatorio-controle.model';
import { IRelatorioConferenciaExtrato } from '../relatorio-controle-conferencia-extrato.model';
import { IRelatorioConferenciaExtratoAcumulado } from '../relatorio-controle-conferencia-extrato-acumulado.model';
import { IRelatorioDespesa } from '../relatorio-despesas.model';

export type EntityResponseType = HttpResponse<IRelatorioComanda>;
export type EntityArrayResponseType = HttpResponse<IRelatorioComanda[]>;
export type EntityArrayResponseTypeControle = HttpResponse<IRelatorioControle[]>;
export type EntityArrayResponseTypeControle4 = HttpResponse<IRelatorioControle4[]>;
export type EntityArrayResponseTypeConferenciaExtrato = HttpResponse<IRelatorioConferenciaExtrato[]>;
export type EntityArrayResponseTypeConferenciaExtratoAcumulado = HttpResponse<IRelatorioConferenciaExtratoAcumulado[]>;

export type EntityArrayResponseTypeValoresRecebidosResumo = HttpResponse<IRelatorioValoresRecebidosResumo[]>;

export type EntityArrayResponseTypeTicketMedio = HttpResponse<IRelatorioValoresRecebidosResumo[]>;

export type EntityArrayResponseTypeDespesas = HttpResponse<IRelatorioDespesa[]>;

@Injectable({ providedIn: 'root' })
export class RelatorioComandaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/item-comandas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  query(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioComanda[]>(`${this.resourceUrl}/relatorio-controle-comanda/` + dataInicio + '/' + dataFim, {
      params: options,
      observe: 'response',
    });
  }

  queryControle(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseTypeControle> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioControle[]>(`${this.resourceUrl}/relatorio-controle/` + dataInicio + '/' + dataFim, {
      params: options,
      observe: 'response',
    });
  }

  queryControleValoresRecebidos(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseTypeControle> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioControle[]>(`${this.resourceUrl}/relatorio-controle-valores-recebidos/` + dataInicio + '/' + dataFim, {
      params: options,
      observe: 'response',
    });
  }

  queryControleValoresRecebidosResumo(
    dataInicio: string,
    dataFim: string,
    req?: any,
  ): Observable<EntityArrayResponseTypeValoresRecebidosResumo> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioValoresRecebidosResumo[]>(
      `${this.resourceUrl}/relatorio-controle-valores-recebidos-resumo/` + dataInicio + '/' + dataFim,
      {
        params: options,
        observe: 'response',
      },
    );
  }

  queryTicketMedio(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseTypeTicketMedio> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioValoresRecebidosResumo[]>(`${this.resourceUrl}/relatorio-ticket-medio/` + dataInicio + '/' + dataFim, {
      params: options,
      observe: 'response',
    });
  }

  queryDespesas(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseTypeDespesas> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioDespesa[]>(`${this.resourceUrl}/relatorio-despesas/` + dataInicio + '/' + dataFim, {
      params: options,
      observe: 'response',
    });
  }

  queryCaixa(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioComanda[]>(`${this.resourceUrl}/relatorio-caixa/` + dataInicio + '/' + dataFim, {
      params: options,
      observe: 'response',
    });
  }

  queryControleConferencia(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseTypeControle4> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioControle4[]>(`${this.resourceUrl}/relatorio-controle4/` + dataInicio + '/' + dataFim, {
      params: options,
      observe: 'response',
    });
  }

  queryConferenciaExtrato(dataInicio: string, dataFim: string, req?: any): Observable<EntityArrayResponseTypeConferenciaExtrato> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioConferenciaExtrato[]>(
      `${this.resourceUrl}/relatorio-conferencia-extrato/` + dataInicio + '/' + dataFim,
      {
        params: options,
        observe: 'response',
      },
    );
  }

  queryConferenciaExtratoAcumulado(
    dataInicio: string,
    dataFim: string,
    req?: any,
  ): Observable<EntityArrayResponseTypeConferenciaExtratoAcumulado> {
    const options = createRequestOption(req);

    return this.http.get<IRelatorioConferenciaExtratoAcumulado[]>(
      `${this.resourceUrl}/relatorio-conferencia-extrato-acumulado/` + dataInicio + '/' + dataFim,
      {
        params: options,
        observe: 'response',
      },
    );
  }
}
