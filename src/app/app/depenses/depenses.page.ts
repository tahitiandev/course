import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalName } from 'src/app/enums/LocalName';
import { Methods } from 'src/app/enums/Methods';
import { Depenses } from 'src/app/models/Depenses';
import { DepensesService } from 'src/app/services/depenses.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.page.html',
  styleUrls: ['./depenses.page.scss'],
})
export class DepensesPage implements OnInit {

  depenses : Array<Depenses> = [];
  listeOn : boolean = false;

  constructor(private depensesservice : DepensesService,
              private utility : UtilityService,
              private storageService : StorageService,
              private alertController : AlertController) { 
                this.refresh();
              }

  async ngOnInit() {
    await this.refresh();
  }

  private async get(){
    return await this.depensesservice.get();
  }

  private async refresh(){
    const depenses = await this.get();
    this.depenses = depenses;
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: [
        {
          type : 'number',
          name : 'depense',
          placeholder : 'Montant'
        },
        {
          type : 'textarea',
          name : 'commentaire',
          placeholder : 'Nom de l\'article'
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
          handler: async (depenses : Depenses) => {

            
            depenses.id = Date.now();
            depenses.createdOn = new Date();
            depenses.check = false;
            depenses.isFirebase = false;
            depenses.firebaseMethod = Methods.POST;
            depenses.userid = (await this.utility.getConnexionInfo()).utilisateurId;

            await this.depensesservice.post(depenses);
            await this.refresh();
            this.setListeOn();

          }
        }
        
      ]
    });
    await alert.present();
  }

  handleRefresh(event : any) {

    this.storageService.synchroniser(LocalName.Depenses).then(() => {
      event.target.complete();
      this.utility.popUp('Synchronisation des dépenses terminées')
    })
    
  }

  public setListeOn(){
    this.listeOn = !this.listeOn;
  }

}
