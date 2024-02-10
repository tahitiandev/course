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
import { UtilisateurGroupeActivation } from 'src/app/models/UtilisateurGroupeActivation';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  magasinParDefaut : string = "";
  connexionInfo : ConnexionInfo;
  isOnline : boolean = true;
  isCourseRapide : boolean = true;
  montantBudget = 10000;

  constructor(private alertController : AlertController,
              private utility : UtilityService,
              private storage : StorageService,
              private utilisateurservice : UtilisateursService,
              private magasinService : MagasinsService) { }

  async ngOnInit() {
    await this.refresh();
  }

  async refresh(){
    const connexionInfo : ConnexionInfo = await this.utility.getConnexionInfo();
    this.connexionInfo = connexionInfo;
    this.isOnline = connexionInfo.isOnline;
    this.isCourseRapide = connexionInfo.isCourseRapide;
    this.magasinParDefaut = connexionInfo.magasinParDefaut?.libelle === undefined ? "1" : connexionInfo.magasinParDefaut.libelle
  }

  public async inviteAuGroupe(){
    var key = await this.utility.generateKey();
    var invitation : UtilisateurGroupeActivation = {
      userId : this.connexionInfo.utilisateurId,
      groupeId : this.connexionInfo.groupeId,
      code : key,
      isActif : true,
      dateExpiration : new Date()
    }

    await this.utilisateurservice.postInvitationAuGroupe(invitation);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Votre code d\'invitation',
      inputs: [
        {
          type : 'text',
          value : key
        }
      ],
        buttons: [
          {
          text: 'Ok',
          handler: () => {
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

  public async setmagasinParDefaut(){

    const magasins : Array<Magasins> = await this.magasinService.get();
    const inputs : Array<AlertInput> = [];
    magasins.map(magasin => {
      inputs.push({
        type : 'radio',
        label : magasin.libelle,
        value : magasin,
        checked : this.magasinParDefaut === magasin.libelle
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


  // public async synchroniserManuel(localname : string){
  //   await this.storage.synchroniser(localname);
  // }

  public async setModeOnline(e : any){

    const result = e.detail.checked;
    const infoConnexion = await this.utility.getConnexionInfo();
    infoConnexion.isOnline = result;
    await this.utility.putConnexionInfo(infoConnexion);
    await this.refresh();

  }

  public async setModeCourseRapide(e : any){
    const result = e.detail.checked;
    const infoConnexion = await this.utility.getConnexionInfo();
    infoConnexion.isCourseRapide = result;
    await this.utility.putConnexionInfo(infoConnexion);
    await this.refresh();
  }

  public async consoleLog(localname : string){
    const data = await this.storage.get(localname);
    console.log(data)
  }
}
