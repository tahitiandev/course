import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Plats } from 'src/app/models/Plats';
import { PlatsService } from 'src/app/services/plats.service';

@Component({
  selector: 'app-plats',
  templateUrl: './plats.page.html',
  styleUrls: ['./plats.page.scss'],
})
export class PlatsPage implements OnInit {

  plats : Array<Plats> = [];

  constructor(private platservice : PlatsService,
              private alertController : AlertController) { }

  async ngOnInit() {
    await this.refresh();
  }

  public async refresh(){
    this.plats = await this.platservice.get();
  }

  public async post(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un plat',
      inputs: [
        {
          type : 'text',
          name : 'libelle'
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
          handler: async (data : any) => {

            const plat : Plats = {
              id : 0,
              libelle : data.libelle == '' ? 'A définir' : data.libelle,
              total : 0,
              createdOn : new Date(),
              isFirebase : false
            }

            await this.platservice.post(plat);
            await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }
  
  public async delete(plat : Plats){
    await this.platservice.deleteDefinitivement(plat);
    await this.refresh();
  }
}