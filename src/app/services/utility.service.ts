import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { Deleted } from '../models/deleted';
import { Settings } from '../models/setting';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public nav : NavController,
              private storage : Storage,
              private alertController : AlertController) { }

  
  
  //#region getter 
  async getSetting(){
    const settings : Settings = await this.storage.get(this.localstorage.Setting);
    return settings;
  }

  //#endregion
  
  public localstorage = {
    'articles' : 'articles',
    'famille d\'articles' : 'familles',
    'Plats' : 'plats',
    'Courses' : 'courses',
    'menu de la semaine' : 'menus',
    'Setting' : 'settings',
    'Dépenses' : 'depense'
  }

  public objectName = {
    'set temp collectionName' : 'collectionNameTemp'
  }

  goToUrl(tabNumber : string, pageName? : string){

    if(pageName){
      this.nav.navigateRoot('tabs/' + tabNumber + '/' + pageName)
    }else{
      this.nav.navigateRoot('tabs/' + tabNumber)
    }
  }

  premierLettreEnMajuscule(Mot : string){

    return (Mot+'').charAt(0).toUpperCase()+Mot.substr(1);

  }

  transformArraytoObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;
  }

  transformToObject(obj){
    return Object.keys(obj).map((key) => [Number(key), obj[key]]);
  }

  isUndefined(anyData : any){
    if(anyData === 'undefined'){
      return true;
    }else{
      return false;
    }
  }

  ConsoleLog(local : string, colonne? : string){

    if(!colonne){
      this.storage.get(local).then(s => console.log(s))
    }else{
      this.storage.get(local).then(s => {
        for(let x of s){
          console.log(x.colonne)
        }
      })
    }
  }

  async settingIsModified(setting : Settings){
    if(setting.firebase){
      setting.isModified = true;
    }
    this.storage.set(this.localstorage.Setting, setting);
  }

  async changeValueiSModified(collectionName : string , trueOrFalse : boolean){
    const collectionNames : any [] = await this.storage.get(collectionName);
    var collectionNameNew : any [] = [];
    for(let collectionName of collectionNames){
      collectionName.isModified = trueOrFalse;
      collectionNameNew.push(collectionName)
    }
    this.storage.set(collectionName, collectionNameNew)
  }

  async changeValueiSModifiedForOneElement(collectionName : string, trueOrFalse : boolean){
    const collectionNames : any [] = await this.storage.get(collectionName);
    var collectionNameNew : any [] = [];
    for(let collectionName of collectionNames){
      collectionName.isModified = trueOrFalse;
      collectionNameNew.push(collectionName)
    }
    this.storage.set(collectionName, collectionNameNew)
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

  async getSettingFromLocalStorage(){
    const settings : Settings = await this.storage.get(this.localstorage.Setting);
    return settings;
  }

  async initSettingData(){
    const settings : Settings = await {
      theme : true,
      budget : 20000,
      masquerLesCoursesCloture : true,
      payeurs : ['Gilles','Herehau'],
      tags : ['Courses','Dejeuner'],
      magasins : ['Carrefour','Hyper U', 'Easy market'],
      firebase : false
    }
    return settings;
  }

  //#region Définir la date

  private miseEnformeDate(dateRenseigne : Date){

    var jourTmp = dateRenseigne.getDate()
    var jour = jourTmp.toString()
    if(jourTmp < 10){
      jour = '0' + jour;
    }

    var moisTmp = dateRenseigne.getMonth() + 1;
    var mois = moisTmp.toString()

    if(moisTmp < 10){
      mois = '0' + mois;
    }

    var today = jour + "/" + mois+ "/" + dateRenseigne.getFullYear();

    var infoDate = {
      'jour' : jour,
      'mois' : mois,
      'annnee' : dateRenseigne.getFullYear(),
      'dateComplete' : today
    }

    return infoDate

  }

  private ajoutOuSupprimeDesJoursDuneDate(jour : number, date : Date){

    var finDeSemaine = new Date()
    finDeSemaine.setDate(date.getDate() + jour)
    var NewFinDeSemaine = this.miseEnformeDate(finDeSemaine).dateComplete
    return NewFinDeSemaine

  }

  private async generateDateAujourdhui(){
    var date = await new Date();

    // JOUR
    var jourTmp = date.getDate();
    var jour = jourTmp.toString()
    if(jourTmp < 10){
      jour = '0' + jour;
    }
    
    // MOIS
    var moisTmp = date.getMonth() + 1;
    var mois = moisTmp.toString()
    
    if(moisTmp < 10){
      mois = '0' + mois;
    }
    
    // DATE COMPLETE
    var today = await jour + "/" + mois+ "/" + date.getFullYear();

    var infoDate = {
      'jour' : jour,
      'mois' : mois,
      'annnee' : date.getFullYear(),
      'dateComplete' : today,
      'dateTime' : date
    }

    return infoDate;

  }

  async parseDateStringToDateTime(ddMMyyyy : string){
    
    const jour = await ddMMyyyy.substring(0,2)
    const mois = await ddMMyyyy.substring(3,5)
    const annee = await ddMMyyyy.substring(6,10)
    
    return new Date(annee + '/' + mois + '/' + jour)
  }

  async getDateDebutetDateDeFinDeSemaine(){

    var jourToday = new Date()
    var jourDeLaSemaine = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    const today = await this.generateDateAujourdhui()
    
    var aujourrhui = new Date(Date.parse(today.mois + '/' + today.jour + '/' + today.annnee))

    var periode = {
      dateDebut : '',
      dateFin : '',
      dateDuJour : aujourrhui,
      dateTime : today.dateTime
    }

    switch(jourDeLaSemaine[jourToday.getDay()]){
      case 'Lundi':
        periode.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(0,aujourrhui)
        periode.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(5,aujourrhui)
        break;
      case 'Mardi':
        periode.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-1,aujourrhui)
        periode.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(5,aujourrhui)
        break;
      case 'Mercredi':
        periode.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-2,aujourrhui)
        periode.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(4,aujourrhui)
        break;
      case 'Jeudi':
        periode.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-3,aujourrhui)
        periode.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(3,aujourrhui)
        break;
      case 'Vendredi':
        periode.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-4,aujourrhui)
        periode.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(2,aujourrhui)
        break;
      case 'Samedi':
        periode.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-5,aujourrhui)
        periode.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(1,aujourrhui)
        break;
      case 'Dimanche':
        periode.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-6,aujourrhui)
        periode.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(0,aujourrhui)
        break;
    }

    return periode
  }

  //#endregion


  async postAlert(inputs : Array<AlertInput>){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un article',
      inputs: inputs,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            await this.popupInformation('')
          }
        },
        {
          text: 'Valider',
          handler: async (data) => {
            await this.getAlertValue(data);
          }
        }
      ]
    })

    await alert.present();

  }
  
  private getAlertValue(data : any){
    console.log(data);
    return data;
  }

  async saveToLocalStorage(localStorageName : string, values : Array<any>){
    await this.storage.set(localStorageName, values);
  }

  spinner(enAttente : boolean){

    /* 
    1- Rajouter une <div id="spinner"></div>

    2- CSS à rajouter sur la page
    #spinner{
      // background-color: yellow;
      position: fixed; z-index: 9;
      top: 45%; left: 45%;
  }
  
  .displayBackground{
      background: gray;
      opacity: 1;
  } */

    const spinnerElement = document.getElementById('spinner');
    const bodyElement = document.getElementById('body-display');
    
    if(enAttente){
      spinnerElement.innerHTML = "<ion-spinner name='lines-small'></ion-spinner>";
      bodyElement.classList.add('displayBackground')
    }
    
    if(!enAttente){
      spinnerElement.innerHTML = '';
      bodyElement.classList.remove('displayBackground')
    }
  }





}