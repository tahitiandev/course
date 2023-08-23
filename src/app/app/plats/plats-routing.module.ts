import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatsPage } from './plats.page';

const routes: Routes = [
  {
    path: '',
    component: PlatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatsPageRoutingModule {}
