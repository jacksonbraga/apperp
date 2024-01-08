import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRelatorioComanda } from '../relatorio-comanda.model';
import { RelatorioComandaService } from '../service/relatorio-comanda.service';

export const relatorioResolve = (route: ActivatedRouteSnapshot): Observable<null | IRelatorioComanda> => {
  const id = route.params['id'];
  if (id) {
    return inject(RelatorioComandaService)
      .find(id)
      .pipe(
        mergeMap((relatorio: HttpResponse<IRelatorioComanda>) => {
          if (relatorio.body) {
            return of(relatorio.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default relatorioResolve;
