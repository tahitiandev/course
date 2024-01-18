import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EpargnesPageRoutingModule } from './epargnes-routing.module';

import { EpargnesPage } from './epargnes.page';
import { EpargnesListComponent } from '../epargnes-list/epargnes-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpargnesPageRoutingModule
  ],
  declarations: [EpargnesPage, EpargnesListComponent]
})
export class EpargnesPageModule {}
