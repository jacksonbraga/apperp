import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TipoPagamentoComponent } from './list/tipo-pagamento.component';
import { TipoPagamentoDetailComponent } from './detail/tipo-pagamento-detail.component';
import { TipoPagamentoUpdateComponent } from './update/tipo-pagamento-update.component';
import TipoPagamentoResolve from './route/tipo-pagamento-routing-resolve.service';

const tipoPagamentoRoute: Routes = [
  {
    path: '',
    component: TipoPagamentoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoPagamentoDetailComponent,
    resolve: {
      tipoPagamento: TipoPagamentoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoPagamentoUpdateComponent,
    resolve: {
      tipoPagamento: TipoPagamentoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoPagamentoUpdateComponent,
    resolve: {
      tipoPagamento: TipoPagamentoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tipoPagamentoRoute;
