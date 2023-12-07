import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CorComponent } from './list/cor.component';
import { CorDetailComponent } from './detail/cor-detail.component';
import { CorUpdateComponent } from './update/cor-update.component';
import CorResolve from './route/cor-routing-resolve.service';

const corRoute: Routes = [
  {
    path: '',
    component: CorComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CorDetailComponent,
    resolve: {
      cor: CorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CorUpdateComponent,
    resolve: {
      cor: CorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CorUpdateComponent,
    resolve: {
      cor: CorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default corRoute;
