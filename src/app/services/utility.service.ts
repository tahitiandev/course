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
  }

  goToUrl(tabNumber : string, pageName? : string){

    if(pageName){
      this.nav.navigateRoot('tabs/' + tabNumber + '/' + pageName)
    }else{
      this.nav.navigateRoot('tabs/' + tabNumber)
    }
  }





}