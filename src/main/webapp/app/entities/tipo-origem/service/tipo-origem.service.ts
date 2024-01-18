import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoOrigem, NewTipoOrigem } from '../tipo-origem.model';

export type PartialUpdateTipoOrigem = Partial<ITipoOrigem> & Pick<ITipoOrigem, 'id'>;

export type EntityResponseType = HttpResponse<ITipoOrigem>;
export type EntityArrayResponseType = HttpResponse<ITipoOrigem[]>;

@Injectable({ providedIn: 'root' })
export class TipoOrigemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-origems');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tipoOrigem: NewTipoOrigem): Observable<EntityResponseType> {
    return this.http.post<ITipoOrigem>(this.resourceUrl, tipoOrigem, { observe: 'response' });
  }

  update(tipoOrigem: ITipoOrigem): Observable<EntityResponseType> {
    return this.http.put<ITipoOrigem>(`${this.resourceUrl}/${this.getTipoOrigemIdentifier(tipoOrigem)}`, tipoOrigem, {
      observe: 'response',
    });
  }

  partialUpdate(tipoOrigem: PartialUpdateTipoOrigem): Observable<EntityResponseType> {
    return this.http.patch<ITipoOrigem>(`${this.resourceUrl}/${this.getTipoOrigemIdentifier(tipoOrigem)}`, tipoOrigem, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoOrigem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoOrigem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTipoOrigemIdentifier(tipoOrigem: Pick<ITipoOrigem, 'id'>): number {
    return tipoOrigem.id;
  }

  compareTipoOrigem(o1: Pick<ITipoOrigem, 'id'> | null, o2: Pick<ITipoOrigem, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoOrigemIdentifier(o1) === this.getTipoOrigemIdentifier(o2) : o1 === o2;
  }

  addTipoOrigemToCollectionIfMissing<Type extends Pick<ITipoOrigem, 'id'>>(
    tipoOrigemCollection: Type[],
    ...tipoOrigemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoOrigems: Type[] = tipoOrigemsToCheck.filter(isPresent);
    if (tipoOrigems.length > 0) {
      const tipoOrigemCollectionIdentifiers = tipoOrigemCollection.map(tipoOrigemItem => this.getTipoOrigemIdentifier(tipoOrigemItem)!);
      const tipoOrigemsToAdd = tipoOrigems.filter(tipoOrigemItem => {
        const tipoOrigemIdentifier = this.getTipoOrigemIdentifier(tipoOrigemItem);
        if (tipoOrigemCollectionIdentifiers.includes(tipoOrigemIdentifier)) {
          return false;
        }
        tipoOrigemCollectionIdentifiers.push(tipoOrigemIdentifier);
        return true;
      });
      return [...tipoOrigemsToAdd, ...tipoOrigemCollection];
    }
    return tipoOrigemCollection;
  }
}
