import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtilisateursPageRoutingModule } from './utilisateurs-routing.module';

import { UtilisateursPage } from './utilisateurs.page';
import { AffecteUtilisateurGroupeComponent } from '../affecte-utilisateur-groupe/affecte-utilisateur-groupe.component';
import { CreerGroupeComponent } from '../creer-groupe/creer-groupe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtilisateursPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UtilisateursPage, AffecteUtilisateurGroupeComponent, CreerGroupeComponent]
})
export class UtilisateursPageModule {}
