import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { RelatorioComponent } from './list/relatorio.component';

const relatorioRoute: Routes = [
  {
    path: '',
    component: RelatorioComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default relatorioRoute;
