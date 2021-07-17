import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilleDetailPageRoutingModule } from './famille-detail-routing.module';

import { FamilleDetailPage } from './famille-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilleDetailPageRoutingModule
  ],
  declarations: [FamilleDetailPage]
})
export class FamilleDetailPageModule {}
