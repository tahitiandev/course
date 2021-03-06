import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'course-details/:id',
    loadChildren: () => import('./course-details/course-details.module').then( m => m.CourseDetailsPageModule)
  },
  {
    path: 'course-add',
    loadChildren: () => import('./course-add/course-add.module').then( m => m.CourseAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
