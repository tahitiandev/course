import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuDelaSemaine } from '../models/menuDeLaSemaine';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private storage :Storage,
              private utility : UtilityService) { }

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
    const lastMenu = await menu.find((result) => {
      return result.dateDebut === newMenu.dateDebut && result.dateFin === newMenu.dateFin
    })

    var menuTmp : MenuDelaSemaine[] = [];
    const menuLS = await this.storage.get(this.utility.localstorage['menu de la semaine'])

    // Si le menu n'existe pas pour la semaine en cours
    if(lastMenu === 'undefined'){

      // Je charge le menu existant
      for(let menus of menuLS){
        await menuTmp.push(menus)
      }
      // je rajoute le nouveau menu
      await menuTmp.push(newMenu)

    }

    // Si le menu existe déjà pour la semaine en cours
    if(lastMenu != 'undefined'){

      for(let menus of menuLS){
        if(menus.dateDebut != newMenu.dateDebut && menus.dateFin != newMenu.dateFin){
          await menuTmp.push(menus)
        }
      }

      // je rajoute le nouveau menu avec la nouvelle période
      await menuTmp.push(newMenu)

    }

    // Je sauvegarde dans le localstorage
    await this.storage.set(this.utility.localstorage['menu de la semaine'], menuTmp)

    
    

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




}
