import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plats } from 'src/app/models/plats';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';
import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.page.html',
  styleUrls: ['./ingredient.page.scss'],
})
export class IngredientPage implements OnInit {

  plats : Plats[];
  libelle : string;
  private _platRechercher : Plats;
  get platRechecher(){
    return this._platRechercher;
  }
  set platRechercher(values : Plats){
    this._platRechercher = values
  }

  platDetail : Plats;
  ingredients = [];
  articles : Articles [] = [];

  constructor(private snap : ActivatedRoute,
              private storage : Storage,
              private utility : UtilityService,
              private articleService : ArticlesService) { }

  ngOnInit() {
    // this.articleService.setArticleToLocalStorage()
    this.loadPlatsFromLocalStorage();
  }

  private async loadPlatsFromLocalStorage(){

    const plats = await this.storage.get(this.utility.localstorage.Plats)
    this.plats = plats
    await this.getLibelle();
    await this.getPlatByLibelle(this.libelle)
    await this.getIngredient(this.platDetail.codeArticle)

  }

  private async getLibelle(){

    const libelle = await this.snap.snapshot.params['libelle']
    this.libelle = libelle

  }


  private async getPlatByLibelle(libelle : string){

    const plat = await this.plats.find(s => {
      return s.libelle === libelle
    })

    this.platDetail = plat

  }

  private async getArticleFromLocalStorage(){

    const articles = await this.storage.get(this.utility.localstorage.articles)
    this.articles = articles

  }

  // private async searchArticleByCode(code : string){



  // }

  private async getIngredient(codeArticle : any []){

    await this.getArticleFromLocalStorage()
    // console.log(this.articles)

    for(let article of codeArticle){

      // console.log(article)

      this.articles.find(async s => {
        // console.log(s)
        if(s.code == article.codeArticle){
          // console.log('s.code')
          const articless = await this.articleService.searchArticleByArticleCode(article.codeArticle)
          // console.log(articless)
          const ingred = {
            codeArticle : article.codeArticle,
            quantite : article.quantite,
            prix : articless.prix,
            libelle : articless.libelle
          }
  
          this.ingredients.push(ingred)
          // console.log(this.ingredients)
        }
      })

    }

  }//getIngredient

}
