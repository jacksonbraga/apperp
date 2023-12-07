import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { DespesaComponent } from './list/despesa.component';
import { DespesaDetailComponent } from './detail/despesa-detail.component';
import { DespesaUpdateComponent } from './update/despesa-update.component';
import DespesaResolve from './route/despesa-routing-resolve.service';

const despesaRoute: Routes = [
  {
    path: '',
    component: DespesaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DespesaDetailComponent,
    resolve: {
      despesa: DespesaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DespesaUpdateComponent,
    resolve: {
      despesa: DespesaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DespesaUpdateComponent,
    resolve: {
      despesa: DespesaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default despesaRoute;
