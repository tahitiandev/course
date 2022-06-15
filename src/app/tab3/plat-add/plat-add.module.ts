import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatAddPageRoutingModule } from './plat-add-routing.module';

import { PlatAddPage } from './plat-add.page';
// import { PlatArticleSearchPipe } from 'src/app/pipes/plat-article-search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatAddPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PlatAddPage
    // ,PlatArticleSearchPipe
  ]
})
export class PlatAddPageModule {}
