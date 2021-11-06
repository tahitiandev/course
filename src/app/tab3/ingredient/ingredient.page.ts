import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeArticle, Plats } from 'src/app/models/plats';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';
import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { AlertController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { PlatsService } from 'src/app/services/plats.service';

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
  newIngredient : Articles;

  constructor(private snap : ActivatedRoute,
              private storage : Storage,
              private utility : UtilityService,
              private articleService : ArticlesService,
              private alertController: AlertController,
              private platsservice : PlatsService) { }

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
    
    var codeArticleCorrige : CodeArticle [] = []

    for(let i = 0; i < this.platDetail.codeArticle.length; i++){
      if(i != index){
        await codeArticleCorrige.push(this.platDetail.codeArticle[i])
      }
    }

    var platDetailCorrige : Plats = await {
      libelle : this.libelle,
      codeArticle : codeArticleCorrige,
      firebase : false
    }

    this.ingredients = []
    this.getIngredient(codeArticleCorrige)

    var platsCorrige : Plats [] = [];

    for(let plat of this.plats){

      if(plat.libelle === this.libelle){
        platsCorrige.push(platDetailCorrige)
      }

      if(plat.libelle != this.libelle){
        platsCorrige.push(plat)
      }

    }

    this.storage.set(this.utility.localstorage.Plats, platsCorrige)

  }


  async deleteArticletest(index : number){

    // 1 - Recherche le plat en cours
    const plat = await this.plats.find(s => {
      return s.libelle === this.libelle
    })


    // 2- Init varaible qui stock les nouveaux ingrédients
    var newIngredient = [];

    // 3- Ajouter les nouveaux ingédients
    for(var x = 0; x < plat.codeArticle.length; x++){
      // On Vérifique qu'on ne prenne bien pas en compte l'ingédient en cours
      if(x != index){
        newIngredient.push(plat.codeArticle[x])
      }
    }

    // 4- On rajoute le libellé et le prix et le libellé
    this.ingredients = []
    this.getIngredient(newIngredient)

    var newCodeArticle : CodeArticle[] = []
    for(let code of this.ingredients){
      newCodeArticle.push({
        codeArticle : code.codeArticle,
        quantite : code.quantite
      })
    }

    // 4- On set le plat avec les nouveaux ingrédients
    var newPlat : Plats = await {
      libelle : this.libelle,
      codeArticle : newCodeArticle,
      firebase : false
    }
    // console.log(newPlat)

    // 5- On met à jour le nouveau plat dans la liste complète
    var newAllPlat : Plats [] = await [];
    
    for(let plat of this.plats){
      if(plat.libelle != newPlat.libelle){
        await newAllPlat.push(plat)
      }
      if(plat.libelle === newPlat.libelle){
        await newAllPlat.push(newPlat)
      }
    }

    // 6- On met à jour le localstorage
    await this.storage.set(this.utility.localstorage.Plats, newAllPlat)

  }

  private sortByArticleName(articles : Array<Articles>){
    return articles.sort((a,b) => {
      let x  = a.libelle.toLowerCase();
      let y  = b.libelle.toLowerCase();
      if(x < y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }

  async addIngredient(){

    const articlesToLocalStorage : Articles [] = await this.storage.get(this.utility.localstorage.articles)
    const articles = await this.sortByArticleName(articlesToLocalStorage)
    var radioOption : AlertInput [] = [];
    
    for(let article of articles){
      radioOption.push({
        type : 'radio',
        name : article.code,
        label : article.libelle + ' ' + article.prix + ' xpf',
        value : {
          code : article.code,
          libelle : article.libelle,
          prix : article.prix
        }
      })
    }


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sélectionner un article',
      inputs: radioOption,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (ingredient : Articles) => {

            // console.log(ingredient)

            var newIngredient = {
              code : ingredient.code,
              libelle : ingredient.libelle,
              prix : ingredient.prix,
              firebase : false
            };

            this.newIngredient = newIngredient
            this.addIngredientQuantite()

          }
        }
      ]
    });

    await alert.present();

  } // addIngredient

  private async addIngredientQuantite(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sélectionner un article',
      inputs: [
        {
          type : 'number',
          name : 'quantite',
          value : 1
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (resultat) => {
            this.newIngredient = {
              code : this.newIngredient.code,
              libelle : this.newIngredient.libelle,
              prix : this.newIngredient.prix,
              quantite : resultat.quantite,
              firebase : false
            }

            // 1 - Recherche le plat en cours
            const plat = await this.plats.find(s => {
                return s.libelle === this.libelle
            })

            plat.codeArticle.push({
               codeArticle : this.newIngredient.code,
               quantite : this.newIngredient.quantite
            })

            this.newIngredient = {
              code : '',
              libelle : '',
              prix : 0,
              quantite : 0,
              firebase : false
            }

            var plats : Plats [] = [];

            for(let plattmp of this.plats){

              if(plattmp.libelle === this.libelle){
                plats.push(plat)
              }

              if(plattmp.libelle != this.libelle){
                plats.push(plattmp)
              }
            }

            this.storage.set(this.utility.localstorage.Plats, plats)
            this.ingredients = plat.codeArticle
            
            // 4- On rajoute le libellé et le prix et le libellé
            this.ingredients = []
            this.getIngredient(plat.codeArticle)

            }

        }
      ]
    });

    await alert.present();

  } // addIngredientQuantite



  async updateQuantite(index : number){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sélectionner un article',
      inputs: [
        {
          type : 'text',
          name : 'codeArticle',
          value : this.ingredients[index].libelle
        },
        {
          type : 'number',
          name : 'quantite',
          value : this.ingredients[index].quantite
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: async (resultat : CodeArticle) => {

            var codeArticles : CodeArticle [] = [];

            for(var i = 0; i < this.ingredients.length; i++){
              if(i === index){
                codeArticles.push(resultat)
              }else{
                codeArticles.push({
                  codeArticle :this.ingredients[i].codeArticle,
                  quantite : this.ingredients[i].quantite
                })
              }
            }

            // console.log(codeArticles)
            

            var plat : Plats = {
              libelle : this.libelle,
              codeArticle : codeArticles,
              firebase : false
            }

            // console.log(plat)
            
            this.platsservice.updatePlatToLocalStorage(plat)

            // 4- On rajoute le libellé et le prix et le libellé
            this.ingredients = []
            this.getIngredient(plat.codeArticle)


            
        }
      }
      ]
    });

    await alert.present();
  }

}
