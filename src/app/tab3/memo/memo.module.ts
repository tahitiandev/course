import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoPageRoutingModule } from './memo-routing.module';

import { MemoPage } from './memo.page';
import { SearchArticleCardComponent } from 'src/app/utility/search-article-card/search-article-card.component';
import { ArticlesFilterPipe } from '../../pipes/articles-filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoPageRoutingModule
  ],
  declarations: [
    MemoPage,
    SearchArticleCardComponent,
    ArticlesFilterPipe]
})
export class MemoPageModule {}
