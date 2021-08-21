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
      codeArticle : [{
        codeArticle : 'FLCAR',
        quantite : 2
      },{
        codeArticle : 'VCJAM',
        quantite : 5
      }]
    },
    {
      libelle : 'Hamburger',
      codeArticle : [{
        codeArticle : 'FLORA',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 5
      }]
    },
    {
      libelle : 'Steak pâte',
      codeArticle : [{
        codeArticle : 'FLCAR',
        quantite : 2
      },{
        codeArticle : 'VCJAM',
        quantite : 5
      }]
    },
    {
      libelle : 'Boeuf braisé',
      codeArticle : [{
        codeArticle : 'FLTOM',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 9
      }]
    }
  ];

  // setPlatsToLocalStorage(){
  //   this.storage.set(this.utility.localstorage.Plats, this.plats);
  // }

  async setDefaultPlatData(){
    await this.storage.set(this.utility.localstorage.Plats, this.plats)
  }

  async getPlatFromLocalStorage(){
    const plats : Plats [] = await this.storage.get(this.utility.localstorage.Plats)
    return plats;
  }

  async searchPlatByLibelle(libelle : string){

    this.plats = [];
    const plats = await this.getPlatFromLocalStorage();
    this.plats = plats;

    const result = await this.plats.find((plats : Plats) => {
      return plats.libelle === libelle
    })

    return result;

  }

  async setPlatToLocalStorage(newPlat : Plats){
    var plats : Plats [] = [];

    const platsLS : Plats[] = await this.getPlatFromLocalStorage();
    
    if(platsLS){
      for(let plat of platsLS){
        await plats.push(plat)
      }
    }

    await plats.push(newPlat)
    await this.storage.set(this.utility.localstorage.Plats, plats)
  }



}
