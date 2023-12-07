import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDespesa } from '../despesa.model';
import { DespesaService } from '../service/despesa.service';

export const despesaResolve = (route: ActivatedRouteSnapshot): Observable<null | IDespesa> => {
  const id = route.params['id'];
  if (id) {
    return inject(DespesaService)
      .find(id)
      .pipe(
        mergeMap((despesa: HttpResponse<IDespesa>) => {
          if (despesa.body) {
            return of(despesa.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default despesaResolve;
