import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TipoCaixaComponent } from './list/tipo-caixa.component';
import { TipoCaixaDetailComponent } from './detail/tipo-caixa-detail.component';
import { TipoCaixaUpdateComponent } from './update/tipo-caixa-update.component';
import TipoCaixaResolve from './route/tipo-caixa-routing-resolve.service';

const tipoCaixaRoute: Routes = [
  {
    path: '',
    component: TipoCaixaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoCaixaDetailComponent,
    resolve: {
      tipoCaixa: TipoCaixaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoCaixaUpdateComponent,
    resolve: {
      tipoCaixa: TipoCaixaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoCaixaUpdateComponent,
    resolve: {
      tipoCaixa: TipoCaixaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tipoCaixaRoute;
