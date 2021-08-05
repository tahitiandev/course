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
    dateDebut : '02/08/2021',
    dateFin : '08/08/2021'
  },
  {
    lundi : 'aaaaaaaaaa',
    mardi : 'teaaaaaaaaaaaaastes',
    mercredi : 'aabbbbbbbbaaa',
    jeudi : 'bbddddddb',
    vendredi : 'sssssssscc',
    samedi : 'dddsqfqsdfd',
    dimanche : 'eesqdfqsdfqsdee',
    dateDebut : '09/08/2021',
    dateFin : '16/08/2021'
  },
  {
    lundi : 'qsdfqsdfsqdf',
    mardi : 'tessdqfqsdftes',
    mercredi : 'qsdfqsdfqsdfqsdfqds',
    jeudi : 'bqsdfqsdfbb',
    vendredi : 'ccsqdfqsdfc',
    samedi : 'sqssddd',
    dimanche : 'eessssdee',
    dateDebut : '17/08/2021',
    dateFin : '24/08/2021'
  },
 ]

  async getMenuFromLocaoStorage(){

      const data = await this.storage.get(this.utility.localstorage['menu de la semaine'])
      return data;
  }

  async setDefaultValue(){
    this.storage.set(this.utility.localstorage['menu de la semaine'], this.menuDeLaSemaine)

  }




}
