import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseDetailsPageRoutingModule } from './course-details-routing.module';

import { CourseDetailsPage } from './course-details.page';
import { ArticleFiltrePipe } from 'src/app/pipes/article-filtre.pipe';
import { SearchArticleComponent } from 'src/app/utility/search-article/search-article.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseDetailsPageRoutingModule
  ],
  declarations: [CourseDetailsPage, ArticleFiltrePipe, SearchArticleComponent]
})
export class CourseDetailsPageModule {}
