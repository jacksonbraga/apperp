import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoPagamento, NewTipoPagamento } from '../tipo-pagamento.model';

export type PartialUpdateTipoPagamento = Partial<ITipoPagamento> & Pick<ITipoPagamento, 'id'>;

export type EntityResponseType = HttpResponse<ITipoPagamento>;
export type EntityArrayResponseType = HttpResponse<ITipoPagamento[]>;

@Injectable({ providedIn: 'root' })
export class TipoPagamentoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-pagamentos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tipoPagamento: NewTipoPagamento): Observable<EntityResponseType> {
    return this.http.post<ITipoPagamento>(this.resourceUrl, tipoPagamento, { observe: 'response' });
  }

  update(tipoPagamento: ITipoPagamento): Observable<EntityResponseType> {
    return this.http.put<ITipoPagamento>(`${this.resourceUrl}/${this.getTipoPagamentoIdentifier(tipoPagamento)}`, tipoPagamento, {
      observe: 'response',
    });
  }

  partialUpdate(tipoPagamento: PartialUpdateTipoPagamento): Observable<EntityResponseType> {
    return this.http.patch<ITipoPagamento>(`${this.resourceUrl}/${this.getTipoPagamentoIdentifier(tipoPagamento)}`, tipoPagamento, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoPagamento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoPagamento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTipoPagamentoIdentifier(tipoPagamento: Pick<ITipoPagamento, 'id'>): number {
    return tipoPagamento.id;
  }

  compareTipoPagamento(o1: Pick<ITipoPagamento, 'id'> | null, o2: Pick<ITipoPagamento, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoPagamentoIdentifier(o1) === this.getTipoPagamentoIdentifier(o2) : o1 === o2;
  }

  addTipoPagamentoToCollectionIfMissing<Type extends Pick<ITipoPagamento, 'id'>>(
    tipoPagamentoCollection: Type[],
    ...tipoPagamentosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoPagamentos: Type[] = tipoPagamentosToCheck.filter(isPresent);
    if (tipoPagamentos.length > 0) {
      const tipoPagamentoCollectionIdentifiers = tipoPagamentoCollection.map(
        tipoPagamentoItem => this.getTipoPagamentoIdentifier(tipoPagamentoItem)!,
      );
      const tipoPagamentosToAdd = tipoPagamentos.filter(tipoPagamentoItem => {
        const tipoPagamentoIdentifier = this.getTipoPagamentoIdentifier(tipoPagamentoItem);
        if (tipoPagamentoCollectionIdentifiers.includes(tipoPagamentoIdentifier)) {
          return false;
        }
        tipoPagamentoCollectionIdentifiers.push(tipoPagamentoIdentifier);
        return true;
      });
      return [...tipoPagamentosToAdd, ...tipoPagamentoCollection];
    }
    return tipoPagamentoCollection;
  }
}
