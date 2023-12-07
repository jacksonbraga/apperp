import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { GrupoServicoComponent } from './list/grupo-servico.component';
import { GrupoServicoDetailComponent } from './detail/grupo-servico-detail.component';
import { GrupoServicoUpdateComponent } from './update/grupo-servico-update.component';
import GrupoServicoResolve from './route/grupo-servico-routing-resolve.service';

const grupoServicoRoute: Routes = [
  {
    path: '',
    component: GrupoServicoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GrupoServicoDetailComponent,
    resolve: {
      grupoServico: GrupoServicoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GrupoServicoUpdateComponent,
    resolve: {
      grupoServico: GrupoServicoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GrupoServicoUpdateComponent,
    resolve: {
      grupoServico: GrupoServicoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default grupoServicoRoute;
