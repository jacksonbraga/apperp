import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TipoServicoComponent } from './list/tipo-servico.component';
import { TipoServicoDetailComponent } from './detail/tipo-servico-detail.component';
import { TipoServicoUpdateComponent } from './update/tipo-servico-update.component';
import TipoServicoResolve from './route/tipo-servico-routing-resolve.service';

const tipoServicoRoute: Routes = [
  {
    path: '',
    component: TipoServicoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoServicoDetailComponent,
    resolve: {
      tipoServico: TipoServicoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoServicoUpdateComponent,
    resolve: {
      tipoServico: TipoServicoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoServicoUpdateComponent,
    resolve: {
      tipoServico: TipoServicoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tipoServicoRoute;
