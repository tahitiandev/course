import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleAddPage } from './article-add.page';

const routes: Routes = [
  {
    path: '',
    component: ArticleAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleAddPageRoutingModule {}
