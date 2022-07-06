import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { AlertInput } from '@ionic/core';
import { UtilityService } from 'src/app/services/utility.service';
import { Memos } from 'src/app/models/memo';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {

  constructor(private alertController : AlertController,
              private articleService : ArticlesService,
              private utility : UtilityService) { }
  
  articles : Array<Articles>;

  ngOnInit() {
  }

  private async onInit(){
    const articles = await this.getArticles();
    this.articles = articles;

  }

  private async getArticles (){
    const articles = await this.articleService.getArticles();
    return articles;
  }

  private async getArticlesAlertResponse(response : Articles){

    const memo : Array<Memos> = this.utility

  }

  public async getArticlesAlert(){

    const articles = await this.articleService.orderByArticleName(await this.getArticles());
    const inputs : Array<AlertInput> = [];
    articles.map(articles => {
      inputs.push({
        name : 'article',
        type : 'radio',
        label : articles.libelle,
        value : articles

      })
    })

    this.utility.postAlert(inputs, this.getArticlesAlertResponse);
    

  }




}
