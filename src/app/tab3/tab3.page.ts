import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Setting } from '../models/setting';
import { UtilityService } from '../services/utility.service';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Articles, FamilleArticle } from '../models/articles';
import { Deleted } from '../models/deleted';
import { ArticlesService } from '../services/articles.service';
import { FirebaseService } from '../services/firebase.service';
import { AlertInput } from '@ionic/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  darkModeBtn : boolean;
  setting : Setting;
  theme = {
    'dark' : 'dark',
    'light' : 'light'
  }

  articles : Articles [] = []

  constructor(private utility : UtilityService,
              private storage : Storage,
              private firestore : AngularFirestore,
              private alertController : AlertController,
              private articleService : ArticlesService,
              private firebaseService : FirebaseService) {}
  
  ngOnInit(): void {
    this.initSetting()
  }

  async step(){
    const localStorageNames = await this.utility.transformToObject(this.utility.localstorage)
    for(let divers of localStorageNames){
      if(divers[1] != 'settings'){
        this.utility.changeValueiSModified(divers[1], false)
      }
    }
  }

  inipayeur(){

  }

  async consoleLog(){
    const articlesLS : Articles[] = await this.storage.get('articles');
    // console.log(articlesLS)
    const articles : Articles [] = this.articleService.sortByArticleCode(articlesLS)
    console.log(articles)

  }
  async consoleLogFamile(){
    const familles : FamilleArticle []  = await this.storage.get('familles');
    console.log(familles)

  }

  async initSetting(){
    const setting : Setting = await this.storage.get('settings')

    if(setting  != null){
      this.setting = setting

      // Init thème
      if(this.setting.theme === true){
        this.darkModeBtn = true
      }else{
        this.darkModeBtn = false
      }

    }else{
      console.log('Erreur d\'initialisation du setting du localstorage')
    }
  }


  goToUrl(tabNumber : string, pageName? : string){
    this.utility.goToUrl(tabNumber, pageName);    
  }

  async toggletheme(event){
    if(event.detail.checked){

      document.body.setAttribute('color-theme',this.theme.dark);
      const setting = await this.storage.get(this.utility.localstorage.Setting);
      this.setting = setting;
      this.setting.theme = true
      this.storage.set(this.utility.localstorage.Setting, this.setting)
    }else{
      document.body.setAttribute('color-theme',this.theme.light);
      const setting = await this.storage.get(this.utility.localstorage.Setting);
      this.setting.theme = false
      this.storage.set(this.utility.localstorage.Setting, this.setting)
    }
  }


  async postDataToFireStore(){
    
    this.loaderOn()
    const localStorageNames = await this.utility.transformToObject(this.utility.localstorage)
    var dataAjour : any [] = [];

    localStorageNames.forEach( async(localStorageName) => {

      if(localStorageName[1] != 'settings'){

        var datafromLocalName = await this.storage.get(localStorageName[1])        
        datafromLocalName.forEach( async (data) => {

          // si data non envoyé dans firebase
          if(!data.firebase){
            data.firebase = true;
            await this.firestore.collection(localStorageName[1])
                                .add(data)
            dataAjour.push(data)
          }// si la donnée a déjà été envoyé dans firebase
          else{

            // Si la données a été modifié
            if(data.isModified){
              await this.firestore.collection(localStorageName[1])
                                  .doc(data.documentId)
                                  .delete()
              await this.firestore.collection(localStorageName[1])
                                  .add(data)
            }
            dataAjour.push(data)
            
          }
          
        }); // foreach datafromLocalName

        this.storage.set(localStorageName[1],dataAjour);
        dataAjour= [];

      }//if

  }); // foreach localStorageNames

  // Suppression des données dans firebase
  const deletedData : Deleted [] = await this.storage.get('deleted');

  if(deletedData.length > 0){
    for(let data of deletedData){
       await this.firestore.collection(data.collectionName)
                           .doc(data.documentId)
                           .delete()
    } // for

    // Je vide le localstorage deleted
    const tableauVide : Deleted [] = []
    this.storage.set('deleted',tableauVide)

  }
  this.loaderOff()
  this.utility.popupInformation('Les données ont bien été envoyées')

  }//postDataToFireStore


  private async getDataFromFireStore(collectionName){
   
   this.firestore.collection(collectionName)
                 .snapshotChanges()
                 .subscribe((result) => {
                   var alldata = [];
                   for(let data of result){
                     var parseData : any = data.payload.doc.data();
                     parseData.documentId = data.payload.doc.id
                     
                     alldata.push(parseData)
                   }
                   this.storage.set(collectionName, alldata)
                 })    
  } //getDataFromFireStore

  private async saveOnLocalStorage(collectionName : string, data){
    await this.storage.set(collectionName,data)
  }

  async clearLocalStorage(){

      
  }

  private async verifieSiToutesLesDataSontEnvoye(localName : string){

    const dataFromLocalStora = await this.storage.get(localName);
    return dataFromLocalStora.find(data => {
        return data.firebase === true;
    });

  }

  async getAllData(showAlerte : boolean = true){

    const localStorageNames = await this.utility.transformToObject(this.utility.localstorage)
    localStorageNames.forEach( async(localStorageName) => {
      if(localStorageName[1] != 'settings'){
        await this.getDataFromFireStore(localStorageName[1])
      }      
    });
    
    for(let storageName of localStorageNames){
      if(storageName[1] != 'settings'){
        this.utility.changeValueiSModified(storageName[1], false)
      }
    }

    if(showAlerte){
      this.loaderOn()
      setTimeout(() => {
        this.loaderOff()
        this.utility.popupInformation('Les données ont bien été récupérées')
      }, 3000);
    }

  }
  async messageGetAllData(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information',
      message: 'Souhaitez-vous réellement mettre à jour vos données sur votre téléphone ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utility.popupInformation('La synchronisation a été annulée')
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.getAllData()
          }
        }
      ]
    });

    await alert.present()
  }

  async messagePostDataToFireBase(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information',
      message: 'Souhaitez-vous réellement envoyer vos données sur firebase ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utility.popupInformation('L\'envoi a été annulé')
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.postDataToFireStore()
          }
        }
      ]
    });

    await alert.present()
  }




  private loaderOn(){
    document.getElementById('wait').innerHTML = "<ion-spinner name='dots' style='height:65px;width:65px'></ion-spinner>";
    document.querySelector('.selector-to-display').classList.add('elementOff')
  }

  private loaderOff(){
    document.getElementById('wait').innerHTML = "";
    document.querySelector('.selector-to-display').classList.remove('elementOff')
  }
  

  private async MAJdataLocalStorageFromDataFromFireStore(collectionName : string){

    this.firestore.collection(collectionName).snapshotChanges().subscribe(async(res)=>{

      var obj = await res[0].payload.doc.data()
      var result = await Object.keys(obj).map((key) => [Number(key), obj[key]]);
      var data : any [] = []
      console.log(data)

      for(let i of result){
        data.push(i[1])
      }

      this.storage.set(collectionName, data)


    })

  }

  async budgetDeLaSemaine(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'budget',
          type: 'number',
          placeholder: 'Montant du budget',
          value : this.setting.budget
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Modifier',
          handler: (formValue) => {
              this.setting.budget = parseInt(formValue.budget);
              this.storage.set(this.utility.localstorage.Setting, this.setting)
          }
        }
      ]
    });

    await alert.present();
  }

  async listeDesPayeurs(){

    const payeurs = await this.setting.payeurs;

    const input : AlertInput [] = []

    for(let payeur of payeurs){
      await input.push({
        name : 'payeur',
        type : 'radio',
        label : payeur,
        value : payeur
      })
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Liste des payeurs',
      inputs: input,
      buttons: [
        {
          text: 'Ajouter',
          handler: () => {
              this.creerUnNouveauPayeur()
          }
        }
        , {
          text: 'Supprimer',
          handler: async (payeur) => {

            const index = await payeurs.findIndex(payeurSetting => {
              return payeurSetting === payeur
            })

            payeurs.splice(index,1)
            this.setting.payeurs = payeurs

            this.storage.set(this.utility.localstorage.Setting, this.setting).then(() => {
              this.utility.popupInformation('Le payeur <strong>' + payeur + '</strong> a bien été supprimé')
            })
              
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
      ]
    });

    await alert.present();
  }

  private async creerUnNouveauPayeur(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un payeur',
      inputs: [
        {
          name: 'payeur',
          type: 'text',
          placeholder: 'Nom du payeur'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ajouter',
          handler: async (payeur) => {
              const payeurs =  await this.setting.payeurs
              payeurs.push(payeur.payeur)
              this.setting.payeurs = payeurs
              this.storage.set(this.utility.localstorage.Setting, this.setting).then(()=> {
              this.utility.popupInformation('Le payeur <strong>' + payeur.payeur + '</strong> a bien été créé')
              })
          }
        }
      ]
    });

    await alert.present();
  }

  async listeDesTags(){

    const tags = await this.setting.tags;

    const input : AlertInput [] = []

    for(let tag of tags){
      await input.push({
        name : 'tag',
        type : 'radio',
        label : tag,
        value : tag
      })
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Liste des tags',
      inputs: input,
      buttons: [
        {
          text: 'Ajouter',
          handler: () => {
              this.creerUnNouveauTag()
          }
        }
        , {
          text: 'Supprimer',
          handler: async (tag) => {

            const index = await tags.findIndex(tagSetting => {
              return tagSetting === tag
            })

            tags.splice(index,1)
            this.setting.tags = tags

            this.storage.set(this.utility.localstorage.Setting, this.setting).then(() => {
              this.utility.popupInformation('Le tag <strong>' + tag + '</strong> a bien été supprimé')
            })
              
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
      ]
    });

    await alert.present();
  }

  private async creerUnNouveauTag(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un tag',
      inputs: [
        {
          name: 'tag',
          type: 'text',
          placeholder: 'Libellé du tag'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ajouter',
          handler: async (tag) => {
              const tags =  await this.setting.tags
              tags.push(tag.tag)
              this.setting.tags = tags
              this.storage.set(this.utility.localstorage.Setting, this.setting).then(()=> {
              this.utility.popupInformation('Le tag <strong>' + tag.tag + '</strong> a bien été créé')
              })
          }
        }
      ]
    });

    await alert.present();
  }

  async listeDesMagasins(){

    const magasins = await this.setting.magasins;

    const input : AlertInput [] = []

    for(let magasin of magasins){
      await input.push({
        name : 'magasin',
        type : 'radio',
        label : magasin,
        value : magasin
      })
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Liste des magasins',
      inputs: input,
      buttons: [
        {
          text: 'Ajouter',
          handler: () => {
              this.creerUnNouveauMagasin()
          }
        }
        , {
          text: 'Supprimer',
          handler: async (magasin) => {

            const index = await magasins.findIndex(magasinSetting => {
              return magasinSetting === magasin
            })

            magasins.splice(index,1)
            this.setting.magasins = magasins

            this.storage.set(this.utility.localstorage.Setting, this.setting).then(() => {
              this.utility.popupInformation('Le magasin <strong>' + magasin + '</strong> a bien été supprimé')
            })
              
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
      ]
    });

    await alert.present();
  }

  private async creerUnNouveauMagasin(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un magasin',
      inputs: [
        {
          name: 'magasin',
          type: 'text',
          placeholder: 'Libellé du magasin'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ajouter',
          handler: async (magasin) => {
              const magasins =  await this.setting.magasins
              magasins.push(magasin.magasin)
              this.setting.tags = magasins
              this.storage.set(this.utility.localstorage.Setting, this.setting).then(()=> {
              this.utility.popupInformation('Le magasin <strong>' + magasin.magasin + '</strong> a bien été créé')
              })
          }
        }
      ]
    });

    await alert.present();
  }
  

}
