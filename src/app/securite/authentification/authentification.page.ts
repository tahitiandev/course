import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilityService } from '../../services/utility.service';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { LocalName } from '../../enums/LocalName';
import { ConnexionInfo } from '../../models/ConnexionInfo';
import { Utilisateurs } from '../../models/Utilisateurs';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/storage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage implements OnInit {

  authentificationForm : FormGroup = new FormGroup([]);
  utilisateurs : Array<any> = [];

  constructor(private formbuilder : FormBuilder,
              private utility : UtilityService,
              private storage : StorageService,
              private firestore : FirestoreService,
              private utilisateursService : UtilisateursService) { }

  async ngOnInit() {
    // setTimeout(() => {
    //   this.synchroniser();
    // }, 2000);
    this.authentificationFormInit();
    (await this.firestore.getAll(LocalName.Utilisateurs)).subscribe(utilisateurs => {
      this.utilisateurs = utilisateurs;
    })
  }

  private authentificationFormInit(){
    this.authentificationForm = this.formbuilder.group({
      username : '',
      password : ''
    })
  }

  private async synchroniser(){
    await this.storage.synchroniser(LocalName.Utilisateurs);
  }

  async handleRefresh(event : any) {

    await this.synchroniser();
    event.target.complete();
    await this.utility.popUp('Synchronisation des utilisateurs terminée')
    
  }

  public async onValide(){
    const data = this.authentificationForm.value;
    
    const utilisateur = await this.utilisateurs.filter(utilisateur => utilisateur.username === data.username);

    if(utilisateur.length > 0){
      if(utilisateur[0].password === data.password){

        const infoConnexion : ConnexionInfo = {
          isConnected : true,
          utilisateurId : utilisateur[0].id,
          groupeId : utilisateur[0].groupeId,
          isOnline : true,
          isCourseAfficher : true,
          isCourseRapide : true,
          isRoot : utilisateur[0].isRoot === undefined ? false : utilisateur[0].isRoot
        }

        await this.storage.set(LocalName.InfoConnexion, infoConnexion);
        await this.storage.synchroniserAvecFirestore();
        this.utility.navigateTo('home');
        setTimeout(() => {
          location.reload();
        }, 2000);
      }else{
        console.log('Le mot de passe est incorrecte');
      }
    }else{
      console.log('Le login renseigné n\'existe pas')
    }

    this.authentificationForm.patchValue({
      username : '',
      password : ''
    })

  }

  public navigateToCreerUtilisateur(){
    this.utility.navigateTo('creation-utilisateur');
  }
}
