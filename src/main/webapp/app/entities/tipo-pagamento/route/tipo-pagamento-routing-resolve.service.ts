import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITipoPagamento } from '../tipo-pagamento.model';
import { TipoPagamentoService } from '../service/tipo-pagamento.service';

export const tipoPagamentoResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoPagamento> => {
  const id = route.params['id'];
  if (id) {
    return inject(TipoPagamentoService)
      .find(id)
      .pipe(
        mergeMap((tipoPagamento: HttpResponse<ITipoPagamento>) => {
          if (tipoPagamento.body) {
            return of(tipoPagamento.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tipoPagamentoResolve;
