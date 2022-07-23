import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/models/articles';
import { HistoriquePrix } from 'src/app/models/historiquePrix';
import { ArticlesService } from 'src/app/services/articles.service';
import { HistoriquePrixService } from 'src/app/services/historique-prix.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-historix-prix',
  templateUrl: './historix-prix.page.html',
  styleUrls: ['./historix-prix.page.scss'],
})
export class HistorixPrixPage implements OnInit {

  constructor(private utility : UtilityService,
              private articleService : ArticlesService,
              private historiquePrixService : HistoriquePrixService) { }

  historiquePrix : Array<HistoriquePrix> = [];
  articles : Array<Articles> = [];

  ngOnInit() {
    this.onInit();
  }

  private async onInit(){

    const historiquePrix = await this.getHistoriquePrix();
    this.historiquePrix = historiquePrix;

    const articles = await this.getArticleOnHistoriquePrix();
    this.articles = articles;

  }

  public async getHistoriquePrix(){
    const historiquePrix : Array<HistoriquePrix> = await this.historiquePrixService.getHistoriquePrix();
    return historiquePrix;
  }

  public async getArticleOnHistoriquePrix(){
    const articles : Array<Articles> = await this.articleService.getArticles();
    const historixPrix = await this.getHistoriquePrix();
    const articleFilter : Array<Articles> = [];
    for(let historique of historixPrix){
      articleFilter.push(articles.find(articles => articles.code === historique.articleId));
    }

    return articleFilter;
    

  }

  public async getEvolutionPrix(articles : Articles){

    

  }

}
