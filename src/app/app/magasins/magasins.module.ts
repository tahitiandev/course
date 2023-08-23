import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MagasinsPageRoutingModule } from './magasins-routing.module';

import { MagasinsPage } from './magasins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MagasinsPageRoutingModule
  ],
  declarations: [MagasinsPage]
})
export class MagasinsPageModule {}
