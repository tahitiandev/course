import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorixPrixPageRoutingModule } from './historix-prix-routing.module';

import { HistorixPrixPage } from './historix-prix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorixPrixPageRoutingModule
  ],
  declarations: [HistorixPrixPage]
})
export class HistorixPrixPageModule {}
