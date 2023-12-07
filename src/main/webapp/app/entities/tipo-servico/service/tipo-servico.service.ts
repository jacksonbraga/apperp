import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITipoServico, NewTipoServico } from '../tipo-servico.model';

export type PartialUpdateTipoServico = Partial<ITipoServico> & Pick<ITipoServico, 'id'>;

export type EntityResponseType = HttpResponse<ITipoServico>;
export type EntityArrayResponseType = HttpResponse<ITipoServico[]>;

@Injectable({ providedIn: 'root' })
export class TipoServicoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tipo-servicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tipoServico: NewTipoServico): Observable<EntityResponseType> {
    return this.http.post<ITipoServico>(this.resourceUrl, tipoServico, { observe: 'response' });
  }

  update(tipoServico: ITipoServico): Observable<EntityResponseType> {
    return this.http.put<ITipoServico>(`${this.resourceUrl}/${this.getTipoServicoIdentifier(tipoServico)}`, tipoServico, {
      observe: 'response',
    });
  }

  partialUpdate(tipoServico: PartialUpdateTipoServico): Observable<EntityResponseType> {
    return this.http.patch<ITipoServico>(`${this.resourceUrl}/${this.getTipoServicoIdentifier(tipoServico)}`, tipoServico, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoServico>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoServico[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTipoServicoIdentifier(tipoServico: Pick<ITipoServico, 'id'>): number {
    return tipoServico.id;
  }

  compareTipoServico(o1: Pick<ITipoServico, 'id'> | null, o2: Pick<ITipoServico, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoServicoIdentifier(o1) === this.getTipoServicoIdentifier(o2) : o1 === o2;
  }

  addTipoServicoToCollectionIfMissing<Type extends Pick<ITipoServico, 'id'>>(
    tipoServicoCollection: Type[],
    ...tipoServicosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoServicos: Type[] = tipoServicosToCheck.filter(isPresent);
    if (tipoServicos.length > 0) {
      const tipoServicoCollectionIdentifiers = tipoServicoCollection.map(
        tipoServicoItem => this.getTipoServicoIdentifier(tipoServicoItem)!,
      );
      const tipoServicosToAdd = tipoServicos.filter(tipoServicoItem => {
        const tipoServicoIdentifier = this.getTipoServicoIdentifier(tipoServicoItem);
        if (tipoServicoCollectionIdentifiers.includes(tipoServicoIdentifier)) {
          return false;
        }
        tipoServicoCollectionIdentifiers.push(tipoServicoIdentifier);
        return true;
      });
      return [...tipoServicosToAdd, ...tipoServicoCollection];
    }
    return tipoServicoCollection;
  }
}
