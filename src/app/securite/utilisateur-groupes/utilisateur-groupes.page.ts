import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { UtilisateurGroupesService } from '../../services/utilisateur-groupes.service';
import { UtilisateurGroupes } from '../../models/UtilisateurGroupes';
@Component({
  selector: 'app-utilisateur-groupes',
  templateUrl: './utilisateur-groupes.page.html',
  styleUrls: ['./utilisateur-groupes.page.scss'],
})
export class UtilisateurGroupesPage implements OnInit {

  groupes : Array<UtilisateurGroupes> = [];

  constructor(private alertController : AlertController,
              private groupeService : UtilisateurGroupesService) { }

  ngOnInit() {
    this.refresh();
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
          handler: async (data) => {

            await this.groupeService.post({
              id : 0,
              libelle : data.libelle
            })

            await this.refresh();
              
          }
        }
        
      ]
    });

    await alert.present();
  }

  private async refresh(){
    const groupes = await this.groupeService.get();
    this.groupes = groupes;
  }

  public async deleteDefinitivement(groupe : UtilisateurGroupes){
    await this.groupeService.deleteDefinitivement(groupe);
    await this.refresh();
  }

}
