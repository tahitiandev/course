import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Articles } from 'src/app/models/Articles';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.scss'],
})
export class SearchArticleComponent  implements OnInit {

  constructor(private articleService : ArticlesService) { }

  searchValue : string = "";
  articles : Array<Articles> = [];
  @Output() articlesOutput = new EventEmitter<Articles>();

  ngOnInit() {
    this.onInit();
  }

  private async onInit(){
    const articles = await this.getArticles();
    this.articles = articles
  }

  private async getArticles (){
    const articles : Array<Articles> = await this.articleService.get();
    return articles;
  }

  public selectArticle(article : Articles){
    this.articlesOutput.emit(article);
  }

}
