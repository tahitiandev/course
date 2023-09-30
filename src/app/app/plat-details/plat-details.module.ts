import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatDetailsPageRoutingModule } from './plat-details-routing.module';

import { PlatDetailsPage } from './plat-details.page';
import { SearchArticlePlatComponent } from 'src/app/utility/search-article-plat/search-article-plat.component';
import { ArticleFiltrePlatPipe } from 'src/app/pipes/article-filtre-plat.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatDetailsPageRoutingModule
  ],
  declarations: [PlatDetailsPage, ArticleFiltrePlatPipe, SearchArticlePlatComponent]
})
export class PlatDetailsPageModule {}
