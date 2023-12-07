import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrupoServico, NewGrupoServico } from '../grupo-servico.model';

export type PartialUpdateGrupoServico = Partial<IGrupoServico> & Pick<IGrupoServico, 'id'>;

export type EntityResponseType = HttpResponse<IGrupoServico>;
export type EntityArrayResponseType = HttpResponse<IGrupoServico[]>;

@Injectable({ providedIn: 'root' })
export class GrupoServicoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grupo-servicos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(grupoServico: NewGrupoServico): Observable<EntityResponseType> {
    return this.http.post<IGrupoServico>(this.resourceUrl, grupoServico, { observe: 'response' });
  }

  update(grupoServico: IGrupoServico): Observable<EntityResponseType> {
    return this.http.put<IGrupoServico>(`${this.resourceUrl}/${this.getGrupoServicoIdentifier(grupoServico)}`, grupoServico, {
      observe: 'response',
    });
  }

  partialUpdate(grupoServico: PartialUpdateGrupoServico): Observable<EntityResponseType> {
    return this.http.patch<IGrupoServico>(`${this.resourceUrl}/${this.getGrupoServicoIdentifier(grupoServico)}`, grupoServico, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrupoServico>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrupoServico[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGrupoServicoIdentifier(grupoServico: Pick<IGrupoServico, 'id'>): number {
    return grupoServico.id;
  }

  compareGrupoServico(o1: Pick<IGrupoServico, 'id'> | null, o2: Pick<IGrupoServico, 'id'> | null): boolean {
    return o1 && o2 ? this.getGrupoServicoIdentifier(o1) === this.getGrupoServicoIdentifier(o2) : o1 === o2;
  }

  addGrupoServicoToCollectionIfMissing<Type extends Pick<IGrupoServico, 'id'>>(
    grupoServicoCollection: Type[],
    ...grupoServicosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const grupoServicos: Type[] = grupoServicosToCheck.filter(isPresent);
    if (grupoServicos.length > 0) {
      const grupoServicoCollectionIdentifiers = grupoServicoCollection.map(
        grupoServicoItem => this.getGrupoServicoIdentifier(grupoServicoItem)!,
      );
      const grupoServicosToAdd = grupoServicos.filter(grupoServicoItem => {
        const grupoServicoIdentifier = this.getGrupoServicoIdentifier(grupoServicoItem);
        if (grupoServicoCollectionIdentifiers.includes(grupoServicoIdentifier)) {
          return false;
        }
        grupoServicoCollectionIdentifiers.push(grupoServicoIdentifier);
        return true;
      });
      return [...grupoServicosToAdd, ...grupoServicoCollection];
    }
    return grupoServicoCollection;
  }
}
