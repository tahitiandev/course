import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Magasins } from 'src/app/models/Magasins';
import { MagasinsService } from 'src/app/services/magasins.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Storage } from '@ionic/storage';
import { LocalName } from 'src/app/enums/LocalName';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  magasinParDefaut? = "";
  connexionInfo : ConnexionInfo;
  isOnline : boolean = true;

  constructor(private alertController : AlertController,
              private utility : UtilityService,
              private storage : StorageService,
              private magasinService : MagasinsService) { }

  async ngOnInit() {
    await this.refresth();
  }

  async refresth(){
    const connexionInfo : ConnexionInfo = await this.utility.getConnexionInfo();
    this.connexionInfo = connexionInfo;
    this.isOnline = connexionInfo.modeOnline;
  }

  public async SetmagasinParDefaut(){

    const magasins : Array<Magasins> = await this.magasinService.get();
    const inputs : Array<AlertInput> = [];
    magasins.map(magasin => {
      inputs.push({
        type : 'radio',
        label : magasin.libelle,
        value : magasin
      })
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Magasin par défaut',
      inputs: inputs,
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (magasin : Magasins) => {
            const connexionInfo : ConnexionInfo = await this.utility.getConnexionInfo();
            connexionInfo.magasinParDefaut = magasin;
            this.magasinParDefaut = magasin.libelle;
            await this.storage.set(LocalName.InfoConnexion, connexionInfo);
          }
        }
        
      ]
    });

    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
  }

  public async synchroniser(){
    await this.storage.synchroniserAvecFirestore().then(async() => {
      await this.utility.popUp('Synchronisation terminée');
    });
  }

  public async synchroniserUtilisateurs(){
    await this.storage.synchroniser(LocalName.Utilisateurs);
  }

  public async setModeOnline(e : any){

    const modeResult = e.detail.checked;
    const infoConnexion = await this.utility.getConnexionInfo();
    infoConnexion.modeOnline = modeResult;
    await this.utility.putConnexionInfo(infoConnexion);
    await this.refresth();

  }

}
