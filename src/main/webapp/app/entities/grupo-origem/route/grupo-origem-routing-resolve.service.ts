import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGrupoOrigem } from '../grupo-origem.model';
import { GrupoOrigemService } from '../service/grupo-origem.service';

export const grupoOrigemResolve = (route: ActivatedRouteSnapshot): Observable<null | IGrupoOrigem> => {
  const id = route.params['id'];
  if (id) {
    return inject(GrupoOrigemService)
      .find(id)
      .pipe(
        mergeMap((grupoOrigem: HttpResponse<IGrupoOrigem>) => {
          if (grupoOrigem.body) {
            return of(grupoOrigem.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default grupoOrigemResolve;
