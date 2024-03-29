import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ConnexionInfo } from '../models/ConnexionInfo';
import { LocalName } from '../enums/LocalName';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public navigate : NavController,
              private alertController : AlertController,
              private storage : Storage) { }

    public navigateTo(route : string){
    this.navigate.navigateRoot(route);
    }

    public async getConnexionInfo(){
    const infoConnexion : ConnexionInfo = await this.storage.get(LocalName.InfoConnexion);
    return infoConnexion;
    }

    public async putConnexionInfo(connexionInfo : ConnexionInfo){
      await this.storage.set(LocalName.InfoConnexion, connexionInfo);
    }

    public generateId(){
      return Date.now();
    }

    public generateKey(){
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    public async popUp(Message : string){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: Message,
        inputs: [],
          buttons: [{
            text: 'Fermer',
            handler: async () => {
  
            }
          }
          
        ]
      });
  
      await alert.present();
    }

    public detecteDate(date : any){
      
      if (typeof date === 'object' && date !== null) {
        return new Date(date.seconds * 1000 + date.nanoseconds / 1e6);
      } else {
          return date
      }

    }

    public async copierDansPressePapier(texte : string) {
      try {
        await navigator.clipboard.writeText(texte);
        console.log('Texte copié dans le presse-papiers :', texte);
      } catch (err) {
        console.error('Impossible de copier le texte dans le presse-papiers :', err);
      }
    }

}
