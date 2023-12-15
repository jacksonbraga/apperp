import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRelatorio } from '../relatorio.model';
import { RelatorioService } from '../service/relatorio.service';

export const relatorioResolve = (route: ActivatedRouteSnapshot): Observable<null | IRelatorio> => {
  const id = route.params['id'];
  if (id) {
    return inject(RelatorioService)
      .find(id)
      .pipe(
        mergeMap((relatorio: HttpResponse<IRelatorio>) => {
          if (relatorio.body) {
            return of(relatorio.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default relatorioResolve;
