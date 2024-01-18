import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalName } from 'src/app/enums/LocalName';
import { Methods } from 'src/app/enums/Methods';
import { Apports } from 'src/app/models/Apports';
import { EpargneEtApport } from 'src/app/models/EpargneEtApport';
import { Epargnes } from 'src/app/models/Epargnes';
import { ApportsService } from 'src/app/services/apports.service';
import { EpargnesService } from 'src/app/services/epargnes.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-epargnes',
  templateUrl: './epargnes.page.html',
  styleUrls: ['./epargnes.page.scss'],
})
export class EpargnesPage implements OnInit {

  epargnes : Array<Epargnes> = [];
  apports : Array<Apports> = [];
  epargneEtApport : Array<EpargneEtApport> = [];
  listeOn : boolean = false;

  constructor(private epargnessservice : EpargnesService,
              private utility : UtilityService,
              private apportsservice : ApportsService,
              private storageService : StorageService,
              private alertController : AlertController) { 
                this.refresh();
              }

  async ngOnInit() {
    await this.refresh();
  }

  private async get(){
    return await this.epargnessservice.get();
  }

  private async getApport(){
    return await this.apportsservice.get();
  }

  private async refresh(){
    const epargnes = await this.get();
    this.epargnes = epargnes;

    const apports = await this.getApport();
    this.apports = apports;

    await this.cumuleEpargneApport();
  }

  private async cumuleEpargneApport(){
    this.epargnes.map(epargne => {
      this.epargneEtApport.push({
        date : epargne.createdOn,
        type : 'Epargne',
        montant : epargne.epargne,
        description : epargne.commentaire
      })
    })
    this.apports.map(apport => {
      this.epargneEtApport.push({
        date : apport.createdOn,
        type : 'Retrait',
        montant : apport.apport * -1,
        description : apport.commentaire
      })
    })
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Faite une epargne',
      inputs: [
        {
          type : 'number',
          name : 'epargne',
          placeholder : 'Montant'
        },
        {
          type : 'textarea',
          name : 'commentaire',
          placeholder : 'Description'
        }
      ],
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
          handler: async (epargnes : Epargnes) => {

            
            epargnes.id = Date.now();
            epargnes.createdOn = new Date();
            epargnes.check = false;
            epargnes.isFirebase = false;
            epargnes.firebaseMethod = Methods.POST;
            epargnes.userid = (await this.utility.getConnexionInfo()).utilisateurId;

            await this.epargnessservice.post(epargnes);
            await this.refresh();
            this.setListeOn();

          }
        }
        
      ]
    });
    await alert.present();
  }

  handleRefresh(event : any) {

    this.storageService.synchroniser(LocalName.Epargnes).then(() => {
      event.target.complete();
      this.utility.popUp('Synchronisation des epargnes terminées')
    })
    
  }

  public setListeOn(){
    this.listeOn = !this.listeOn;
  }

}
