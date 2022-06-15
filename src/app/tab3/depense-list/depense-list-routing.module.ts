import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepenseListPage } from './depense-list.page';

const routes: Routes = [
  {
    path: '',
    component: DepenseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepenseListPageRoutingModule {}
