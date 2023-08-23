import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtilisateurGroupesPageRoutingModule } from './utilisateur-groupes-routing.module';

import { UtilisateurGroupesPage } from './utilisateur-groupes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtilisateurGroupesPageRoutingModule
  ],
  declarations: [UtilisateurGroupesPage]
})
export class UtilisateurGroupesPageModule {}
