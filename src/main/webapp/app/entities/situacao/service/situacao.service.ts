import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISituacao, NewSituacao } from '../situacao.model';

export type PartialUpdateSituacao = Partial<ISituacao> & Pick<ISituacao, 'id'>;

export type EntityResponseType = HttpResponse<ISituacao>;
export type EntityArrayResponseType = HttpResponse<ISituacao[]>;

@Injectable({ providedIn: 'root' })
export class SituacaoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/situacaos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(situacao: NewSituacao): Observable<EntityResponseType> {
    return this.http.post<ISituacao>(this.resourceUrl, situacao, { observe: 'response' });
  }

  update(situacao: ISituacao): Observable<EntityResponseType> {
    return this.http.put<ISituacao>(`${this.resourceUrl}/${this.getSituacaoIdentifier(situacao)}`, situacao, { observe: 'response' });
  }

  partialUpdate(situacao: PartialUpdateSituacao): Observable<EntityResponseType> {
    return this.http.patch<ISituacao>(`${this.resourceUrl}/${this.getSituacaoIdentifier(situacao)}`, situacao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISituacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISituacao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSituacaoIdentifier(situacao: Pick<ISituacao, 'id'>): number {
    return situacao.id;
  }

  compareSituacao(o1: Pick<ISituacao, 'id'> | null, o2: Pick<ISituacao, 'id'> | null): boolean {
    return o1 && o2 ? this.getSituacaoIdentifier(o1) === this.getSituacaoIdentifier(o2) : o1 === o2;
  }

  addSituacaoToCollectionIfMissing<Type extends Pick<ISituacao, 'id'>>(
    situacaoCollection: Type[],
    ...situacaosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const situacaos: Type[] = situacaosToCheck.filter(isPresent);
    if (situacaos.length > 0) {
      const situacaoCollectionIdentifiers = situacaoCollection.map(situacaoItem => this.getSituacaoIdentifier(situacaoItem)!);
      const situacaosToAdd = situacaos.filter(situacaoItem => {
        const situacaoIdentifier = this.getSituacaoIdentifier(situacaoItem);
        if (situacaoCollectionIdentifiers.includes(situacaoIdentifier)) {
          return false;
        }
        situacaoCollectionIdentifiers.push(situacaoIdentifier);
        return true;
      });
      return [...situacaosToAdd, ...situacaoCollection];
    }
    return situacaoCollection;
  }
}
