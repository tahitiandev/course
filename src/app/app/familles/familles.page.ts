import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { Familles } from '../../models/Familles';
import { FamillesService } from '../../services/familles.service';

@Component({
  selector: 'app-familles',
  templateUrl: './familles.page.html',
  styleUrls: ['./familles.page.scss'],
})
export class FamillesPage implements OnInit {

  familles : Array<Familles> = [];

  constructor(private alertController : AlertController,
              private famillesService : FamillesService) { }

  ngOnInit() {
    this.refresh();
  }

  private async get(){
    return await this.famillesService.get();
  }

  private async refresh(){
    const familles = await this.get();
    this.familles = familles;
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          label : 'Nom de l\'article'
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
          handler: async (famille : Familles) => {

            famille.id = Date.now();
            famille.createdOn = new Date();
            famille.isFirebase = false;

            await this.famillesService.post(famille);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }


}
