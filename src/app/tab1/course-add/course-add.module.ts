import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseAddPageRoutingModule } from './course-add-routing.module';

import { CourseAddPage } from './course-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CourseAddPageRoutingModule
  ],
  declarations: [CourseAddPage]
})
export class CourseAddPageModule {}
