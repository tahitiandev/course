import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtilisateurListePageRoutingModule } from './utilisateur-liste-routing.module';

import { UtilisateurListePage } from './utilisateur-liste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtilisateurListePageRoutingModule
  ],
  declarations: [UtilisateurListePage]
})
export class UtilisateurListePageModule {}
