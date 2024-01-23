import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { UtilisateurGroupes } from 'src/app/models/UtilisateurGroupes';
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { UtilisateurGroupesService } from 'src/app/services/utilisateur-groupes.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-utilisateur-liste',
  templateUrl: './utilisateur-liste.page.html',
  styleUrls: ['./utilisateur-liste.page.scss'],
})
export class UtilisateurListePage implements OnInit {

  utilisateurs : Array<Utilisateurs> = [];

  constructor(private utilisteursService : UtilisateursService,
              private groupeservice : UtilisateurGroupesService,
              private alertController : AlertController) { }

  ngOnInit() {
    this.refresh();
  }

  private async refresh(){
    this.utilisateurs = await this.getUtilisateurs();
  }

  private async getUtilisateurs(){
    return (await this.utilisteursService.get()).filter((user : Utilisateurs) => user.id !== 0);
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un utilisateur',
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
            await this.chooseGroupe(utilisateur);      
          }
        }
        
      ]
    });

    await alert.present();
  }

  private async chooseGroupe(utilisateur : Utilisateurs){

    const groupes : Array<UtilisateurGroupes> = await this.groupeservice.get();
    const inputs : Array<AlertInput> = [];

    groupes.map(groupe => {
      inputs.push({
        type : 'radio',
        label : groupe.libelle,
        value : groupe.id
      })
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Choisir le groupe',
      inputs: inputs,
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
          handler: async (id) => {
            utilisateur.groupeId = id;
            await this.utilisteursService.post(utilisateur);
            this.refresh();            
          }
        }
        
      ]
    });

    await alert.present();
  }

  public async put(utilisateur : Utilisateurs){

    const libelleGroupe = await this.groupeservice.getLibelleById(utilisateur.groupeId);
    console.log(libelleGroupe)

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mise à jour de données utilisateur',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          placeholder : 'Libelle: ' + utilisateur.libelle
        },
        {
          type : 'text',
          name : 'username',
          placeholder : 'login: ' + utilisateur.username
        },
        {
          type : 'password',
          name : 'password',
          placeholder : 'MDP: ' + utilisateur.password
        },
        {
          type : 'email',
          name : 'email',
          placeholder : '@: ' + utilisateur.email
        },
        {
          type : 'text',
          value : 'Groupe: ' + libelleGroupe,
          disabled : true
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
          text: 'Modifier le rôle',
          handler: async () => {
            await this.updateRole(utilisateur); 
          }
        }
        ,{
          text: 'Valider',
          handler: async (data) => {
            
            utilisateur.libelle = data.libelle === '' ? utilisateur.libelle : data.libelle
            utilisateur.username = data.username === '' ? utilisateur.username : data.username
            utilisateur.password = data.password === '' ? utilisateur.password : data.password
            utilisateur.email = data.email === '' ? utilisateur.email : data.email

            await this.utilisteursService.put(utilisateur);
            this.refresh();            
          }
        }
        
      ]
    });

    await alert.present();
  }

  private async updateRole(utilisateur : Utilisateurs){
    const groupes : Array<UtilisateurGroupes> = await this.groupeservice.get();
    const inputs : Array<AlertInput> = [];

    groupes.map(groupe => {
      inputs.push({
        type : 'radio',
        label : groupe.libelle,
        value : groupe.id
      })
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Choisir le groupe',
      inputs: inputs,
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
          handler: async (id) => {
            utilisateur.groupeId = id;
            await this.utilisteursService.put(utilisateur);
            this.refresh();            
          }
        }
        
      ]
    });

    await alert.present();
  }

  public async deleteDefinitivement(utilisateur : Utilisateurs){
    await this.utilisteursService.deleteDefinitivement(utilisateur);
    await this.refresh();
  }

}
