import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ItemComandaComponent } from './list/item-comanda.component';
import { ItemComandaDetailComponent } from './detail/item-comanda-detail.component';
import { ItemComandaUpdateComponent } from './update/item-comanda-update.component';
import ItemComandaResolve from './route/item-comanda-routing-resolve.service';

const itemComandaRoute: Routes = [
  {
    path: '',
    component: ItemComandaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItemComandaDetailComponent,
    resolve: {
      itemComanda: ItemComandaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItemComandaUpdateComponent,
    resolve: {
      itemComanda: ItemComandaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItemComandaUpdateComponent,
    resolve: {
      itemComanda: ItemComandaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default itemComandaRoute;
