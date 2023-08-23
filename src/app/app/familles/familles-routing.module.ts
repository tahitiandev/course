import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamillesPage } from './familles.page';

const routes: Routes = [
  {
    path: '',
    component: FamillesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamillesPageRoutingModule {}
