import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SerachArticlePage } from './serach-article.page';

const routes: Routes = [
  {
    path: '',
    component: SerachArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerachArticlePageRoutingModule {}
