import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TipoOrigemComponent } from './list/tipo-origem.component';
import { TipoOrigemDetailComponent } from './detail/tipo-origem-detail.component';
import { TipoOrigemUpdateComponent } from './update/tipo-origem-update.component';
import TipoOrigemResolve from './route/tipo-origem-routing-resolve.service';

const tipoOrigemRoute: Routes = [
  {
    path: '',
    component: TipoOrigemComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoOrigemDetailComponent,
    resolve: {
      tipoOrigem: TipoOrigemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoOrigemUpdateComponent,
    resolve: {
      tipoOrigem: TipoOrigemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoOrigemUpdateComponent,
    resolve: {
      tipoOrigem: TipoOrigemResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tipoOrigemRoute;
