import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrupoCaixa, NewGrupoCaixa } from '../grupo-caixa.model';

export type PartialUpdateGrupoCaixa = Partial<IGrupoCaixa> & Pick<IGrupoCaixa, 'id'>;

export type EntityResponseType = HttpResponse<IGrupoCaixa>;
export type EntityArrayResponseType = HttpResponse<IGrupoCaixa[]>;

@Injectable({ providedIn: 'root' })
export class GrupoCaixaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grupo-caixas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(grupoCaixa: NewGrupoCaixa): Observable<EntityResponseType> {
    return this.http.post<IGrupoCaixa>(this.resourceUrl, grupoCaixa, { observe: 'response' });
  }

  update(grupoCaixa: IGrupoCaixa): Observable<EntityResponseType> {
    return this.http.put<IGrupoCaixa>(`${this.resourceUrl}/${this.getGrupoCaixaIdentifier(grupoCaixa)}`, grupoCaixa, {
      observe: 'response',
    });
  }

  partialUpdate(grupoCaixa: PartialUpdateGrupoCaixa): Observable<EntityResponseType> {
    return this.http.patch<IGrupoCaixa>(`${this.resourceUrl}/${this.getGrupoCaixaIdentifier(grupoCaixa)}`, grupoCaixa, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrupoCaixa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrupoCaixa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGrupoCaixaIdentifier(grupoCaixa: Pick<IGrupoCaixa, 'id'>): number {
    return grupoCaixa.id;
  }

  compareGrupoCaixa(o1: Pick<IGrupoCaixa, 'id'> | null, o2: Pick<IGrupoCaixa, 'id'> | null): boolean {
    return o1 && o2 ? this.getGrupoCaixaIdentifier(o1) === this.getGrupoCaixaIdentifier(o2) : o1 === o2;
  }

  addGrupoCaixaToCollectionIfMissing<Type extends Pick<IGrupoCaixa, 'id'>>(
    grupoCaixaCollection: Type[],
    ...grupoCaixasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const grupoCaixas: Type[] = grupoCaixasToCheck.filter(isPresent);
    if (grupoCaixas.length > 0) {
      const grupoCaixaCollectionIdentifiers = grupoCaixaCollection.map(grupoCaixaItem => this.getGrupoCaixaIdentifier(grupoCaixaItem)!);
      const grupoCaixasToAdd = grupoCaixas.filter(grupoCaixaItem => {
        const grupoCaixaIdentifier = this.getGrupoCaixaIdentifier(grupoCaixaItem);
        if (grupoCaixaCollectionIdentifiers.includes(grupoCaixaIdentifier)) {
          return false;
        }
        grupoCaixaCollectionIdentifiers.push(grupoCaixaIdentifier);
        return true;
      });
      return [...grupoCaixasToAdd, ...grupoCaixaCollection];
    }
    return grupoCaixaCollection;
  }
}
