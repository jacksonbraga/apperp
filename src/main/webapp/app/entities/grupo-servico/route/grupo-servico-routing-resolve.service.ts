import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGrupoServico } from '../grupo-servico.model';
import { GrupoServicoService } from '../service/grupo-servico.service';

export const grupoServicoResolve = (route: ActivatedRouteSnapshot): Observable<null | IGrupoServico> => {
  const id = route.params['id'];
  if (id) {
    return inject(GrupoServicoService)
      .find(id)
      .pipe(
        mergeMap((grupoServico: HttpResponse<IGrupoServico>) => {
          if (grupoServico.body) {
            return of(grupoServico.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default grupoServicoResolve;
