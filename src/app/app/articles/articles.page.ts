import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput, AlertOptions, IonicModule } from '@ionic/angular';
import { ArticlesService } from '../../services/articles.service';
import { Articles } from '../../models/Articles';
import { Magasins } from '../../models/Magasins';
import { MagasinsService } from '../../services/magasins.service';
import { FamillesService } from '../../services/familles.service';
import { Familles } from '../../models/Familles';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  articles : Array<Articles> = [];
  familles : Array<Familles> = [];
  magasins : Array<Magasins> = [];

  constructor(private articlesService : ArticlesService,
              private magasinsService : MagasinsService,
              private famillesService : FamillesService,
              private utility : UtilityService,
              private alertController : AlertController) { }

    ngOnInit() {
    this.refresh();
  }

  private async refresh(){
    const articles = await this.getArticles();
    this.articles = articles;

    const familles = await this.getFamilles();
    this.familles = familles;

    const magasins = await this.getMagasins();
    this.magasins = magasins;
  }

  private async getArticles(){
    return await this.articlesService.get();
  }

  private async getFamilles(){
    const familles : Array<Familles> = await this.famillesService.get();
    return familles;
  }

  private async getMagasins(){
    const magasins : Array<Magasins> = await this.magasinsService.get();
    return magasins;
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          label : 'Nom de l\'article'
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (article : Articles) => {

            this.postChooseMagasin(article.libelle)

          }
        }
        
      ]
    });

    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }

  public async postChooseMagasin(libelle : string){

    var inputs : Array<AlertInput> = [];

    this.magasins.map(magasin => inputs.push({
      type : 'radio',
      value : magasin.id,
      label : magasin.libelle
    }))


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sélectionner un magasin',
      inputs: inputs,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (magasinId : number) => {

            var dataSend = {
              libelle : libelle,
              magasinId : magasinId
            }

            await this.postChoosePrix(dataSend);
            

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async postChoosePrix(dataSend : any){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Renseigner un prix',
      inputs: [
        {
          type : 'number',
          name : 'prix'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (prix : any) => {

            dataSend.prix = prix.prix;
            await this.postChooseFamille(dataSend);            

          }
        }
        
      ]
    });

    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }

  public async postChooseFamille(dataSend : any){

    var inputs : Array<AlertInput> = [];

    this.familles.map(famille => inputs.push({
      type : 'radio',
      value : famille.id,
      label : famille.libelle
    }))

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: inputs,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (familleId : number) => {
            
            var article : Articles = {
              id : Date.now(),
              libelle : dataSend.libelle,
              prix : [
                {
                  magasin : dataSend.magasinId,
                  prix : Number(dataSend.prix)
                }
              ],
              createdOn : new Date(),
              groupeId : [ (await this.utility.getConnexionInfo()).groupeId ],
              familleId : familleId
            };

            await this.articlesService.post(article);
            this.refresh();
            

          }
        }
        
      ]
    });

    await alert.present();
  }


  public async put(article : Articles){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          label : 'Nom de l\'article',
          value : article.libelle
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Voir les prix',
          cssClass: 'secondary',
          handler: async () => {
            await this.putPrix(article)
          }
        }
        ,{
          text: 'Valider',
          handler: async (data : any) => {

            article.libelle = data.libelle;
            await this.articlesService.put(article);

          }
        }
        
      ]
    });

    await alert.present();
  }

  private async putPrix(article : Articles){

    const inputs : Array<AlertInput> = [];

    article.prix.map(async prix => {
      var magasin = await this.magasins.find(magasin => magasin.id == prix.magasin)
      inputs.push({
        type : 'radio',
        label : prix.prix + 'F ' + magasin?.libelle,
        value : {
          prix : prix,
          article : article
        }
      })
    }
    )

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: inputs,
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Ajouter un prix',
          cssClass: 'secondary',
          handler: async () => {
            await this.postNouveauPrixChooseMagasin(article);
          }
        },
        {
          text: 'Modifier le prix',
          handler: async (data : any) => {
            console.log(data)
          }
        }
        
      ]
    });

    await alert.present();
  }

  private async postNouveauPrixChooseMagasin(article : Articles){

    const inputs : Array<AlertInput> = [];
    const magasins : Array<Magasins> = await this.magasinsService.get();
    const magainsParse :Array<Magasins> = [];
    await magasins.filter(magasin => {
      for(let magasinExiste of article.prix){
        if(magasinExiste.magasin !== magasin.id){
          magainsParse.push(magasin);
        }
      }
    })
    magainsParse.map(magasin => inputs.push({
      type : 'radio',
      label : magasin.libelle,
      value : {
        magasin : magasin,
        article : article
      }
    }))

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: inputs,
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Valider',
          handler: async (data : any) => {
            await this.postNouveauPrixChoosePrix(data)
          }
        }
        
      ]
    });

    await alert.present();
  }

  private async postNouveauPrixChoosePrix(dataSend : any){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: [
        {
          type : 'number',
          name : 'prix'
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Valider',
          handler: async (data : any) => {
            
            dataSend.article.prix.push({
              magasin : dataSend.magasin.id,
              prix : data.prix
            })

            await this.articlesService.put(dataSend.article);

          }
        }
        
      ]
    });

    await alert.present();
  }

}
