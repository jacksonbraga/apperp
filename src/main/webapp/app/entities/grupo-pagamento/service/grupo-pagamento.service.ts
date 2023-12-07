import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrupoPagamento, NewGrupoPagamento } from '../grupo-pagamento.model';

export type PartialUpdateGrupoPagamento = Partial<IGrupoPagamento> & Pick<IGrupoPagamento, 'id'>;

export type EntityResponseType = HttpResponse<IGrupoPagamento>;
export type EntityArrayResponseType = HttpResponse<IGrupoPagamento[]>;

@Injectable({ providedIn: 'root' })
export class GrupoPagamentoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grupo-pagamentos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(grupoPagamento: NewGrupoPagamento): Observable<EntityResponseType> {
    return this.http.post<IGrupoPagamento>(this.resourceUrl, grupoPagamento, { observe: 'response' });
  }

  update(grupoPagamento: IGrupoPagamento): Observable<EntityResponseType> {
    return this.http.put<IGrupoPagamento>(`${this.resourceUrl}/${this.getGrupoPagamentoIdentifier(grupoPagamento)}`, grupoPagamento, {
      observe: 'response',
    });
  }

  partialUpdate(grupoPagamento: PartialUpdateGrupoPagamento): Observable<EntityResponseType> {
    return this.http.patch<IGrupoPagamento>(`${this.resourceUrl}/${this.getGrupoPagamentoIdentifier(grupoPagamento)}`, grupoPagamento, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrupoPagamento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrupoPagamento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGrupoPagamentoIdentifier(grupoPagamento: Pick<IGrupoPagamento, 'id'>): number {
    return grupoPagamento.id;
  }

  compareGrupoPagamento(o1: Pick<IGrupoPagamento, 'id'> | null, o2: Pick<IGrupoPagamento, 'id'> | null): boolean {
    return o1 && o2 ? this.getGrupoPagamentoIdentifier(o1) === this.getGrupoPagamentoIdentifier(o2) : o1 === o2;
  }

  addGrupoPagamentoToCollectionIfMissing<Type extends Pick<IGrupoPagamento, 'id'>>(
    grupoPagamentoCollection: Type[],
    ...grupoPagamentosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const grupoPagamentos: Type[] = grupoPagamentosToCheck.filter(isPresent);
    if (grupoPagamentos.length > 0) {
      const grupoPagamentoCollectionIdentifiers = grupoPagamentoCollection.map(
        grupoPagamentoItem => this.getGrupoPagamentoIdentifier(grupoPagamentoItem)!,
      );
      const grupoPagamentosToAdd = grupoPagamentos.filter(grupoPagamentoItem => {
        const grupoPagamentoIdentifier = this.getGrupoPagamentoIdentifier(grupoPagamentoItem);
        if (grupoPagamentoCollectionIdentifiers.includes(grupoPagamentoIdentifier)) {
          return false;
        }
        grupoPagamentoCollectionIdentifiers.push(grupoPagamentoIdentifier);
        return true;
      });
      return [...grupoPagamentosToAdd, ...grupoPagamentoCollection];
    }
    return grupoPagamentoCollection;
  }
}
