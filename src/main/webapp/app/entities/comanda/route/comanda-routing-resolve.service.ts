import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IComanda } from '../comanda.model';
import { ComandaService } from '../service/comanda.service';

export const comandaResolve = (route: ActivatedRouteSnapshot): Observable<null | IComanda> => {
  const id = route.params['id'];
  if (id) {
    return inject(ComandaService)
      .find(id)
      .pipe(
        mergeMap((comanda: HttpResponse<IComanda>) => {
          if (comanda.body) {
            return of(comanda.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default comandaResolve;
