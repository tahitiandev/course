import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpargnesPage } from './epargnes.page';

const routes: Routes = [
  {
    path: '',
    component: EpargnesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpargnesPageRoutingModule {}
