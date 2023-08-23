import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamillesPageRoutingModule } from './familles-routing.module';

import { FamillesPage } from './familles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamillesPageRoutingModule
  ],
  declarations: [FamillesPage]
})
export class FamillesPageModule {}
