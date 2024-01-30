import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Flux } from 'src/app/enums/Flux';
import { LocalName } from 'src/app/enums/LocalName';
import { Methods } from 'src/app/enums/Methods';
import { Apports } from 'src/app/models/Apports';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Finances } from 'src/app/models/Finances';
import { ApportsService } from 'src/app/services/apports.service';
import { FinancesService } from 'src/app/services/finances.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-apports',
  templateUrl: './apports.page.html',
  styleUrls: ['./apports.page.scss'],
})
export class ApportsPage implements OnInit {

  infoConnexion : ConnexionInfo;
  apports : Array<Apports> = [];
  listeOn : boolean = false;

  constructor(private apportsservice : ApportsService,
              private utility : UtilityService,
              private storageService : StorageService,
              private financeservice : FinancesService,
              private alertController : AlertController) { 
                this.refresh();
              }

  async ngOnInit() {
    await this.refresh();
    this.infoConnexion = await this.utility.getConnexionInfo();
  }

  private async get(){
    return await this.apportsservice.get();
  }

  private async refresh(){
    const depenses = await this.get();
    this.apports = depenses;
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Faite un apport',
      inputs: [
        {
          type : 'number',
          name : 'apport',
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
          handler: async (apports : Apports) => {

            
            apports.id = Date.now();
            apports.createdOn = new Date();
            apports.check = false;
            apports.isFirebase = false;
            apports.firebaseMethod = Methods.POST;
            apports.userid = (await this.utility.getConnexionInfo()).utilisateurId;

            await this.apportsservice.post(apports);
            await this.refresh();
            this.setListeOn();

            var finances : Finances = {
              id : 0,
              userid : this.infoConnexion.utilisateurId,
              type : Flux.Credit,
              montant : Number(apports.apport),
              commentaire : apports.commentaire,
              check : false,
              createdOn : apports.createdOn,
              isEpargne : false,
              firebaseMethod : Methods.POST,
              isFirebase : false
            }

            await this.financeservice.post(finances);

          }
        }
        
      ]
    });
    await alert.present();
  }

  handleRefresh(event : any) {

    this.storageService.synchroniser(LocalName.Apports).then(() => {
      event.target.complete();
      this.utility.popUp('Synchronisation des dépenses terminées')
    })
    
  }

  public setListeOn(){
    this.listeOn = !this.listeOn;
  }

}
