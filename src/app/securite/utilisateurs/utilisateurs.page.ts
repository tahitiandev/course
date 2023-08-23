import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { UtilityService } from '../../services/utility.service';
import { UtilisateurGroupesService } from '../../services/utilisateur-groupes.service';
import { UtilisateurGroupes } from '../../models/UtilisateurGroupes';
@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.page.html',
  styleUrls: ['./utilisateurs.page.scss'],
})
export class UtilisateursPage implements OnInit {

  createUserForm : FormGroup = new FormGroup([]);
  utilisateurGroupes : Array<UtilisateurGroupes> = [];

  constructor(private formbuilder : FormBuilder,
              private utility : UtilityService,
              private navigate : NavController,
              private groupes : UtilisateurGroupesService,
              private utilisateurService : UtilisateursService) {
                this.refresh();
               }

  ngOnInit() {
    this.createUserFormInit();
    this.refresh();
  }

  async refresh(){
    this.utilisateurGroupes = await this.getGroupe();
  }

  private createUserFormInit(){
    this.createUserForm = this.formbuilder.group({
      id : 0,
      libelle : '',
      username : '',
      password : '',
      email : '',
      groupeId : 0,
      actif : true
    })
  }

  public async onValide(){
    const utilisateur = this.createUserForm.value;
    utilisateur.groupeId = Number(utilisateur.groupeId);
    
    await this.utilisateurService.post(utilisateur);
    this.createUserForm.patchValue({
      id : 0,
      libelle : '',
      username : '',
      password : '',
      email : '',
      groupeId : 0,
      actif : true
    })

    

    this.utility.navigateTo('authentification');
  }
  
  public navigateToAuthentification(){
    this.utility.navigateTo('authentification');
  }

  public async getGroupe(){
    const groupes : Array<UtilisateurGroupes> = await await this.groupes.get();
    return groupes.filter(groupe => groupe.id !== 0);
  }

}
