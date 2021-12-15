import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleListPageRoutingModule } from './article-list-routing.module';

import { ArticleListPage } from './article-list.page';
import { ArticlesFilterPipe } from 'src/app/pipes/articles-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleListPageRoutingModule
  ],
  declarations: [ArticleListPage,ArticlesFilterPipe]
})
export class ArticleListPageModule {}
