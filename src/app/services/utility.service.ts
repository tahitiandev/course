import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public nav : NavController) { }

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



}