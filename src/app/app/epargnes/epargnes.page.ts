import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Flux } from 'src/app/enums/Flux';
import { LocalName } from 'src/app/enums/LocalName';
import { Methods } from 'src/app/enums/Methods';
import { TypeOperation } from 'src/app/enums/TypeOperation';
import { Apports } from 'src/app/models/Apports';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { EpargneEtApport } from 'src/app/models/EpargneEtApport';
import { Epargnes } from 'src/app/models/Epargnes';
import { Finances } from 'src/app/models/Finances';
import { ApportsService } from 'src/app/services/apports.service';
import { EpargnesService } from 'src/app/services/epargnes.service';
import { FinancesService } from 'src/app/services/finances.service';
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
  infoConnexion : ConnexionInfo;

  constructor(private epargnessservice : EpargnesService,
              private utility : UtilityService,
              private apportsservice : ApportsService,
              private storageService : StorageService,
              private financeservice : FinancesService,
              private alertController : AlertController) { 
              }

  async ngOnInit() {
    await this.refresh();
    this.infoConnexion = await this.utility.getConnexionInfo();
  }

  private async get(){
    return await this.epargnessservice.get();
  }

  async handleRefresh(event : any) {

    await this.storageService.synchroniser(LocalName.Finances);
    await this.storageService.synchroniser(LocalName.Depenses);
    await this.storageService.synchroniser(LocalName.Apports);
    await this.storageService.synchroniser(LocalName.Epargnes);
    await this.utility.popUp('Synchronisation des données financières terminées');
    event.target.complete();
    
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

    this.epargneEtApport = [];

    this.epargnes.map(epargne => {
      this.epargneEtApport.push({
        date : epargne.createdOn,
        type : 'Epargne',
        montant : epargne.epargne,
        description : epargne.commentaire,
        EpargneApportid : epargne.id
      })
    })

    this.apports.map(apport => {
      this.epargneEtApport.push({
        date : apport.createdOn,
        type : 'Retrait',
        montant : apport.apport * -1,
        description : apport.commentaire,
        EpargneApportid : apport.id
      })
    })

  }

  public calculeEpargneRestant(){
    var total = 0;

    this.epargneEtApport.map(s => {
      total += Number(s.montant)
    })
    return total;
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

            var key = this.utility.generateKey();

            epargnes.id = Date.now();
            epargnes.createdOn = new Date();
            epargnes.check = false;
            epargnes.isFirebase = false;
            epargnes.firebaseMethod = Methods.POST;
            epargnes.userid = (await this.utility.getConnexionInfo()).utilisateurId;
            epargnes.key = key;

            await this.epargnessservice.post(epargnes);
            await this.refresh();
            this.setListeOn();

            var finances : Finances = {
              id : 0,
              userid : this.infoConnexion.utilisateurId,
              flux : Flux.Debit,
              montant : Number(epargnes.epargne) * -1,
              commentaire : epargnes.commentaire,
              check : false,
              createdOn : epargnes.createdOn,
              isEpargne : true,
              firebaseMethod : Methods.POST,
              isFirebase : false,
              key : key,
              type : TypeOperation.Epargne
            }

            await this.financeservice.post(finances);

          }
        }
        
      ]
    });
    await alert.present();
  }

  orderByDate(epargneapport : Array<any>){
    return epargneapport.sort((a,b) => {
    let x  = a.date.seconds;
    let y  = b.date.seconds;
    if(x < y){
    return -1;
    }else{
    return 1;
    }
    return 0;
    })
  }

  public setListeOn(){
    this.listeOn = !this.listeOn;
  }

}
