import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilleListPageRoutingModule } from './famille-list-routing.module';

import { FamilleListPage } from './famille-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilleListPageRoutingModule
  ],
  declarations: [FamilleListPage]
})
export class FamilleListPageModule {}
