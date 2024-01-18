import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrupoOrigem, NewGrupoOrigem } from '../grupo-origem.model';

export type PartialUpdateGrupoOrigem = Partial<IGrupoOrigem> & Pick<IGrupoOrigem, 'id'>;

export type EntityResponseType = HttpResponse<IGrupoOrigem>;
export type EntityArrayResponseType = HttpResponse<IGrupoOrigem[]>;

@Injectable({ providedIn: 'root' })
export class GrupoOrigemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grupo-origems');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(grupoOrigem: NewGrupoOrigem): Observable<EntityResponseType> {
    return this.http.post<IGrupoOrigem>(this.resourceUrl, grupoOrigem, { observe: 'response' });
  }

  update(grupoOrigem: IGrupoOrigem): Observable<EntityResponseType> {
    return this.http.put<IGrupoOrigem>(`${this.resourceUrl}/${this.getGrupoOrigemIdentifier(grupoOrigem)}`, grupoOrigem, {
      observe: 'response',
    });
  }

  partialUpdate(grupoOrigem: PartialUpdateGrupoOrigem): Observable<EntityResponseType> {
    return this.http.patch<IGrupoOrigem>(`${this.resourceUrl}/${this.getGrupoOrigemIdentifier(grupoOrigem)}`, grupoOrigem, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrupoOrigem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrupoOrigem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGrupoOrigemIdentifier(grupoOrigem: Pick<IGrupoOrigem, 'id'>): number {
    return grupoOrigem.id;
  }

  compareGrupoOrigem(o1: Pick<IGrupoOrigem, 'id'> | null, o2: Pick<IGrupoOrigem, 'id'> | null): boolean {
    return o1 && o2 ? this.getGrupoOrigemIdentifier(o1) === this.getGrupoOrigemIdentifier(o2) : o1 === o2;
  }

  addGrupoOrigemToCollectionIfMissing<Type extends Pick<IGrupoOrigem, 'id'>>(
    grupoOrigemCollection: Type[],
    ...grupoOrigemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const grupoOrigems: Type[] = grupoOrigemsToCheck.filter(isPresent);
    if (grupoOrigems.length > 0) {
      const grupoOrigemCollectionIdentifiers = grupoOrigemCollection.map(
        grupoOrigemItem => this.getGrupoOrigemIdentifier(grupoOrigemItem)!,
      );
      const grupoOrigemsToAdd = grupoOrigems.filter(grupoOrigemItem => {
        const grupoOrigemIdentifier = this.getGrupoOrigemIdentifier(grupoOrigemItem);
        if (grupoOrigemCollectionIdentifiers.includes(grupoOrigemIdentifier)) {
          return false;
        }
        grupoOrigemCollectionIdentifiers.push(grupoOrigemIdentifier);
        return true;
      });
      return [...grupoOrigemsToAdd, ...grupoOrigemCollection];
    }
    return grupoOrigemCollection;
  }
}
