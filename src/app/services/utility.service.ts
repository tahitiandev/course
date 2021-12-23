import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Deleted } from '../models/deleted';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public nav : NavController,
              private storage : Storage) { }

  public localstorage = {
    'articles' : 'articles',
    'famille d\'articles' : 'familles',
    'Plats' : 'plats',
    'Courses' : 'courses',
    'menu de la semaine' : 'menus',
    'Setting' : 'settings'
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
  

}