import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePrixPageRoutingModule } from './historique-prix-routing.module';

import { HistoriquePrixPage } from './historique-prix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriquePrixPageRoutingModule
  ],
  declarations: [HistoriquePrixPage]
})
export class HistoriquePrixPageModule {}
