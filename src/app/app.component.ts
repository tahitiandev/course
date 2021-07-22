import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ArticlesService } from './services/articles.service';
import { CoursesService } from './services/courses.service';
import { PlatsService } from './services/plats.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storage : Storage,
              private articleService : ArticlesService,
              private platService : PlatsService,
              private courseService : CoursesService) {}

  ngOnInit(){
    this.loadDefaultData()
  }

  loadDefaultData(){
    this.setArticle()
    this.setFamilleArticle()
    this.setPlat()
    this.setCourse()
  }

  async setArticle(){
    const articles = await this.articleService.getArticleFromLocalStorage()
    if(articles === null){
      await this.articleService.setDefaultArticleData()
    }
  }
  async setFamilleArticle(){
    const famillles = await this.articleService.getFamilleArticleFromLocalStorage()
    if(famillles === null){
      await this.articleService.setDefaultFamilleArticleData()
    }
  }
  async setPlat(){
    const plats = await this.platService.getPlatFromLocalStorage()
    if(plats === null){
      await this.platService.setDefaultPlatData()
    }
  }
  async setCourse(){
    const courses = await this.courseService.getCourseFromLocalStorage()
    if(courses === null){
      await this.courseService.setDefaultCourseData()
    }
  }


}
