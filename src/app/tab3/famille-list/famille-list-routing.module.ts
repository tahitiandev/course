import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilleListPage } from './famille-list.page';

const routes: Routes = [
  {
    path: '',
    component: FamilleListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilleListPageRoutingModule {}
