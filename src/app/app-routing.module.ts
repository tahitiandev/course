import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app/home/home.module').then( m => m.HomePageModule),
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'utilisateur-groupes',
    loadChildren: () => import('./securite/utilisateur-groupes/utilisateur-groupes.module').then( m => m.UtilisateurGroupesPageModule)
  },
  {
    path: 'creation-utilisateur',
    loadChildren: () => import('./securite/utilisateurs/utilisateurs.module').then( m => m.UtilisateursPageModule)
  },
  {
    path: 'authentification',
    loadChildren: () => import('./securite/authentification/authentification.module').then( m => m.AuthentificationPageModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('./app/articles/articles.module').then( m => m.ArticlesPageModule)
  },
  {
    path: 'course-details/:id',
    loadChildren: () => import('./app/course-details/course-details.module').then( m => m.CourseDetailsPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./app/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'familles',
    loadChildren: () => import('./app/familles/familles.module').then( m => m.FamillesPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./app/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'magasins',
    loadChildren: () => import('./app/magasins/magasins.module').then( m => m.MagasinsPageModule)
  },
  {
    path: 'menu-semaine',
    loadChildren: () => import('./app/menu-semaine/menu-semaine.module').then( m => m.MenuSemainePageModule)
  },
  {
    path: 'plats',
    loadChildren: () => import('./app/plats/plats.module').then( m => m.PlatsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./app/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'plat-details/:id',
    loadChildren: () => import('./app/plat-details/plat-details.module').then( m => m.PlatDetailsPageModule)
  },  {
    path: 'utilisateur-liste',
    loadChildren: () => import('./securite/utilisateur-liste/utilisateur-liste.module').then( m => m.UtilisateurListePageModule)
  },
  {
    path: 'memo',
    loadChildren: () => import('./app/memo/memo.module').then( m => m.MemoPageModule)
  },
  {
    path: 'historique-prix',
    loadChildren: () => import('./app/historique-prix/historique-prix.module').then( m => m.HistoriquePrixPageModule)
  },
  {
    path: 'depenses',
    loadChildren: () => import('./app/depenses/depenses.module').then( m => m.DepensesPageModule)
  },
  {
    path: 'apports',
    loadChildren: () => import('./app/apports/apports.module').then( m => m.ApportsPageModule)
  },
  {
    path: 'epargnes',
    loadChildren: () => import('./app/epargnes/epargnes.module').then( m => m.EpargnesPageModule)
  },
  {
    path: 'budgets',
    loadChildren: () => import('./app/budgets/budgets.module').then( m => m.BudgetsPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
