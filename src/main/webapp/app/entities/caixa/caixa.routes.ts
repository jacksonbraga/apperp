import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CaixaComponent } from './list/caixa.component';
import { CaixaDetailComponent } from './detail/caixa-detail.component';
import { CaixaUpdateComponent } from './update/caixa-update.component';
import CaixaResolve from './route/caixa-routing-resolve.service';

const caixaRoute: Routes = [
  {
    path: '',
    component: CaixaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CaixaDetailComponent,
    resolve: {
      caixa: CaixaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CaixaUpdateComponent,
    resolve: {
      caixa: CaixaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CaixaUpdateComponent,
    resolve: {
      caixa: CaixaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default caixaRoute;
