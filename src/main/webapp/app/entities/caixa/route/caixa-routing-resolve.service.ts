import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICaixa } from '../caixa.model';
import { CaixaService } from '../service/caixa.service';

export const caixaResolve = (route: ActivatedRouteSnapshot): Observable<null | ICaixa> => {
  const id = route.params['id'];
  if (id) {
    return inject(CaixaService)
      .find(id)
      .pipe(
        mergeMap((caixa: HttpResponse<ICaixa>) => {
          if (caixa.body) {
            return of(caixa.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default caixaResolve;
