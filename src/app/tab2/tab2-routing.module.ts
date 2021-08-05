import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'article-details/:id',
    loadChildren: () => import('./article-details/article-details.module').then( m => m.ArticleDetailsPageModule)
  },
  {
    path: 'article-add',
    loadChildren: () => import('./article-add/article-add.module').then( m => m.ArticleAddPageModule)
  },  {
    path: 'article-list',
    loadChildren: () => import('./article-list/article-list.module').then( m => m.ArticleListPageModule)
  },
  {
    path: 'menu-list',
    loadChildren: () => import('./menu-list/menu-list.module').then( m => m.MenuListPageModule)
  },
  {
    path: 'menu-today',
    loadChildren: () => import('./menu-today/menu-today.module').then( m => m.MenuTodayPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
