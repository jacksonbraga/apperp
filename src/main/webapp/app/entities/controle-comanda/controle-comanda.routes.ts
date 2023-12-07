import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ControleComandaComponent } from './list/controle-comanda.component';
import { ControleComandaDetailComponent } from './detail/controle-comanda-detail.component';
import { ControleComandaUpdateComponent } from './update/controle-comanda-update.component';
import ControleComandaResolve from './route/controle-comanda-routing-resolve.service';

const controleComandaRoute: Routes = [
  {
    path: '',
    component: ControleComandaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ControleComandaDetailComponent,
    resolve: {
      controleComanda: ControleComandaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ControleComandaUpdateComponent,
    resolve: {
      controleComanda: ControleComandaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ControleComandaUpdateComponent,
    resolve: {
      controleComanda: ControleComandaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default controleComandaRoute;
