import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { MagasinsService } from '../../services/magasins.service';
import { Magasins } from '../../models/Magasins';

@Component({
  selector: 'app-magasins',
  templateUrl: './magasins.page.html',
  styleUrls: ['./magasins.page.scss'],
})
export class MagasinsPage implements OnInit {

  magasins : Array<Magasins> = [];

  constructor(private magasinsService : MagasinsService,
              private alertController : AlertController) { }

  ngOnInit() {
    this.refresh();
  }

  private async refresh(){
    this.magasins = await this.get();
  }

  public async get(){
    return await this.magasinsService.get();
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouveau Magasin',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          label : 'Libellé'
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
          handler: async (libelleMagasin : Magasins) => {

            var magasin : Magasins = {
              id : Date.now(),
              libelle : libelleMagasin.libelle,
              createdOn : new Date(),
              modifiedOn : new Date(),
              deletedOn : new Date(),
              isFirebase : false
            }

            await this.magasinsService.post(magasin);
            this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

}
