import { Component, OnInit } from '@angular/core';
import { LocalName } from 'src/app/enums/LocalName';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-affecte-utilisateur-groupe',
  templateUrl: './affecte-utilisateur-groupe.component.html',
  styleUrls: ['./affecte-utilisateur-groupe.component.scss'],
})
export class AffecteUtilisateurGroupeComponent  implements OnInit {

  constructor(private firestore : FirestoreService,
              private utiliasteurservice : UtilisateursService) { }

  ngOnInit() {}

  async checkInvitation(codeInvitation : any){
    (await this.firestore.getAll(LocalName.Invitation)).subscribe(async(invit:any) => {
      if(invit.key === codeInvitation){
        invit.isActif = false;
        await this.utiliasteurservice.putInvitationAuGroupe(invit);
        
      }
    })
  }

}
