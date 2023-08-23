import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MagasinsPage } from './magasins.page';

const routes: Routes = [
  {
    path: '',
    component: MagasinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagasinsPageRoutingModule {}
