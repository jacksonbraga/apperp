import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ComandaComponent } from './list/comanda.component';
import { ComandaDetailComponent } from './detail/comanda-detail.component';
import { ComandaUpdateComponent } from './update/comanda-update.component';
import ComandaResolve from './route/comanda-routing-resolve.service';

const comandaRoute: Routes = [
  {
    path: '',
    component: ComandaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComandaDetailComponent,
    resolve: {
      comanda: ComandaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComandaUpdateComponent,
    resolve: {
      comanda: ComandaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComandaUpdateComponent,
    resolve: {
      comanda: ComandaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default comandaRoute;
