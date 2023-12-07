import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IComanda, NewComanda } from '../comanda.model';

export type PartialUpdateComanda = Partial<IComanda> & Pick<IComanda, 'id'>;

type RestOf<T extends IComanda | NewComanda> = Omit<T, 'data'> & {
  data?: string | null;
};

export type RestComanda = RestOf<IComanda>;

export type NewRestComanda = RestOf<NewComanda>;

export type PartialUpdateRestComanda = RestOf<PartialUpdateComanda>;

export type EntityResponseType = HttpResponse<IComanda>;
export type EntityArrayResponseType = HttpResponse<IComanda[]>;

@Injectable({ providedIn: 'root' })
export class ComandaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/comandas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(comanda: NewComanda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(comanda);
    return this.http
      .post<RestComanda>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(comanda: IComanda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(comanda);
    return this.http
      .put<RestComanda>(`${this.resourceUrl}/${this.getComandaIdentifier(comanda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(comanda: PartialUpdateComanda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(comanda);
    return this.http
      .patch<RestComanda>(`${this.resourceUrl}/${this.getComandaIdentifier(comanda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestComanda>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestComanda[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getComandaIdentifier(comanda: Pick<IComanda, 'id'>): number {
    return comanda.id;
  }

  compareComanda(o1: Pick<IComanda, 'id'> | null, o2: Pick<IComanda, 'id'> | null): boolean {
    return o1 && o2 ? this.getComandaIdentifier(o1) === this.getComandaIdentifier(o2) : o1 === o2;
  }

  addComandaToCollectionIfMissing<Type extends Pick<IComanda, 'id'>>(
    comandaCollection: Type[],
    ...comandasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const comandas: Type[] = comandasToCheck.filter(isPresent);
    if (comandas.length > 0) {
      const comandaCollectionIdentifiers = comandaCollection.map(comandaItem => this.getComandaIdentifier(comandaItem)!);
      const comandasToAdd = comandas.filter(comandaItem => {
        const comandaIdentifier = this.getComandaIdentifier(comandaItem);
        if (comandaCollectionIdentifiers.includes(comandaIdentifier)) {
          return false;
        }
        comandaCollectionIdentifiers.push(comandaIdentifier);
        return true;
      });
      return [...comandasToAdd, ...comandaCollection];
    }
    return comandaCollection;
  }

  protected convertDateFromClient<T extends IComanda | NewComanda | PartialUpdateComanda>(comanda: T): RestOf<T> {
    return {
      ...comanda,
      data: comanda.data?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restComanda: RestComanda): IComanda {
    return {
      ...restComanda,
      data: restComanda.data ? dayjs(restComanda.data) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestComanda>): HttpResponse<IComanda> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestComanda[]>): HttpResponse<IComanda[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
