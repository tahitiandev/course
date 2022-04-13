import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SerachArticlePageRoutingModule } from './serach-article-routing.module';

import { SerachArticlePage } from './serach-article.page';
import { ArticlesFilterPipe } from 'src/app/pipes/articles-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SerachArticlePageRoutingModule
  ],
  declarations: [SerachArticlePage, ArticlesFilterPipe]
})
export class SerachArticlePageModule {}
