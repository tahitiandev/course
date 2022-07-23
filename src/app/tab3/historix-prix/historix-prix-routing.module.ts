import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorixPrixPage } from './historix-prix.page';

const routes: Routes = [
  {
    path: '',
    component: HistorixPrixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorixPrixPageRoutingModule {}
