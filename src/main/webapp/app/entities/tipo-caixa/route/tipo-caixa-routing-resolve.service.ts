import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoCaixa } from '../tipo-caixa.model';
import { TipoCaixaService } from '../service/tipo-caixa.service';

export const tipoCaixaResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoCaixa> => {
  const id = route.params['id'];
  if (id) {
    return inject(TipoCaixaService)
      .find(id)
      .pipe(
        mergeMap((tipoCaixa: HttpResponse<ITipoCaixa>) => {
          if (tipoCaixa.body) {
            return of(tipoCaixa.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tipoCaixaResolve;
