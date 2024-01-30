import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Flux } from 'src/app/enums/Flux';
import { Methods } from 'src/app/enums/Methods';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Finances } from 'src/app/models/Finances';
import { FinancesService } from 'src/app/services/finances.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.page.html',
  styleUrls: ['./finances.page.scss'],
})
export class FinancesPage implements OnInit {

  infoConnexion : ConnexionInfo;
  finances : Array<Finances> = [];
  isVisible : boolean = false;

  constructor(private alertController : AlertController,
              private utility : UtilityService,
              private financesservice : FinancesService) { }

  async ngOnInit() {
    this.infoConnexion = await this.utility.getConnexionInfo();
    await this.refresh()
  }

  public setIsVisible(){
    this.isVisible = !this.isVisible;
  }

  private async refresh(){
    this.finances = await this.get();
  }

  private async get(){
    return await this.financesservice.get();
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Type d\'opération',
      buttons: [
        {
          text: 'Débit',
          handler: async () => {
            await this.postDebit();
          }
        },
        {
          text: 'Crédit',
          handler: async () => {
            await this.postCredit();
          }
        }
      ]
    });
    await alert.present();
  }

  private async postDebit(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Type d\'opération',
      inputs : [
        {
          type : 'number',
          name : 'montant',
          placeholder : 'Montant'
        },
        {
          type : 'text',
          name : 'description',
          placeholder : 'Description'
        },
        {
          type : 'checkbox',
          label
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Valider',
          handler: async (data : any) => {
            var finances : Finances = {
              id : 0,
              userid : this.infoConnexion.utilisateurId,
              montant : data.montant *-1,
              type : Flux.Debit,
              commentaire : data.description,
              check : false,
              createdOn : new Date(),
              isFirebase : false,
              firebaseMethod : Methods.POST

            }

            await this.financesservice.post(finances);
            await this.refresh();
            this.setIsVisible();

          }
        }
      ]
    });
    await alert.present();
  }

  public async postCredit(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Type d\'opération',
      inputs : [
        {
          type : 'number',
          name : 'montant',
          placeholder : 'Montant'
        },
        {
          type : 'text',
          name : 'description',
          placeholder : 'Description'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Valider',
          handler: async (data : any) => {
            var finances : Finances = {
              id : 0,
              userid : this.infoConnexion.utilisateurId,
              montant : data.montant,
              type : Flux.Credit,
              commentaire : data.description,
              check : false,
              createdOn : new Date(),
              isFirebase : false,
              firebaseMethod : Methods.POST

            }

            await this.financesservice.post(finances);
            await this.refresh();
            this.setIsVisible();
          }
        }
      ]
    });
    await alert.present();
  }
  

}
