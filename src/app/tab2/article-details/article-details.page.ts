import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
})
export class ArticleDetailsPage implements OnInit {

  constructor(private snap : ActivatedRoute,
              private storage : Storage,
              private utility : UtilityService,
              private nav : NavController,
              private formbuilder: FormBuilder,
              private articleService : ArticlesService) { }
  

  articleId :  number;
  article : Articles;
  articleForm = new FormGroup({
    code : new FormControl(),
    libelle : new FormControl(),
    prix : new FormControl(),
  });

  ngOnInit() {
    this.getArticleId()
  }
    
  private async getArticleId(){
    const articleId = await this.snap.snapshot.params['id']
    this.articleId = articleId
    await this.getArticleById(articleId)
  }

  private async getArticleById(id : number){
    const articles = await this.storage.get(this.utility.localstorage.articles)
    this.article = articles[id]

    this.articleForm.patchValue({
      code: this.article.code,
      libelle : this.article.libelle,
      prix : this.article.prix
    })
  }


  async onSubmit(){
    const formValue = this.articleForm.value
    // const articles : Articles [] = await this.articleService.getArticleFromLocalStorage()
    // var articleTemp : Articles []  = []

    // await articleTemp.push({
    //   code : formValue.code,
    //   libelle : formValue.libelle,
    //   prix : Number(formValue.prix)
    // })

    // for(let article of articles){
    //   if(article.code != formValue.code){
    //     await articleTemp.push(article)
    //   }
    // }


    // await this.articleService.setArticleRealDataToLocalStorage(articleTemp)

    const newArticle : Articles = {
      code : formValue.code.toUpperCase(),
      libelle : formValue.libelle,
      prix : formValue.prix 
    }
    
    this.articleService.setArticleRealDataToLocalStorage(newArticle)

    this.nav.back()
    
  } //onSubmit


}
