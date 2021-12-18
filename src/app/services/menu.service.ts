import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Deleted } from '../models/deleted';
import { MenuDelaSemaine } from '../models/menuDeLaSemaine';
import { FirebaseService } from './firebase.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private storage :Storage,
              private utility : UtilityService,
              private firebaseService : FirebaseService) { }

 private menuDeLaSemaine : MenuDelaSemaine [] = [
  {
    lundi : 'test',
    mardi : 'testes',
    mercredi : 'aaaaa',
    jeudi : 'bbb',
    vendredi : 'ccc',
    samedi : 'ddd',
    dimanche : 'eeee',
    dateDebut : '19/07/2021',
    dateFin : '25/07/2021',
    firebase : false
  },
  {
    lundi : 'Pâte carbonara',
    mardi : 'Steak pâte',
    mercredi : 'Hamburger',
    jeudi : 'Hamburger',
    vendredi : 'Boeuf braisé',
    samedi : 'Steak pâte',
    dimanche : 'Boeuf braisé',
    dateDebut : '26/07/2021',
    dateFin : '01/08/2021',
    firebase : false
  },
  {
    lundi : 'qsdfqsdfsqdf',
    mardi : 'tessdqfqsdftes',
    mercredi : 'qsdfqsdfqsdfqsdfqds',
    jeudi : 'bqsdfqsdfbb',
    vendredi : 'ccsqdfqsdfc',
    samedi : 'sqssddd',
    dimanche : 'eessssdee',
    dateDebut : '02/08/2021',
    dateFin : '08/08/2021',
    firebase : false
  },
  {
    lundi : 'lundi',
    mardi : 'mardi',
    mercredi : 'mercredi',
    jeudi : 'jeudi',
    vendredi : 'vendredi',
    samedi : 'samedi',
    dimanche : 'dimanche',
    dateDebut : '07/08/2021',
    dateFin : '08/08/2021',
    firebase : false
  },
 ]

  async getMenuFromLocaoStorage(){

      const data = await this.storage.get(this.utility.localstorage['menu de la semaine'])
      return data;
  }

  async setDefaultValue(){
    this.storage.set(this.utility.localstorage['menu de la semaine'], this.menuDeLaSemaine)

  }

  async saveMenuToLocalStorage(newMenu : MenuDelaSemaine){

    const menu = await this.storage.get(this.utility.localstorage['menu de la semaine']);
    const lastMenu : MenuDelaSemaine = await menu.find((result) => {
      return result.dateDebut === newMenu.dateDebut && result.dateFin === newMenu.dateFin
    })

    var menuTmp : MenuDelaSemaine[] = [];
    const menuLS = await this.storage.get(this.utility.localstorage['menu de la semaine'])

    // Si le menu n'existe pas pour la semaine en cours
    if(this.utility.isUndefined(lastMenu)){

      // Je charge le menu existant
      for(let menus of menuLS){
        await menuTmp.push(menus)
      }
      // je rajoute le nouveau menu
      await menuTmp.push(newMenu)

    }

    // Si le menu existe déjà pour la semaine en cours
    if(!this.utility.isUndefined(lastMenu)){

      for(let menus of menuLS){
        if(menus.dateDebut != newMenu.dateDebut && menus.dateFin != newMenu.dateFin){
          await menuTmp.push(menus)
        }
      }

      // Vérifie si le menu a déjà été envoyé sur firebase
      if(newMenu.firebase){
        // je rajoute le nouveau menu avec la nouvelle période
        newMenu.isModified = true;
        await menuTmp.push(newMenu);
  
        // Sync to firebase
        this.firebaseService.postToLocalStorageDeleted(
          newMenu.firebase,
          this.utility.localstorage['menu de la semaine'],
          newMenu.documentId
        )
         

      }//if
      else{
        await menuTmp.push(newMenu);
      }


    }//if

    // Je sauvegarde dans le localstorage
    await this.storage.set(this.utility.localstorage['menu de la semaine'], menuTmp)    

  }

  sortMenuByDate(menus : Array<MenuDelaSemaine>){
    return menus.sort((a,b) => {
      let x  = a.dateDebut;
      let y  = b.dateDebut;
      if(x > y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }


  async loadMenuOfTheWeek(){
    
    const today = await (await this.generateDateAujourdhui()).dateComplete
    const menu = await this.storage.get('menus')
    const lastMenu = await menu.slice(-1)[0];

    if(today >= lastMenu.dateDebut && today <= lastMenu.dateFin){

        return lastMenu

    }else{
      return null
    }

  }// loadMenuOfTheWeek

  async generateDateAujourdhui(){
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
      'dateComplete' : today
    }

    return infoDate;

  } // generateDateAujourdhui

  async semaineEnCours(){

    var jourToday=new Date()
    var jourDeLaSemaine=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    const today = await this.generateDateAujourdhui()
    
    var aujourrhui = new Date(Date.parse(today.mois + '/' + today.jour + '/' + today.annnee))

    var menuDeLaSemaine : MenuDelaSemaine = {
      lundi : '',
      mardi : '',
      mercredi : '',
      jeudi : '',
      vendredi : '',
      samedi : '',
      dimanche : '',
      dateDebut : '',
      dateFin : '',
      firebase : false}

    switch(jourDeLaSemaine[jourToday.getDay()]){
      case 'Lundi':
        menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(0,aujourrhui)
        menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(5,aujourrhui)
        break;
      case 'Mardi':

        menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-1,aujourrhui)
        menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(5,aujourrhui)

        break;
      case 'Mercredi':
        menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-2,aujourrhui)
        menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(4,aujourrhui)
        break;
      case 'Jeudi':
        menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-3,aujourrhui)
        menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(3,aujourrhui)
        break;
      case 'Vendredi':
        menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-4,aujourrhui)
        menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(2,aujourrhui)
        break;
      case 'Samedi':
        menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-5,aujourrhui)
        menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(1,aujourrhui)
        break;
      case 'Dimanche':
        menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-6,aujourrhui)
        menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(0,aujourrhui)
        break;
    }

    return menuDeLaSemaine;

  }

  private ajoutOuSupprimeDesJoursDuneDate(jour : number, date : Date){

    var finDeSemaine = new Date()
    finDeSemaine.setDate(date.getDate() + jour)
    var NewFinDeSemaine = this.miseEnformeDate(finDeSemaine).dateComplete
    return NewFinDeSemaine

  }

  private miseEnformeDate(dateRenseigne : Date){

    // JOUR
    var jourTmp = dateRenseigne.getDate()
    var jour = jourTmp.toString()
    if(jourTmp < 10){
      jour = '0' + jour;
    }
    
    // MOIS
    var moisTmp = dateRenseigne.getMonth() + 1;
    var mois = moisTmp.toString()

    if(moisTmp < 10){
      mois = '0' + mois;
    }

    // DATE COMPLETE
    var today = jour + "/" + mois+ "/" + dateRenseigne.getFullYear();

    var infoDate = {
      'jour' : jour,
      'mois' : mois,
      'annnee' : dateRenseigne.getFullYear(),
      'dateComplete' : today
    }

    return infoDate

  }

}
