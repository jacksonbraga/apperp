import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { GrupoCaixaComponent } from './list/grupo-caixa.component';
import { GrupoCaixaDetailComponent } from './detail/grupo-caixa-detail.component';
import { GrupoCaixaUpdateComponent } from './update/grupo-caixa-update.component';
import GrupoCaixaResolve from './route/grupo-caixa-routing-resolve.service';

const grupoCaixaRoute: Routes = [
  {
    path: '',
    component: GrupoCaixaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GrupoCaixaDetailComponent,
    resolve: {
      grupoCaixa: GrupoCaixaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GrupoCaixaUpdateComponent,
    resolve: {
      grupoCaixa: GrupoCaixaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GrupoCaixaUpdateComponent,
    resolve: {
      grupoCaixa: GrupoCaixaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default grupoCaixaRoute;
