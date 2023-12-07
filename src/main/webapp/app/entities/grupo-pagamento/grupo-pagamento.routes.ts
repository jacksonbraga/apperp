import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { GrupoPagamentoComponent } from './list/grupo-pagamento.component';
import { GrupoPagamentoDetailComponent } from './detail/grupo-pagamento-detail.component';
import { GrupoPagamentoUpdateComponent } from './update/grupo-pagamento-update.component';
import GrupoPagamentoResolve from './route/grupo-pagamento-routing-resolve.service';

const grupoPagamentoRoute: Routes = [
  {
    path: '',
    component: GrupoPagamentoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GrupoPagamentoDetailComponent,
    resolve: {
      grupoPagamento: GrupoPagamentoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GrupoPagamentoUpdateComponent,
    resolve: {
      grupoPagamento: GrupoPagamentoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GrupoPagamentoUpdateComponent,
    resolve: {
      grupoPagamento: GrupoPagamentoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default grupoPagamentoRoute;
