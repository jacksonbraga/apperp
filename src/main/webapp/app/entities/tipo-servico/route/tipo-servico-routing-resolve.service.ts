import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoServico } from '../tipo-servico.model';
import { TipoServicoService } from '../service/tipo-servico.service';

export const tipoServicoResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoServico> => {
  const id = route.params['id'];
  if (id) {
    return inject(TipoServicoService)
      .find(id)
      .pipe(
        mergeMap((tipoServico: HttpResponse<ITipoServico>) => {
          if (tipoServico.body) {
            return of(tipoServico.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tipoServicoResolve;
