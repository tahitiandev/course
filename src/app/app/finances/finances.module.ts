import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinancesPageRoutingModule } from './finances-routing.module';

import { FinancesPage } from './finances.page';
import { FinanceListComponent } from '../finance-list/finance-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinancesPageRoutingModule
  ],
  declarations: [FinancesPage, FinanceListComponent]
})
export class FinancesPageModule {}
