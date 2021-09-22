import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeArticle, Plats } from 'src/app/models/plats';
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

  private async getIngredient(codeArticle : any []){

    await this.getArticleFromLocalStorage()
    
    for(let code of codeArticle){

      for(let article of this.articles){

        if(code.codeArticle === article.code){

          const articless = await this.articleService.searchArticleByArticleCode(code.codeArticle)
          const ingred = {
            codeArticle : code.codeArticle,
            quantite : code.quantite,
            prix : articless.prix,
            libelle : articless.libelle
          }
  
          this.ingredients.push(ingred)

        }

      }

    }

  }//getIngredient



  async deleteArticle(index : number){

    const plat = await this.plats.find(s => {
      return s.libelle === this.libelle
    })

    var newIngredient = [];

    // à finir
    for(let ingredient of plat.codeArticle){
      
      console.log(ingredient)

    }

  }







}
