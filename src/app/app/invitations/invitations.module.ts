import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationsPageRoutingModule } from './invitations-routing.module';

import { InvitationsPage } from './invitations.page';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitationsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [InvitationsPage]
})
export class InvitationsPageModule {}
