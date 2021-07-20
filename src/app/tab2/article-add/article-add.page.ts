import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Articles, FamilleArticle } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.page.html',
  styleUrls: ['./article-add.page.scss'],
})
export class ArticleAddPage implements OnInit {

  articleForm : FormGroup;
  familles : FamilleArticle [] = [];
  articlesLS : Articles [] = [];

  constructor(private formbuilder : FormBuilder,
              private articleService : ArticlesService,
              private nav : NavController) { }

  ngOnInit() {
    this.init()
    this.getFamilleFromLocalStorage()
  }

  init (){
    this.articleForm = this.formbuilder.group({
      familles : '',
      code : '',
      libelle : '',
      prix : ''
    })
  }

  async getFamilleFromLocalStorage(){
    const famille = await this.articleService.getFamilleArticleFromLocalStorage()
    this.familles = famille
  }

  async getArticleToLocalStorage(){
    const articles = await this.articleService.getArticleFromLocalStorage()
    this.articlesLS = articles
  }


  async onSubmit(){
    const formValue = await this.articleForm.value
    const newArticle : Articles = {
      code : formValue.familles.toUpperCase() + formValue.code.toUpperCase(),
      libelle : formValue.libelle,
      prix : formValue.prix 
    }
    
    this.articleService.setArticleRealDataToLocalStorage(newArticle)

    this.nav.back()




  }

}
