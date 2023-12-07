import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoDespesa } from '../tipo-despesa.model';
import { TipoDespesaService } from '../service/tipo-despesa.service';

export const tipoDespesaResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoDespesa> => {
  const id = route.params['id'];
  if (id) {
    return inject(TipoDespesaService)
      .find(id)
      .pipe(
        mergeMap((tipoDespesa: HttpResponse<ITipoDespesa>) => {
          if (tipoDespesa.body) {
            return of(tipoDespesa.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tipoDespesaResolve;
