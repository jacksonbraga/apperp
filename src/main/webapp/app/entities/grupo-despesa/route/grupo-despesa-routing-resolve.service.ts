import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGrupoDespesa } from '../grupo-despesa.model';
import { GrupoDespesaService } from '../service/grupo-despesa.service';

export const grupoDespesaResolve = (route: ActivatedRouteSnapshot): Observable<null | IGrupoDespesa> => {
  const id = route.params['id'];
  if (id) {
    return inject(GrupoDespesaService)
      .find(id)
      .pipe(
        mergeMap((grupoDespesa: HttpResponse<IGrupoDespesa>) => {
          if (grupoDespesa.body) {
            return of(grupoDespesa.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default grupoDespesaResolve;
