import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilityService } from '../../services/utility.service';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { LocalName } from '../../enums/LocalName';
import { ConnexionInfo } from '../../models/ConnexionInfo';
import { Utilisateurs } from '../../models/Utilisateurs';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage implements OnInit {

  authentificationForm : FormGroup = new FormGroup([]);

  constructor(private formbuilder : FormBuilder,
              private utility : UtilityService,
              private storage : StorageService,
              private utilisateursService : UtilisateursService) { }

  ngOnInit() {
    this.authentificationFormInit();
  }

  private authentificationFormInit(){
    this.authentificationForm = this.formbuilder.group({
      username : '',
      password : ''
    })
  }

  public async onValide(){
    const data = this.authentificationForm.value;
    
    const utilisateurs : Array<Utilisateurs> = await this.utilisateursService.get();
    const utilisateur = await utilisateurs.filter(utilisateur => utilisateur.username === data.username);

    if(utilisateur.length > 0){
      if(utilisateur[0].password === data.password){

        const infoConnexion : ConnexionInfo = {
          isConnected : true,
          utilisateurId : utilisateur[0].id,
          groupeId : utilisateur[0].groupeId,
          isOnline : true,
          isCourseAfficher : true
        }

        await this.storage.set(LocalName.InfoConnexion, infoConnexion);
        await this.storage.synchroniserAvecFirestore();
        this.utility.navigateTo('home');
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
