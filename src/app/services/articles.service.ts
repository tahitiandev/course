import { Injectable } from '@angular/core';
import { Articles, FamilleArticle } from '../models/articles';
import { Storage } from '@ionic/storage';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private storage : Storage,
              private utility : UtilityService) { }

    private articles : Articles [] = [
    {
      code : 'FLORA',
      libelle : 'Oranges',
      prix : 100
    },
    {
      code : 'FLTOM',
      libelle : 'Tomates',
      prix : 10
    },
    {
      code : 'FLCAR',
      libelle : 'Carrotte',
      prix : 500
    },
    {
      code : 'VCJAM',
      libelle : 'Jambon',
      prix : 109
    },
    {
      code : 'BOILAI',
      libelle : 'Lait Vai Ora',
      prix : 95
    },
  ];

  private famille : FamilleArticle[] = [
    {
      code : 'CON',
      libelle : 'Congelé'
    },
    {
      code : 'BOI',
      libelle : 'Boisson'
    },
    {
      code : 'PDJ',
      libelle : 'Petit déjeuner'
    },
    {
      code : 'OUT',
      libelle : 'Outillage'
    },
  ]

    articlesFromLocalStorage : Articles[];

  // setArticleToLocalStorage(){
  //   this.storage.set(this.utility.localstorage.articles, this.articles)
  // }

  // async setFamilleArticleToLocalStorage() {
  //   await this.storage.set(this.utility.localstorage['famille d\'articles'], this.famille)
  // }

  updateArticle(id : number){
    this.storage.get('articles').then(articles => {

      if(articles){

        this.articles = [];


        this.articles.push(articles)

      }

    })
  }

  async getArticleFromLocalStorage (){
    const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles)
    return articles;
  }

  // Methode qui fonctionne plus
  // Il était utilisé dans le tab2
  // async setArticleRealDataToLocalStorage(articles : Articles []){
  //   if(articles){
  //     await this.storage.set(this.utility.localstorage.articles, articles)
  //   }
  // }
  async setArticleRealDataToLocalStorage(newArticle : Articles){

    var articles : Articles [] = [];
    const articlesLS = await this.getArticleFromLocalStorage();

    if(articlesLS){
      for(let article of articlesLS){
        await articles.push(article)
      }

      await articles.push(newArticle)
      await this.storage.set(this.utility.localstorage.articles, articles)

    }
  }

  async setFamilleArticleRealDataToLocalStorage(familleArticle : FamilleArticle){
    const temp : FamilleArticle[] = [];

    const familles = await this.storage.get(this.utility.localstorage['famille d\'articles'])

    for(let famille of familles){
      await temp.push(famille)
    }

    await temp.push(familleArticle)

    this.storage.set(this.utility.localstorage['famille d\'articles'], temp)

  }

  async getFamilleArticleFromLocalStorage(){
    const familles : FamilleArticle [] =  await this.storage.get(this.utility.localstorage['famille d\'articles'])
    return familles;
  }

  async searchArticleByArticleCode(articleCode : string){
    this.articles = [];

    const articles = await this.getArticleFromLocalStorage();
    this.articles = articles;

    const result = await this.articles.find((article : Articles) => {
      return article.code === articleCode
    })

    return result;

  }




}
