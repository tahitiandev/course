import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Apports } from 'src/app/models/Apports';
import { EpargneEtApport } from 'src/app/models/EpargneEtApport';
import { Epargnes } from 'src/app/models/Epargnes';
import { ApportsService } from 'src/app/services/apports.service';
import { EpargnesService } from 'src/app/services/epargnes.service';
import { FinancesService } from 'src/app/services/finances.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-epargnes-list',
  templateUrl: './epargnes-list.component.html',
  styleUrls: ['./epargnes-list.component.scss'],
})
export class EpargnesListComponent  implements OnInit {

  epargnes : Array<Epargnes> = [];
  apports : Array<Apports> = [];
  @Input() epargneEtApport : Array<EpargneEtApport> = [];


  constructor(private epargnesservice : EpargnesService,
              private utility : UtilityService,
              private apportsservice : ApportsService,
              private financeservice : FinancesService,
              private alertController : AlertController) { }

  ngOnInit() {}


  private async get(){
    return await this.epargnesservice.get();
  }

  private async refresh(){
    const epargnes = await this.get();
    this.epargnes = epargnes;

    const apports = await this.getApport();
    this.apports = apports;

    await this.cumuleEpargneApport();
  }

  private async getApport(){
    return await this.apportsservice.get();
  }

  orderByDate(epargneapport : Array<any>){
    return epargneapport.sort((a,b) => {
    let x  = a.date.nanoseconds;
    let y  = b.date.nanoseconds;
    if(x < y){
    return -1;
    }else{
    return 1;
    }
    return 0;
    })
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

  public async put(epargneEtApport : EpargneEtApport){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier l\'épargne',
      inputs: [
        {
          type : 'number',
          name : 'montant',
          value : epargneEtApport.montant
        },
        {
          type : 'textarea',
          name : 'commentaire',
          value : epargneEtApport.description
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
          handler: async (result : EpargneEtApport) => {

            const epargne = await this.epargnesservice.getById(epargneEtApport.EpargneApportid);

            epargne.modifiedOn = new Date();
            epargne.userid = (await this.utility.getConnexionInfo()).utilisateurId;
            epargne.epargne = result.montant;
            epargne.commentaire = result.description === undefined ? "" : result.description;

            await this.epargnesservice.put(epargne);

            await this.financeservice.putByKey(epargne.key, epargne.epargne, epargne.commentaire)

            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public formatDate(date : any){
    return this.utility.detecteDate(date)
  }

  public async delete(epargneEtApport : EpargneEtApport){
    const epargne = await this.epargnesservice.getById(epargneEtApport.EpargneApportid);
    await this.epargnesservice.delete(epargne);
    this.refresh();

    await this.financeservice.deleteByKey(epargne.key);

  }

  private async modifierDate(epargne : Epargnes){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier la date',
      inputs: [
        {
          type : 'date',
          name : 'date'
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
          handler: async (date) => {

            epargne.createdOn = new Date(date.date);
            await this.epargnesservice.put(epargne);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async closeEpargne(epargne : Epargnes){
    epargne.check = !epargne.check ;
    await this.epargnesservice.put(epargne);
    await this.refresh();
  }

}
