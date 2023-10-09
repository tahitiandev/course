import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-utilisateur-liste',
  templateUrl: './utilisateur-liste.page.html',
  styleUrls: ['./utilisateur-liste.page.scss'],
})
export class UtilisateurListePage implements OnInit {

  utilisateurs : Array<Utilisateurs> = [];

  constructor(private utilisteursService : UtilisateursService,
              private alertController : AlertController) { }

  ngOnInit() {
    this.refresh();
  }

  private async refresh(){
    this.utilisateurs = await this.getUtilisateurs();
  }

  private async getUtilisateurs(){
    return await this.utilisteursService.get();
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouveau Magasin',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          placeholder : 'Libellé'
        },
        {
          type : 'text',
          name : 'username',
          placeholder : 'login'
        },
        {
          type : 'password',
          name : 'password',
          placeholder : 'Mot de passe'
        },
        {
          type : 'email',
          name : 'email',
          placeholder : 'Email'
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
            var utilisateur : Utilisateurs = {
              id : Number(new Date()),
              libelle : data.libelle,
              username : data.username,
              password : data.password,
              email : data.email,
              groupeId : 0,
              actif : true,
              isFirebase : false
            }
            await this.utilisteursService.post(utilisateur);
            this.refresh();            
          }
        }
        
      ]
    });

    await alert.present();
  }

}
