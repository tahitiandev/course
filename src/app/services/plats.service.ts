import { Injectable } from '@angular/core';
import { Plats } from '../models/plats';
import { UtilityService } from './utility.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PlatsService {

  constructor(private utility : UtilityService,
              private storage : Storage) { }

  private plats : Plats [] = [
    {
      libelle : 'Pâte carbonara',
      codeArticle : ['FLCAR','VCJAM']
    },
    {
      libelle : 'Steak pâte',
      codeArticle : ['BOILAI','VCJAM']
    },
    {
      libelle : 'Hamburger',
      codeArticle : ['FLORA','FLORA']
    },
    {
      libelle : 'Boeuf braisé',
      codeArticle : ['FLTOM','FLORA']
    }
  ];

  // setPlatsToLocalStorage(){
  //   this.storage.set(this.utility.localstorage.Plats, this.plats);
  // }

  async getPlatFromLocalStorage(){
    const plats : Plats [] = await this.storage.get(this.utility.localstorage.Plats)
    return plats;
  }




}
