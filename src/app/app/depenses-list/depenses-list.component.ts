import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Depenses } from 'src/app/models/Depenses';
import { DepensesService } from 'src/app/services/depenses.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-depenses-list',
  templateUrl: './depenses-list.component.html',
  styleUrls: ['./depenses-list.component.scss'],
})
export class DepensesListComponent  implements OnInit {

  @Input() depenses : Array<Depenses> = [];


  constructor(private depensesservice : DepensesService,
              private utility : UtilityService,
              private alertController : AlertController,
              private storageService : StorageService) { }

  async ngOnInit() {
    // await this.refresh();
  }


  private async get(){
    return await this.depensesservice.get();
  }

  private async refresh(){
    const depenses = await this.get();
    this.depenses = depenses;
  }

  public async put(depense : Depenses){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: [
        {
          type : 'number',
          name : 'depense',
          value : depense.depense
        },
        {
          type : 'textarea',
          name : 'commentaire',
          value : depense.commentaire
        }
      ],
      buttons: [
        {
          text: 'Modifier la date',
          handler: async() => {
            await this.modifierDate(depense);
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
          handler: async (result : Depenses) => {

            depense.modifiedOn = new Date();
            depense.userid = (await this.utility.getConnexionInfo()).utilisateurId;
            depense.depense = result.depense;
            depense.commentaire = result.commentaire;

            await this.depensesservice.put(depense);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async delete(depense : Depenses){
    await this.depensesservice.delete(depense);
    this.refresh();
  }

  private async modifierDate(depense : Depenses){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
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

            depense.createdOn = new Date(date.date);
            await this.depensesservice.put(depense);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async closeDepense(depense : Depenses){
    depense.check = !depense.check ;
    await this.depensesservice.put(depense);
    await this.refresh();
  }

}
