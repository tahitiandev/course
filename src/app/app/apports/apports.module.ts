import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApportsPageRoutingModule } from './apports-routing.module';

import { ApportsPage } from './apports.page';
import { ApportsListComponent } from '../apports-list/apports-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApportsPageRoutingModule
  ],
  declarations: [ApportsPage,ApportsListComponent]
})
export class ApportsPageModule {}
