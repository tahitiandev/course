import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Apports } from 'src/app/models/Apports';
import { ApportsService } from 'src/app/services/apports.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-apports-list',
  templateUrl: './apports-list.component.html',
  styleUrls: ['./apports-list.component.scss'],
})
export class ApportsListComponent  implements OnInit {

  @Input() apports : Array<Apports> = [];


  constructor(private apportsservice : ApportsService,
              private utility : UtilityService,
              private alertController : AlertController) { }

  ngOnInit() {}


  private async get(){
    return await this.apportsservice.get();
  }

  private async refresh(){
    const apports = await this.get();
    this.apports = apports;
  }

  public async put(apports : Apports){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier l\'apport',
      inputs: [
        {
          type : 'number',
          name : 'apport',
          value : apports.apport
        },
        {
          type : 'textarea',
          name : 'commentaire',
          value : apports.commentaire
        }
      ],
      buttons: [
        {
          text: 'Modifier la date',
          handler: async() => {
            await this.modifierDate(apports);
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (result : Apports) => {

            apports.modifiedOn = new Date();
            apports.userid = (await this.utility.getConnexionInfo()).utilisateurId;
            apports.apport = result.apport;
            apports.commentaire = result.commentaire;

            await this.apportsservice.put(apports);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async delete(apport : Apports){
    await this.apportsservice.delete(apport);
    this.refresh();
  }

  private async modifierDate(apport : Apports){
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

            apport.createdOn = new Date(date.date);
            await this.apportsservice.put(apport);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async closeApport(apport : Apports){
    apport.check = !apport.check ;
    await this.apportsservice.put(apport);
    await this.refresh();
  }

  public formatDate(date : any){
    return this.utility.detecteDate(date)
  }

}
