import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-search-article-card',
  templateUrl: './search-article-card.component.html',
  styleUrls: ['./search-article-card.component.scss'],
})
export class SearchArticleCardComponent implements OnInit {

  constructor(private articleService : ArticlesService) { }

  searchValue : string = "";
  articles : Array<Articles>;

  ngOnInit() {
    this.onInit();
  }

  private async onInit(){
    const articles = await this.getArticles();
    this.articles = articles
  }

  private async getArticles (){
    const articles : Array<Articles> = await this.articleService.getArticles();
    return articles;
  }



}
