import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IItemComanda, NewItemComanda } from '../item-comanda.model';

export type PartialUpdateItemComanda = Partial<IItemComanda> & Pick<IItemComanda, 'id'>;

type RestOf<T extends IItemComanda | NewItemComanda> = Omit<T, 'data'> & {
  data?: string | null;
};

export type RestItemComanda = RestOf<IItemComanda>;

export type NewRestItemComanda = RestOf<NewItemComanda>;

export type PartialUpdateRestItemComanda = RestOf<PartialUpdateItemComanda>;

export type EntityResponseType = HttpResponse<IItemComanda>;
export type EntityArrayResponseType = HttpResponse<IItemComanda[]>;

@Injectable({ providedIn: 'root' })
export class ItemComandaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/item-comandas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(itemComanda: NewItemComanda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemComanda);
    return this.http
      .post<RestItemComanda>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(itemComanda: IItemComanda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemComanda);
    return this.http
      .put<RestItemComanda>(`${this.resourceUrl}/${this.getItemComandaIdentifier(itemComanda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  updateLista(itemComanda: IItemComanda[] | undefined): any {
    return this.http
      .put<RestItemComanda[]>(`${this.resourceUrl}/updateLista`, itemComanda, { observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  partialUpdate(itemComanda: PartialUpdateItemComanda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itemComanda);
    return this.http
      .patch<RestItemComanda>(`${this.resourceUrl}/${this.getItemComandaIdentifier(itemComanda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestItemComanda>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestItemComanda[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getItemComandaIdentifier(itemComanda: Pick<IItemComanda, 'id'>): number {
    return itemComanda.id;
  }

  compareItemComanda(o1: Pick<IItemComanda, 'id'> | null, o2: Pick<IItemComanda, 'id'> | null): boolean {
    return o1 && o2 ? this.getItemComandaIdentifier(o1) === this.getItemComandaIdentifier(o2) : o1 === o2;
  }

  addItemComandaToCollectionIfMissing<Type extends Pick<IItemComanda, 'id'>>(
    itemComandaCollection: Type[],
    ...itemComandasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const itemComandas: Type[] = itemComandasToCheck.filter(isPresent);
    if (itemComandas.length > 0) {
      const itemComandaCollectionIdentifiers = itemComandaCollection.map(
        itemComandaItem => this.getItemComandaIdentifier(itemComandaItem)!,
      );
      const itemComandasToAdd = itemComandas.filter(itemComandaItem => {
        const itemComandaIdentifier = this.getItemComandaIdentifier(itemComandaItem);
        if (itemComandaCollectionIdentifiers.includes(itemComandaIdentifier)) {
          return false;
        }
        itemComandaCollectionIdentifiers.push(itemComandaIdentifier);
        return true;
      });
      return [...itemComandasToAdd, ...itemComandaCollection];
    }
    return itemComandaCollection;
  }

  protected convertDateFromClient<T extends IItemComanda | NewItemComanda | PartialUpdateItemComanda>(itemComanda: T): RestOf<T> {
    return {
      ...itemComanda,
      data: itemComanda.data?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restItemComanda: RestItemComanda): IItemComanda {
    return {
      ...restItemComanda,
      data: restItemComanda.data ? dayjs(restItemComanda.data) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestItemComanda>): HttpResponse<IItemComanda> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestItemComanda[]>): HttpResponse<IItemComanda[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
