import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatDetailsPageRoutingModule } from './plat-details-routing.module';

import { PlatDetailsPage } from './plat-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatDetailsPageRoutingModule
  ],
  declarations: [PlatDetailsPage]
})
export class PlatDetailsPageModule {}
