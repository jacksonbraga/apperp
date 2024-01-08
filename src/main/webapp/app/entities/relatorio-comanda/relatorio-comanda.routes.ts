import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { RelatorioComandaComponent } from './list/relatorio-comanda.component';

const relatorioRoute: Routes = [
  {
    path: '',
    component: RelatorioComandaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default relatorioRoute;
