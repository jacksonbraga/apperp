import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IControleComanda } from '../controle-comanda.model';
import { ControleComandaService } from '../service/controle-comanda.service';

export const controleComandaResolve = (route: ActivatedRouteSnapshot): Observable<null | IControleComanda> => {
  const id = route.params['id'];
  if (id) {
    return inject(ControleComandaService)
      .find(id)
      .pipe(
        mergeMap((controleComanda: HttpResponse<IControleComanda>) => {
          if (controleComanda.body) {
            return of(controleComanda.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default controleComandaResolve;
