import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoPageRoutingModule } from './memo-routing.module';

import { MemoPage } from './memo.page';
import { SearchArticleComponent } from 'src/app/utility/search-article/search-article.component';
import { SearchArticleMemoComponent } from 'src/app/utility/search-article-memo/search-article-memo.component';
import { ArticleFiltreMemoPipe } from 'src/app/pipes/article-filtre-memo.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoPageRoutingModule
  ],
  declarations: [MemoPage, SearchArticleMemoComponent, ArticleFiltreMemoPipe]
})
export class MemoPageModule {}
