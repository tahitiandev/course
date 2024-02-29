import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalName } from 'src/app/enums/LocalName';
import { Methods } from 'src/app/enums/Methods';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { UtilisateurGroupeActivation } from 'src/app/models/UtilisateurGroupeActivation';
import { EmailService } from 'src/app/services/email.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss'],
})
export class InvitationsPage implements OnInit {

  invitations : Array<any> = [];
  infoConnexion : ConnexionInfo;

  constructor(private firestore : FirestoreService,
              private utilisateurservice : UtilisateursService,
              private emailservice : EmailService,
              private alertController : AlertController,
              private utility : UtilityService) { }

  async ngOnInit() {
    this.infoConnexion = await this.utility.getConnexionInfo();
    await this.getInvitations();
    // this.envoyerEmail();
  }

  envoyerEmail(){
    console.log('test')
    this.emailservice.sendEmail()
  }

  private async getInvitations(){
    (await this.firestore.getAll(LocalName.Invitation))
                         .subscribe(invitations => {
                          var result = invitations.filter((invitation : any) => invitation.groupeId === this.infoConnexion.groupeId)
                          this.invitations = [];
                          this.invitations = result;
                         })
  }

  public async delete(invitation : UtilisateurGroupeActivation){
    await this.utilisateurservice.deleteInvitation(invitation);
  }

  public async getCode(code : any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Transmettez ce code à un utilisateur pour l\'inviter dans votre groupe',
      inputs: [
        {
          type : 'text',
          value : code
        }
      ],
        buttons: [
          {
          text: 'Ok',
          handler: () => {
          }
        }
        
      ]
    });

    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });
}



public async inviteAuGroupe(){
    var key = await this.utility.generateKey();
    var invitation : UtilisateurGroupeActivation = {
      userId : this.infoConnexion.utilisateurId,
      groupeId : this.infoConnexion.groupeId,
      code : key,
      isActif : true,
      dateExpiration : new Date(),
      isFirebase : false,
      firebaseMethod : Methods.POST
    }

    await this.utilisateurservice.postInvitationAuGroupe(invitation);

    await this.utility.copierDansPressePapier(key);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Transmettez ce code à un utilisateur pour l\'inviter dans votre groupe',
      inputs: [
        {
          type : 'text',
          value : key
        }
      ],
        buttons: [
          {
          text: 'Ok',
          handler: () => {
          }
        }
        
      ]
    });

    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });

  }

  

}
