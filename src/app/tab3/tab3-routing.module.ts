import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'famille-list',
    loadChildren: () => import('./famille-list/famille-list.module').then( m => m.FamilleListPageModule)
  },
  {
    path: 'famille-detail/:code',
    loadChildren: () => import('./famille-detail/famille-detail.module').then( m => m.FamilleDetailPageModule)
  },
  {
    path: 'plats',
    loadChildren: () => import('./plats/plats.module').then( m => m.PlatsPageModule)
  },
  {
    path: 'ingredient/:libelle',
    loadChildren: () => import('./ingredient/ingredient.module').then( m => m.IngredientPageModule)
  },
  {
    path: 'plat-add',
    loadChildren: () => import('./plat-add/plat-add.module').then( m => m.PlatAddPageModule)
  },  {
    path: 'menu-list',
    loadChildren: () => import('./menu-list/menu-list.module').then( m => m.MenuListPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
