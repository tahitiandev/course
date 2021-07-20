import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/models/articles';
import { Plats } from 'src/app/models/plats';
import { ArticlesService } from 'src/app/services/articles.service';
import { PlatsService } from 'src/app/services/plats.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.page.html',
  styleUrls: ['./course-add.page.scss'],
})
export class CourseAddPage implements OnInit {

  articles : Articles [] = [];
  plats : Plats [] = [];


  constructor(private articleService : ArticlesService,
              private platsService : PlatsService) {

   }

  ngOnInit() {
    this.loadData()
  }

  async loadData(){
    await this.getArticles();
    await this.getPlats();
  }
  
  private async getArticles(){
    const articles = await this.articleService.getArticleFromLocalStorage();
    this.articles = articles;
  }

  private async getPlats(){
    const plats = await this.platsService.getPlatFromLocalStorage();
    this.plats = plats;
  }


}
