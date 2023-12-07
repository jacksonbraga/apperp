import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDespesa, NewDespesa } from '../despesa.model';

export type PartialUpdateDespesa = Partial<IDespesa> & Pick<IDespesa, 'id'>;

type RestOf<T extends IDespesa | NewDespesa> = Omit<T, 'data' | 'dataVencimento'> & {
  data?: string | null;
  dataVencimento?: string | null;
};

export type RestDespesa = RestOf<IDespesa>;

export type NewRestDespesa = RestOf<NewDespesa>;

export type PartialUpdateRestDespesa = RestOf<PartialUpdateDespesa>;

export type EntityResponseType = HttpResponse<IDespesa>;
export type EntityArrayResponseType = HttpResponse<IDespesa[]>;

@Injectable({ providedIn: 'root' })
export class DespesaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/despesas');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(despesa: NewDespesa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(despesa);
    return this.http
      .post<RestDespesa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(despesa: IDespesa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(despesa);
    return this.http
      .put<RestDespesa>(`${this.resourceUrl}/${this.getDespesaIdentifier(despesa)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(despesa: PartialUpdateDespesa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(despesa);
    return this.http
      .patch<RestDespesa>(`${this.resourceUrl}/${this.getDespesaIdentifier(despesa)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDespesa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDespesa[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDespesaIdentifier(despesa: Pick<IDespesa, 'id'>): number {
    return despesa.id;
  }

  compareDespesa(o1: Pick<IDespesa, 'id'> | null, o2: Pick<IDespesa, 'id'> | null): boolean {
    return o1 && o2 ? this.getDespesaIdentifier(o1) === this.getDespesaIdentifier(o2) : o1 === o2;
  }

  addDespesaToCollectionIfMissing<Type extends Pick<IDespesa, 'id'>>(
    despesaCollection: Type[],
    ...despesasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const despesas: Type[] = despesasToCheck.filter(isPresent);
    if (despesas.length > 0) {
      const despesaCollectionIdentifiers = despesaCollection.map(despesaItem => this.getDespesaIdentifier(despesaItem)!);
      const despesasToAdd = despesas.filter(despesaItem => {
        const despesaIdentifier = this.getDespesaIdentifier(despesaItem);
        if (despesaCollectionIdentifiers.includes(despesaIdentifier)) {
          return false;
        }
        despesaCollectionIdentifiers.push(despesaIdentifier);
        return true;
      });
      return [...despesasToAdd, ...despesaCollection];
    }
    return despesaCollection;
  }

  protected convertDateFromClient<T extends IDespesa | NewDespesa | PartialUpdateDespesa>(despesa: T): RestOf<T> {
    return {
      ...despesa,
      data: despesa.data?.format(DATE_FORMAT) ?? null,
      dataVencimento: despesa.dataVencimento?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restDespesa: RestDespesa): IDespesa {
    return {
      ...restDespesa,
      data: restDespesa.data ? dayjs(restDespesa.data) : undefined,
      dataVencimento: restDespesa.dataVencimento ? dayjs(restDespesa.dataVencimento) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDespesa>): HttpResponse<IDespesa> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDespesa[]>): HttpResponse<IDespesa[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
