import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoCaixa, NewTipoCaixa } from '../tipo-caixa.model';

export type PartialUpdateTipoCaixa = Partial<ITipoCaixa> & Pick<ITipoCaixa, 'id'>;

export type EntityResponseType = HttpResponse<ITipoCaixa>;
export type EntityArrayResponseType = HttpResponse<ITipoCaixa[]>;

@Injectable({ providedIn: 'root' })
export class TipoCaixaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-caixas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tipoCaixa: NewTipoCaixa): Observable<EntityResponseType> {
    return this.http.post<ITipoCaixa>(this.resourceUrl, tipoCaixa, { observe: 'response' });
  }

  update(tipoCaixa: ITipoCaixa): Observable<EntityResponseType> {
    return this.http.put<ITipoCaixa>(`${this.resourceUrl}/${this.getTipoCaixaIdentifier(tipoCaixa)}`, tipoCaixa, { observe: 'response' });
  }

  partialUpdate(tipoCaixa: PartialUpdateTipoCaixa): Observable<EntityResponseType> {
    return this.http.patch<ITipoCaixa>(`${this.resourceUrl}/${this.getTipoCaixaIdentifier(tipoCaixa)}`, tipoCaixa, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoCaixa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoCaixa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTipoCaixaIdentifier(tipoCaixa: Pick<ITipoCaixa, 'id'>): number {
    return tipoCaixa.id;
  }

  compareTipoCaixa(o1: Pick<ITipoCaixa, 'id'> | null, o2: Pick<ITipoCaixa, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoCaixaIdentifier(o1) === this.getTipoCaixaIdentifier(o2) : o1 === o2;
  }

  addTipoCaixaToCollectionIfMissing<Type extends Pick<ITipoCaixa, 'id'>>(
    tipoCaixaCollection: Type[],
    ...tipoCaixasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoCaixas: Type[] = tipoCaixasToCheck.filter(isPresent);
    if (tipoCaixas.length > 0) {
      const tipoCaixaCollectionIdentifiers = tipoCaixaCollection.map(tipoCaixaItem => this.getTipoCaixaIdentifier(tipoCaixaItem)!);
      const tipoCaixasToAdd = tipoCaixas.filter(tipoCaixaItem => {
        const tipoCaixaIdentifier = this.getTipoCaixaIdentifier(tipoCaixaItem);
        if (tipoCaixaCollectionIdentifiers.includes(tipoCaixaIdentifier)) {
          return false;
        }
        tipoCaixaCollectionIdentifiers.push(tipoCaixaIdentifier);
        return true;
      });
      return [...tipoCaixasToAdd, ...tipoCaixaCollection];
    }
    return tipoCaixaCollection;
  }
}
