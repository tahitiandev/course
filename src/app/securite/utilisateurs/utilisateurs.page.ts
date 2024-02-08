import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { UtilityService } from '../../services/utility.service';
import { UtilisateurGroupesService } from '../../services/utilisateur-groupes.service';
import { UtilisateurGroupes } from '../../models/UtilisateurGroupes';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalName } from '../../enums/LocalName';
@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.page.html',
  styleUrls: ['./utilisateurs.page.scss'],
})
export class UtilisateursPage implements OnInit {

  createUserForm : FormGroup = new FormGroup([]);
  utilisateurGroupes : Array<UtilisateurGroupes> = [];

  isCreerFormUserVisible = true;
  isQuestionActif = false;
  isAffecteUtilisateurComponent = false;
  isCreerGroupeComponent = false;
  groupe : any;

  constructor(private formbuilder : FormBuilder,
              private utility : UtilityService,
              private navigate : NavController,
              private firestore : FirestoreService,
              private groupeservice : UtilisateurGroupesService,
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
      actif : true
    })
  }

  public async postUser(groupetemp : UtilisateurGroupes){

    const utilisateur = this.createUserForm.value;
    
    (await this.firestore.getAll(LocalName.Groupes)).subscribe(async (groupes)=>{
      var groupe : any = await groupes.find((groupe:any) => groupe.key === groupetemp.key);
      utilisateur.groupeId = groupe.id;
    })
    await this.utilisateurService.post(utilisateur);
    this.isCreerGroupeComponent = false;
    this.isCreerFormUserVisible = true;
    
    this.createUserForm.patchValue({
      id : new Date(),
      libelle : '',
      username : '',
      password : '',
      email : '',
      actif : true
    })

    this.utility.popUp('Compte ' + utilisateur.libelle + ' a bien été créé');
    this.utility.navigateTo('authentification');
  }

  public async onValide(){
    this.isCreerFormUserVisible = !this.isCreerFormUserVisible
    this.isQuestionActif = !this.isQuestionActif
  }

  clickQuestion(reponse : string){
    this.isQuestionActif = !this.isQuestionActif;
    if(reponse === 'oui'){
      this.isAffecteUtilisateurComponent = !this.isAffecteUtilisateurComponent;
    }else{
      this.isCreerGroupeComponent = !this.isCreerGroupeComponent;
    }
  }
  
  public navigateToAuthentification(){
    this.utility.navigateTo('authentification');
  }

  public async getGroupe(){
    const groupes : Array<UtilisateurGroupes> = await await this.groupeservice.get();
    return groupes.filter(groupe => groupe.id !== 0);
  }

}
