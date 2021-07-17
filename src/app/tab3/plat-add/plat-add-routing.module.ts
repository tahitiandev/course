import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatAddPage } from './plat-add.page';

const routes: Routes = [
  {
    path: '',
    component: PlatAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatAddPageRoutingModule {}
