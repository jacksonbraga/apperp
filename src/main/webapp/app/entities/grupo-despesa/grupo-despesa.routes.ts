import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { GrupoDespesaComponent } from './list/grupo-despesa.component';
import { GrupoDespesaDetailComponent } from './detail/grupo-despesa-detail.component';
import { GrupoDespesaUpdateComponent } from './update/grupo-despesa-update.component';
import GrupoDespesaResolve from './route/grupo-despesa-routing-resolve.service';

const grupoDespesaRoute: Routes = [
  {
    path: '',
    component: GrupoDespesaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GrupoDespesaDetailComponent,
    resolve: {
      grupoDespesa: GrupoDespesaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GrupoDespesaUpdateComponent,
    resolve: {
      grupoDespesa: GrupoDespesaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GrupoDespesaUpdateComponent,
    resolve: {
      grupoDespesa: GrupoDespesaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default grupoDespesaRoute;
