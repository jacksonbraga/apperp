import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICor } from '../cor.model';
import { CorService } from '../service/cor.service';

export const corResolve = (route: ActivatedRouteSnapshot): Observable<null | ICor> => {
  const id = route.params['id'];
  if (id) {
    return inject(CorService)
      .find(id)
      .pipe(
        mergeMap((cor: HttpResponse<ICor>) => {
          if (cor.body) {
            return of(cor.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default corResolve;
