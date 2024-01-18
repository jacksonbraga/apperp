import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { GrupoOrigemComponent } from './list/grupo-origem.component';
import { GrupoOrigemDetailComponent } from './detail/grupo-origem-detail.component';
import { GrupoOrigemUpdateComponent } from './update/grupo-origem-update.component';
import GrupoOrigemResolve from './route/grupo-origem-routing-resolve.service';

const grupoOrigemRoute: Routes = [
  {
    path: '',
    component: GrupoOrigemComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GrupoOrigemDetailComponent,
    resolve: {
      grupoOrigem: GrupoOrigemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GrupoOrigemUpdateComponent,
    resolve: {
      grupoOrigem: GrupoOrigemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GrupoOrigemUpdateComponent,
    resolve: {
      grupoOrigem: GrupoOrigemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default grupoOrigemRoute;
