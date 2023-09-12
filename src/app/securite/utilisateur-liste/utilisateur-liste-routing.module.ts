import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilisateurListePage } from './utilisateur-liste.page';

const routes: Routes = [
  {
    path: '',
    component: UtilisateurListePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilisateurListePageRoutingModule {}
