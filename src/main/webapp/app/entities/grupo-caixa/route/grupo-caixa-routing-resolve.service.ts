import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGrupoCaixa } from '../grupo-caixa.model';
import { GrupoCaixaService } from '../service/grupo-caixa.service';

export const grupoCaixaResolve = (route: ActivatedRouteSnapshot): Observable<null | IGrupoCaixa> => {
  const id = route.params['id'];
  if (id) {
    return inject(GrupoCaixaService)
      .find(id)
      .pipe(
        mergeMap((grupoCaixa: HttpResponse<IGrupoCaixa>) => {
          if (grupoCaixa.body) {
            return of(grupoCaixa.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default grupoCaixaResolve;
