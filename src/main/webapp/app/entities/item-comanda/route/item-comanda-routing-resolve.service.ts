import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IItemComanda } from '../item-comanda.model';
import { ItemComandaService } from '../service/item-comanda.service';

export const itemComandaResolve = (route: ActivatedRouteSnapshot): Observable<null | IItemComanda> => {
  const id = route.params['id'];
  if (id) {
    return inject(ItemComandaService)
      .find(id)
      .pipe(
        mergeMap((itemComanda: HttpResponse<IItemComanda>) => {
          if (itemComanda.body) {
            return of(itemComanda.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default itemComandaResolve;
