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
import { BarreCodeService } from 'src/app/services/barre-code.service';

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
  newIngredient : any;

  constructor(private snap : ActivatedRoute,
              private storage : Storage,
              private utility : UtilityService,
              private articleService : ArticlesService,
              private alertController: AlertController,
              private platsservice : PlatsService,
              private barreCodeService : BarreCodeService) { }

  ngOnInit() {
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
    return articles;

  }

  private async getIngredient(codeArticle : any []){

    await this.getArticleFromLocalStorage()
    
    for(let code of codeArticle){

      for(let article of this.articles){

        if(code.codeArticle === article.code){

          const articless = await this.articleService.getArticleByArticleCode(code.codeArticle)
          const ingred = {
            codeArticle : code.codeArticle,
            quantite : code.quantite,
            prix : articless.prix,
            libelle : articless.libelle
          }
  
          this.ingredients.push(ingred)

        }

      }

    } // for

  }//getIngredient

  
  async deleteArticle(ingredient : CodeArticle){
    
   // ingredients
    const indexIngredient = await this.ingredients.findIndex(result => {
      return result.codeArticle === ingredient.codeArticle && result.quantite === ingredient.quantite;
    })

    // platDetail
    const indexPlatDetail = await this.platDetail.codeArticle.findIndex(result => {
      return result.codeArticle === ingredient.codeArticle && result.quantite === ingredient.quantite;
    })

    // plats
    const indexPlat = await this.plats.findIndex(result => {
      return result.libelle === this.platDetail.libelle
    })
    
    this.platDetail.codeArticle.splice(indexPlatDetail,1)
    this.plats[indexPlat].codeArticle.splice(indexPlat,1)
    this.ingredients.splice(indexIngredient,1)

    // Recalcule le prix total du plat
    var prix = await this.platsservice.calculePrixTotalPlat(this.plats[indexPlat]);
    this.plats[indexPlat].prix = prix
    
    this.storage.set(this.utility.localstorage.Plats, this.plats)

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

    const articlesToLocalStorage : Array<Articles> = await this.storage.get(this.utility.localstorage.articles)
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

          }
        }, {
          text: 'Ok',
          handler: async (ingredient : any) => {

            var newIngredient = {
              codeArticle : ingredient.code,
              libelle : ingredient.libelle,
              prix : ingredient.prix
            };

            this.newIngredient = newIngredient
            this.addIngredientQuantite()

          }
        }
      ]
    });

    await alert.present();

  } // addIngredient

  async addIngredientByBarreCode(){
    const barreCode = await this.barreCodeService.scanneBarreCode()
    const article = await this.articleService.getArticleByBarreCode(barreCode);

    var newIngredient = {
      codeArticle : article.code,
      libelle : article.libelle,
      prix : article.prix
    };
    this.newIngredient = newIngredient
    this.addIngredientQuantite();

  }

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

          }
        }, {
          text: 'Ok',
          handler: async (resultat) => {
            this.newIngredient = {
              codeArticle : this.newIngredient.codeArticle,
              libelle : this.newIngredient.libelle,
              prix : this.newIngredient.prix,
              quantite : resultat.quantite,
              firebase : false
            }

            // 1 - Recherche le plat en cours
            const plat : Plats = await this.plats.find(s => {
                return s.libelle === this.libelle
            })

            plat.codeArticle.push({
               codeArticle : this.newIngredient.codeArticle,
               quantite : this.newIngredient.quantite
            })

            // Recalcule le prix total du plat
            var prix = await this.platsservice.calculePrixTotalPlat(plat)
            plat.prix = prix

            if(plat.firebase){
              plat.isModified = true;
            }else{
              plat.isModified = false;
            }

            this.newIngredient = {
              code : '',
              libelle : '',
              prix : 0,
              quantite : 0
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
          label : 'Code article',
          value : this.ingredients[index].codeArticle,
          disabled : true
        },
        {
          type : 'text',
          name : 'libelle',
          label : 'Libellé',
          value : this.ingredients[index].libelle
        },
        {
          type : 'number',
          name : 'quantite',
          label : 'Qantité',
          value : this.ingredients[index].quantite
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Valider',
          handler: async (resultat : any) => {

            var codeArticles : CodeArticle [] = [];

            for(var i = 0; i < this.ingredients.length; i++){
              if(i === index){
                codeArticles.push({
                  codeArticle :resultat.codeArticle,
                  quantite : resultat.quantite
                })
              }else{
                codeArticles.push({
                  codeArticle :this.ingredients[i].codeArticle,
                  quantite : this.ingredients[i].quantite
                })
              }
            }

            const platsInfo = await this.plats.find(s => {
              return s.libelle === this.libelle;
            })

            var plat : Plats = {
              libelle : this.libelle,
              codeArticle : codeArticles,
              prix : platsInfo.prix,
              firebase : platsInfo.firebase,
              isModified : platsInfo.isModified,
              documentId : platsInfo.documentId
            }

            // Recalcule le prix total du plat
            const prix = await this.platsservice.calculePrixTotalPlat(plat)
            plat.prix = prix;

            if(platsInfo.firebase){
              plat.isModified = true;
            }else{
              plat.isModified = false;
            }
            
            
            this.platsservice.putPlat(plat)

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
