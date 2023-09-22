import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriquePrixPage } from './historique-prix.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriquePrixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriquePrixPageRoutingModule {}
