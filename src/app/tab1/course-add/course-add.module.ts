import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseAddPageRoutingModule } from './course-add-routing.module';

import { CourseAddPage } from './course-add.page';
import { AppModule } from 'src/app/app.module';
import { ArticlesFilterPipe } from 'src/app/pipes/articles-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CourseAddPageRoutingModule,
    // ArticlesFilterPipe
  ],
  exports:[],
  declarations: [CourseAddPage,
  ArticlesFilterPipe]
})
export class CourseAddPageModule {}
