import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./securite/authentification/authentification.module').then( m => m.AuthentificationPageModule),
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
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
