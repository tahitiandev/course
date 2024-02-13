import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalName } from 'src/app/enums/LocalName';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-affecte-utilisateur-groupe',
  templateUrl: './affecte-utilisateur-groupe.component.html',
  styleUrls: ['./affecte-utilisateur-groupe.component.scss'],
})
export class AffecteUtilisateurGroupeComponent  implements OnInit {

  @Output() groupeIdOutput = new EventEmitter<any>();
  formgroup : FormGroup = new FormGroup([]);
  invitations : Array<any> = [];

  constructor(private firestore : FirestoreService,
              private utility : UtilityService,
              private formbuilder : FormBuilder,
              private utiliasteurservice : UtilisateursService) { }

  async ngOnInit() {
    await this.getInvitations();
  }

  init(){
    this.formgroup = this.formbuilder.group({
      codeActivation : ''
    })
  }

  onValide(){
    const value = this.formgroup.value;
    this.checkInvitation(value.codeActivation);
    this.formgroup.patchValue({
      codeActivation : ''
    })
  }

  async getInvitations(){
    (await this.firestore.getAll(LocalName.Invitation)).subscribe(invitations => this.invitations = invitations);
  }

  async checkInvitation(codeInvitation : any){

      const result : Array<any> = await this.invitations.filter((invitation:any) => invitation.key === codeInvitation);

      if(result.length > 0){
        result.map(async(r) => {
          if(r.key === codeInvitation){
            r.isActif =  false;
            await this.utiliasteurservice.putInvitationAuGroupe(r);
            this.groupeIdOutput.emit(r.groupeId);
          }
        })
      }else{
        await this.utility.popUp('Le code n\'est pas valide');
      }
  }

}
