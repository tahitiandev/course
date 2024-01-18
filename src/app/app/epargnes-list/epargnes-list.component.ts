import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Apports } from 'src/app/models/Apports';
import { EpargneEtApport } from 'src/app/models/EpargneEtApport';
import { Epargnes } from 'src/app/models/Epargnes';
import { ApportsService } from 'src/app/services/apports.service';
import { EpargnesService } from 'src/app/services/epargnes.service';
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

  private async cumuleEpargneApport(){
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
        // {
        //   text: 'Modifier la date',
        //   handler: async() => {
        //     await this.modifierDate(epargneEtApport);
        //   }
        // },
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
            console.log(epargne)

            epargne.modifiedOn = new Date();
            epargne.userid = (await this.utility.getConnexionInfo()).utilisateurId;
            epargne.epargne = result.montant;
            epargne.commentaire = result.description;

            await this.epargnesservice.put(epargne);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async delete(epargneEtApport : EpargneEtApport){
    const epargne = await this.epargnesservice.getById(epargneEtApport.EpargneApportid);
    await this.epargnesservice.delete(epargne);
    this.refresh();
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
