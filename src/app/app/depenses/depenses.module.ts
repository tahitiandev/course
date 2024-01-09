import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepensesPageRoutingModule } from './depenses-routing.module';

import { DepensesPage } from './depenses.page';
import { DepensesListComponent } from '../depenses-list/depenses-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepensesPageRoutingModule
  ],
  declarations: [DepensesPage,DepensesListComponent]
})
export class DepensesPageModule {}
