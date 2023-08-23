import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilisateurGroupesPage } from './utilisateur-groupes.page';

const routes: Routes = [
  {
    path: '',
    component: UtilisateurGroupesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilisateurGroupesPageRoutingModule {}
