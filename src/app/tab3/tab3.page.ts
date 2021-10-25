import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Setting } from '../models/setting';
import { UtilityService } from '../services/utility.service';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Articles } from '../models/articles';

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
              private alertController : AlertController) {

                this.initSetting()
              } // constructor
  
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


  async addDataToFireStore(){
    
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
          }
          else{
            dataAjour.push(data)
          }
          
        }); // foreach datafromLocalName

        this.storage.set(localStorageName[1],dataAjour);
        dataAjour= [];

      }//if

  }); // foreach localStorageNames

  }

  async sendDataToFireStorePLUSUTILISE(){ // PLUS UTILISé

    var obj = this.utility.localstorage
    var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
    var data : any [] = []

      for(let i of result){
        data.push(i[1])
      }

    for(let localStorageName of data){
      // this.deleteCollection(localStorageName)
      this.firestore.collection(localStorageName).add(this.utility.transformArraytoObject(this.storage.get(localStorageName)))
    }
    

    // var article = await  this.utility.localstorage.articles
    // const articles = await this.storage.get(article)
    // this.firestore.collection(article).add(this.utility.transformArraytoObject(articles))

    this.popupInformation('Les données ont bien été envoyées sur Firebase')
  }

   private async getDataFromFireStore(collectionName){

    const alldata = []

    this.firestore.collection(collectionName)
                  .snapshotChanges()
                  .subscribe((result) => {
                    result.forEach(async (data) => {
                      await alldata.push(data.payload.doc.data())
                    })
                  })

    this.storage.set(collectionName,alldata)

    return alldata;
  }

  private async verifieSiToutesLesDataSontEnvoye(localName : string){

    const dataFromLocalStora = await this.storage.get(localName);
    return dataFromLocalStora.find(data => {
        return data.firebase === true;
    }

  }

  async getAllData(){

    const localStorageNames = await this.utility.transformToObject(this.utility.localstorage)
    localStorageNames.forEach( async(localStorageName) => {

      this.getDataFromFireStore(localStorageName[1])

    }); 

  }


  async getDataFromFirestorePLUSUTILISE(){ // PLUS UTILISé

    var obj = this.utility.localstorage
    var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
    var data : any [] = []

      for(let i of result){
        data.push(i[1])
      }

    for(let localStorageName of data){
      this.MAJdataLocalStorageFromDataFromFireStore(localStorageName)
    }

    this.popupInformation('Les données ont bien été récupéré de Firebase')

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

  testget(collectionName? : string){
    this.MAJdataLocalStorageFromDataFromFireStore('articles')
  }

  async testsend(){

    const articles = await this.storage.get('articles');
    this.firestore.collection('articles')
    .add(this.utility.transformArraytoObject(articles))
  }

  testdelete(){
    this.firestore.collection('articles').snapshotChanges().subscribe(async (res)=>{

      // Supprimer une collection
      var documentid = await res[0].payload.doc.id
      var documentids = await documentid.toString()
      // console.log(documentid.toString())
      // if(res[0].payload.doc.id != undefined){
      //   var documentid = await res[0].payload.doc.id
        this.firestore.collection('articles').doc(documentids).delete()
      // }

        
    })
  }

  async deleteCollection(collectionName : string){
    this.firestore.collection('articles').snapshotChanges().subscribe(async (res)=>{

      // Supprimer une collection
      if(res[0].payload.doc.id != undefined){
        var documentid = await res[0].payload.doc.id
        this.firestore.collection(collectionName).doc(documentid).delete()
      }
        
    })
  }
  

  async popupInformation(message : string){
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Information',
    message: message,
    buttons: ['OK']
  });

  await alert.present()
}



}
