import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  courseForm : FormGroup;
  listeArticle : Articles [] = [];
  // courseForm = new FormGroup ({
    
  // });
  constructor(private articleService : ArticlesService,
              private platsService : PlatsService,
              private formbuilder : FormBuilder) {

   }

  ngOnInit() {
    this.loadData()
    this.initCourseForm()
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

  initCourseForm(){
    this.courseForm = this.formbuilder.group({
      date : '',
      libelle : '',
      article : '',
      platToArticles : ''
    })
  }

  async loadArticle(){
    const formValue = await this.courseForm.value
    const article = await this.articleService.searchArticleByArticleCode(formValue.article)
    this.listeArticle.push(article)
    this.courseForm.patchValue({
      article : ''
    })
  }

  async loadArticleFromPlat(){
    const formValue = await this.courseForm.value
    const plats = await this.platsService.searchPlatByLibelle(formValue.platToArticles)

    if(plats){
      for(let article of plats.codeArticle){
        var articleInPlat = await this.articleService.searchArticleByArticleCode(article)
        this.listeArticle.push(articleInPlat)
      }
      
      this.courseForm.patchValue({
        platToArticles : ''
      })

    }

  }

  async onSubmit(){

    const formValue = await this.courseForm.value

  }


}
