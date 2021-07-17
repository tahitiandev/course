import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilleDetailPage } from './famille-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FamilleDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilleDetailPageRoutingModule {}
