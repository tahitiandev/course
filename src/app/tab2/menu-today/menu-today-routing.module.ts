import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTodayPage } from './menu-today.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTodayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTodayPageRoutingModule {}
