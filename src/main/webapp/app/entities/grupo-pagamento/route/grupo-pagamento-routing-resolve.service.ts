import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGrupoPagamento } from '../grupo-pagamento.model';
import { GrupoPagamentoService } from '../service/grupo-pagamento.service';

export const grupoPagamentoResolve = (route: ActivatedRouteSnapshot): Observable<null | IGrupoPagamento> => {
  const id = route.params['id'];
  if (id) {
    return inject(GrupoPagamentoService)
      .find(id)
      .pipe(
        mergeMap((grupoPagamento: HttpResponse<IGrupoPagamento>) => {
          if (grupoPagamento.body) {
            return of(grupoPagamento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default grupoPagamentoResolve;
