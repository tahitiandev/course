import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatDetailsPage } from './plat-details.page';

const routes: Routes = [
  {
    path: '',
    component: PlatDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatDetailsPageRoutingModule {}
