import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SituacaoComponent } from './list/situacao.component';
import { SituacaoDetailComponent } from './detail/situacao-detail.component';
import { SituacaoUpdateComponent } from './update/situacao-update.component';
import SituacaoResolve from './route/situacao-routing-resolve.service';

const situacaoRoute: Routes = [
  {
    path: '',
    component: SituacaoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SituacaoDetailComponent,
    resolve: {
      situacao: SituacaoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SituacaoUpdateComponent,
    resolve: {
      situacao: SituacaoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SituacaoUpdateComponent,
    resolve: {
      situacao: SituacaoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default situacaoRoute;
