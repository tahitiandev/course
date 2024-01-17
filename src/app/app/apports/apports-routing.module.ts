import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApportsPage } from './apports.page';

const routes: Routes = [
  {
    path: '',
    component: ApportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApportsPageRoutingModule {}
