import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinancesPageRoutingModule } from './finances-routing.module';

import { FinancesPage } from './finances.page';
import { FinanceListComponent } from '../finance-list/finance-list.component';
import { FinanceFormulaireComponent } from '../finance-formulaire/finance-formulaire.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinancesPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [FinancesPage, FinanceListComponent, FinanceFormulaireComponent]
})
export class FinancesPageModule {}
