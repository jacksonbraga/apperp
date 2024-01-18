import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoOrigem } from '../tipo-origem.model';
import { TipoOrigemService } from '../service/tipo-origem.service';

export const tipoOrigemResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoOrigem> => {
  const id = route.params['id'];
  if (id) {
    return inject(TipoOrigemService)
      .find(id)
      .pipe(
        mergeMap((tipoOrigem: HttpResponse<ITipoOrigem>) => {
          if (tipoOrigem.body) {
            return of(tipoOrigem.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tipoOrigemResolve;
