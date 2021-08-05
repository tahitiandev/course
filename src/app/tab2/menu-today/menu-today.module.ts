import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTodayPageRoutingModule } from './menu-today-routing.module';

import { MenuTodayPage } from './menu-today.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MenuTodayPageRoutingModule
  ],
  declarations: [MenuTodayPage]
})
export class MenuTodayPageModule {}
