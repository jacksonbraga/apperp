import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'comanda',
        data: { pageTitle: 'appErpApp.comanda.home.title' },
        loadChildren: () => import('./comanda/comanda.routes'),
      },
      {
        path: 'item-comanda',
        data: { pageTitle: 'appErpApp.itemComanda.home.title' },
        loadChildren: () => import('./item-comanda/item-comanda.routes'),
      },
      {
        path: 'despesa',
        data: { pageTitle: 'appErpApp.despesa.home.title' },
        loadChildren: () => import('./despesa/despesa.routes'),
      },
      {
        path: 'cor',
        data: { pageTitle: 'appErpApp.turno.home.title' },
        loadChildren: () => import('./cor/cor.routes'),
      },
      {
        path: 'tipo-pagamento',
        data: { pageTitle: 'appErpApp.tipoPagamento.home.title' },
        loadChildren: () => import('./tipo-pagamento/tipo-pagamento.routes'),
      },
      {
        path: 'tipo-servico',
        data: { pageTitle: 'appErpApp.tipoServico.home.title' },
        loadChildren: () => import('./tipo-servico/tipo-servico.routes'),
      },
      {
        path: 'tipo-despesa',
        data: { pageTitle: 'appErpApp.tipoDespesa.home.title' },
        loadChildren: () => import('./tipo-despesa/tipo-despesa.routes'),
      },
      {
        path: 'situacao',
        data: { pageTitle: 'appErpApp.situacao.home.title' },
        loadChildren: () => import('./situacao/situacao.routes'),
      },
      {
        path: 'grupo-despesa',
        data: { pageTitle: 'appErpApp.grupoDespesa.home.title' },
        loadChildren: () => import('./grupo-despesa/grupo-despesa.routes'),
      },
      {
        path: 'grupo-pagamento',
        data: { pageTitle: 'appErpApp.grupoPagamento.home.title' },
        loadChildren: () => import('./grupo-pagamento/grupo-pagamento.routes'),
      },
      {
        path: 'grupo-servico',
        data: { pageTitle: 'appErpApp.grupoServico.home.title' },
        loadChildren: () => import('./grupo-servico/grupo-servico.routes'),
      },
      {
        path: 'controle-comanda',
        data: { pageTitle: 'appErpApp.controleComanda.home.title' },
        loadChildren: () => import('./controle-comanda/controle-comanda.routes'),
      },
      {
        path: 'relatorio',
        data: { pageTitle: 'appErpApp.relatorio.home.title' },
        loadChildren: () => import('./relatorio/relatorio.routes'),
      },
      {
        path: 'relatorio-comanda',
        data: { pageTitle: 'appErpApp.relatorioComanda.home.title' },
        loadChildren: () => import('./relatorio-comanda/relatorio-comanda.routes'),
      },

      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
