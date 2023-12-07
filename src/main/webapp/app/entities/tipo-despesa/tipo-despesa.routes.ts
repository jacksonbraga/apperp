import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TipoDespesaComponent } from './list/tipo-despesa.component';
import { TipoDespesaDetailComponent } from './detail/tipo-despesa-detail.component';
import { TipoDespesaUpdateComponent } from './update/tipo-despesa-update.component';
import TipoDespesaResolve from './route/tipo-despesa-routing-resolve.service';

const tipoDespesaRoute: Routes = [
  {
    path: '',
    component: TipoDespesaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoDespesaDetailComponent,
    resolve: {
      tipoDespesa: TipoDespesaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoDespesaUpdateComponent,
    resolve: {
      tipoDespesa: TipoDespesaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoDespesaUpdateComponent,
    resolve: {
      tipoDespesa: TipoDespesaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tipoDespesaRoute;
