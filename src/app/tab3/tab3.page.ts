import { Component } from '@angular/core';
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

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

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
              private firebaseService : FirebaseService) {
                this.initSetting()
                // this.storage.set('deleted',[])
              } // constructor
  
  async step(){
    const localStorageNames = await this.utility.transformToObject(this.utility.localstorage)
    for(let divers of localStorageNames){
      if(divers[1] != 'settings'){
        this.utility.changeValueiSModified(divers[1], false)
      }
    }
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
    const setting = await this.storage.get('settings')

    if(setting){
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

  // Récupérer les données de firebase
  this.getAllData(false)

  this.popupInformation('Les données ont bien été envoyées sur firebase')

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

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: 'Souhaitez-vous réellement supprimer vos données ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.storage.clear()
                .catch((e) => console.log(e))
                .finally(() =>{
                  this.popupInformation('Les données local ont été supprimé')
                })
          }
        }
      ]
    });

    await alert.present();
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
      this.popupInformation('Les données ont bien été récupérées')
    }

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

  private async popupInformation(message : string){
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Information',
    message: message,
    buttons: ['OK']
  });

  await alert.present()
}

}
