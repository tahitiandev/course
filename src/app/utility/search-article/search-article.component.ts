import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/models/articles';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.scss'],
})
export class SearchArticleComponent implements OnInit {

  constructor(private storage : Storage,
              private utility : UtilityService) { }

  articles :  Articles [] = []
  test = [1,2,3,4]

  ngOnInit() {
    this.getArticles()
  }

  async getArticles(){
    const articles : Articles [] =  await this.storage.get(this.utility.localstorage.articles)
    this.articles = articles
  }



}
