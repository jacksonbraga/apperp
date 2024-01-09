import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IControleComanda, NewControleComanda } from '../controle-comanda.model';
import { IControleComandaPrevia } from '../controle-comanda-previa.model';

export type PartialUpdateControleComanda = Partial<IControleComanda> & Pick<IControleComanda, 'id'>;

type RestOf<T extends IControleComanda | NewControleComanda> = Omit<T, 'data'> & {
  data?: string | null;
};

export type RestControleComanda = RestOf<IControleComanda>;

export type NewRestControleComanda = RestOf<NewControleComanda>;

export type PartialUpdateRestControleComanda = RestOf<PartialUpdateControleComanda>;

export type EntityResponseType = HttpResponse<IControleComanda>;
export type EntityArrayResponseType = HttpResponse<IControleComanda[]>;

@Injectable({ providedIn: 'root' })
export class ControleComandaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/controle-comandas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(controleComanda: NewControleComanda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(controleComanda);
    return this.http
      .post<RestControleComanda>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(controleComanda: IControleComanda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(controleComanda);
    return this.http
      .put<RestControleComanda>(`${this.resourceUrl}/${this.getControleComandaIdentifier(controleComanda)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(controleComanda: PartialUpdateControleComanda): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(controleComanda);
    return this.http
      .patch<RestControleComanda>(`${this.resourceUrl}/${this.getControleComandaIdentifier(controleComanda)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestControleComanda>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestControleComanda[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getControleComandaIdentifier(controleComanda: Pick<IControleComanda, 'id'>): number {
    return controleComanda.id;
  }

  compareControleComanda(o1: Pick<IControleComanda, 'id'> | null, o2: Pick<IControleComanda, 'id'> | null): boolean {
    return o1 && o2 ? this.getControleComandaIdentifier(o1) === this.getControleComandaIdentifier(o2) : o1 === o2;
  }

  previa(id?: number): Observable<IControleComandaPrevia[]> {
    return this.http.get<IControleComandaPrevia[]>(this.resourceUrl + '/previa-fechamento/' + id);
  }

  atualizaPrevia(id?: number): Observable<IControleComandaPrevia[]> {
    return this.http.get<IControleComandaPrevia[]>(this.resourceUrl + '/atualiza-previa-fechamento/' + id);
  }

  addControleComandaToCollectionIfMissing<Type extends Pick<IControleComanda, 'id'>>(
    controleComandaCollection: Type[],
    ...controleComandasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const controleComandas: Type[] = controleComandasToCheck.filter(isPresent);
    if (controleComandas.length > 0) {
      const controleComandaCollectionIdentifiers = controleComandaCollection.map(
        controleComandaItem => this.getControleComandaIdentifier(controleComandaItem)!,
      );
      const controleComandasToAdd = controleComandas.filter(controleComandaItem => {
        const controleComandaIdentifier = this.getControleComandaIdentifier(controleComandaItem);
        if (controleComandaCollectionIdentifiers.includes(controleComandaIdentifier)) {
          return false;
        }
        controleComandaCollectionIdentifiers.push(controleComandaIdentifier);
        return true;
      });
      return [...controleComandasToAdd, ...controleComandaCollection];
    }
    return controleComandaCollection;
  }

  protected convertDateFromClient<T extends IControleComanda | NewControleComanda | PartialUpdateControleComanda>(
    controleComanda: T,
  ): RestOf<T> {
    return {
      ...controleComanda,
      data: controleComanda.data?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restControleComanda: RestControleComanda): IControleComanda {
    return {
      ...restControleComanda,
      data: restControleComanda.data ? dayjs(restControleComanda.data) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestControleComanda>): HttpResponse<IControleComanda> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestControleComanda[]>): HttpResponse<IControleComanda[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
