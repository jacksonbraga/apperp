import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrupoDespesa, NewGrupoDespesa } from '../grupo-despesa.model';

export type PartialUpdateGrupoDespesa = Partial<IGrupoDespesa> & Pick<IGrupoDespesa, 'id'>;

export type EntityResponseType = HttpResponse<IGrupoDespesa>;
export type EntityArrayResponseType = HttpResponse<IGrupoDespesa[]>;

@Injectable({ providedIn: 'root' })
export class GrupoDespesaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grupo-despesas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(grupoDespesa: NewGrupoDespesa): Observable<EntityResponseType> {
    return this.http.post<IGrupoDespesa>(this.resourceUrl, grupoDespesa, { observe: 'response' });
  }

  update(grupoDespesa: IGrupoDespesa): Observable<EntityResponseType> {
    return this.http.put<IGrupoDespesa>(`${this.resourceUrl}/${this.getGrupoDespesaIdentifier(grupoDespesa)}`, grupoDespesa, {
      observe: 'response',
    });
  }

  partialUpdate(grupoDespesa: PartialUpdateGrupoDespesa): Observable<EntityResponseType> {
    return this.http.patch<IGrupoDespesa>(`${this.resourceUrl}/${this.getGrupoDespesaIdentifier(grupoDespesa)}`, grupoDespesa, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrupoDespesa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrupoDespesa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGrupoDespesaIdentifier(grupoDespesa: Pick<IGrupoDespesa, 'id'>): number {
    return grupoDespesa.id;
  }

  compareGrupoDespesa(o1: Pick<IGrupoDespesa, 'id'> | null, o2: Pick<IGrupoDespesa, 'id'> | null): boolean {
    return o1 && o2 ? this.getGrupoDespesaIdentifier(o1) === this.getGrupoDespesaIdentifier(o2) : o1 === o2;
  }

  addGrupoDespesaToCollectionIfMissing<Type extends Pick<IGrupoDespesa, 'id'>>(
    grupoDespesaCollection: Type[],
    ...grupoDespesasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const grupoDespesas: Type[] = grupoDespesasToCheck.filter(isPresent);
    if (grupoDespesas.length > 0) {
      const grupoDespesaCollectionIdentifiers = grupoDespesaCollection.map(
        grupoDespesaItem => this.getGrupoDespesaIdentifier(grupoDespesaItem)!,
      );
      const grupoDespesasToAdd = grupoDespesas.filter(grupoDespesaItem => {
        const grupoDespesaIdentifier = this.getGrupoDespesaIdentifier(grupoDespesaItem);
        if (grupoDespesaCollectionIdentifiers.includes(grupoDespesaIdentifier)) {
          return false;
        }
        grupoDespesaCollectionIdentifiers.push(grupoDespesaIdentifier);
        return true;
      });
      return [...grupoDespesasToAdd, ...grupoDespesaCollection];
    }
    return grupoDespesaCollection;
  }
}
