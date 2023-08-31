import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConnexionInfo } from '../models/ConnexionInfo';
import { LocalName } from '../enums/LocalName';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public navigate : NavController,
    private storage : Storage) { }

    public navigateTo(route : string){
    this.navigate.navigateRoot(route);
    }

    public async getConnexionInfo(){
    const infoConnexion : ConnexionInfo = await this.storage.get(LocalName.InfoConnexion);
    return infoConnexion;
    }

    public generateId(){
      return Date.now();
    }

}
