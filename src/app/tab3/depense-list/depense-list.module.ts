import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepenseListPageRoutingModule } from './depense-list-routing.module';

import { DepenseListPage } from './depense-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepenseListPageRoutingModule
  ],
  declarations: [DepenseListPage]
})
export class DepenseListPageModule {}
