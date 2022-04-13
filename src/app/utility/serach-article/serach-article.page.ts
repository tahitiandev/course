import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/models/articles';
import { UtilityService } from 'src/app/services/utility.service';
import { Storage } from '@ionic/storage';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-serach-article',
  templateUrl: './serach-article.page.html',
  styleUrls: ['./serach-article.page.scss'],
})
export class SerachArticlePage implements OnInit {

  constructor(private storage : Storage,
    private utility : UtilityService,
    private articlesService : ArticlesService) { }

    articles :  Articles [] = [];
    articlesChoose :  Articles [] = [];
    searchValue ="";

    ngOnInit() {
      this.getArticles()
    }

    async getArticles(){
      const articles : Articles [] =  await this.storage.get(this.utility.localstorage.articles)
      this.articles = this.articlesService.sortByArticleName(articles)
    }

    async addArticles(article : Articles){
      const index = await this.articles.findIndex(s => {
        return article.libelle === s.libelle
      })

      this.articlesChoose.push(this.articles[index])

      
    }

}
