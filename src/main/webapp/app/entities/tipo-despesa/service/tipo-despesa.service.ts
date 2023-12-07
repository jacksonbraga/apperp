import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoDespesa, NewTipoDespesa } from '../tipo-despesa.model';

export type PartialUpdateTipoDespesa = Partial<ITipoDespesa> & Pick<ITipoDespesa, 'id'>;

export type EntityResponseType = HttpResponse<ITipoDespesa>;
export type EntityArrayResponseType = HttpResponse<ITipoDespesa[]>;

@Injectable({ providedIn: 'root' })
export class TipoDespesaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-despesas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tipoDespesa: NewTipoDespesa): Observable<EntityResponseType> {
    return this.http.post<ITipoDespesa>(this.resourceUrl, tipoDespesa, { observe: 'response' });
  }

  update(tipoDespesa: ITipoDespesa): Observable<EntityResponseType> {
    return this.http.put<ITipoDespesa>(`${this.resourceUrl}/${this.getTipoDespesaIdentifier(tipoDespesa)}`, tipoDespesa, {
      observe: 'response',
    });
  }

  partialUpdate(tipoDespesa: PartialUpdateTipoDespesa): Observable<EntityResponseType> {
    return this.http.patch<ITipoDespesa>(`${this.resourceUrl}/${this.getTipoDespesaIdentifier(tipoDespesa)}`, tipoDespesa, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoDespesa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoDespesa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTipoDespesaIdentifier(tipoDespesa: Pick<ITipoDespesa, 'id'>): number {
    return tipoDespesa.id;
  }

  compareTipoDespesa(o1: Pick<ITipoDespesa, 'id'> | null, o2: Pick<ITipoDespesa, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoDespesaIdentifier(o1) === this.getTipoDespesaIdentifier(o2) : o1 === o2;
  }

  addTipoDespesaToCollectionIfMissing<Type extends Pick<ITipoDespesa, 'id'>>(
    tipoDespesaCollection: Type[],
    ...tipoDespesasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoDespesas: Type[] = tipoDespesasToCheck.filter(isPresent);
    if (tipoDespesas.length > 0) {
      const tipoDespesaCollectionIdentifiers = tipoDespesaCollection.map(
        tipoDespesaItem => this.getTipoDespesaIdentifier(tipoDespesaItem)!,
      );
      const tipoDespesasToAdd = tipoDespesas.filter(tipoDespesaItem => {
        const tipoDespesaIdentifier = this.getTipoDespesaIdentifier(tipoDespesaItem);
        if (tipoDespesaCollectionIdentifiers.includes(tipoDespesaIdentifier)) {
          return false;
        }
        tipoDespesaCollectionIdentifiers.push(tipoDespesaIdentifier);
        return true;
      });
      return [...tipoDespesasToAdd, ...tipoDespesaCollection];
    }
    return tipoDespesaCollection;
  }
}
