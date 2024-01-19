import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalName } from 'src/app/enums/LocalName';
import { Methods } from 'src/app/enums/Methods';
import { Apports } from 'src/app/models/Apports';
import { ApportsService } from 'src/app/services/apports.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-apports',
  templateUrl: './apports.page.html',
  styleUrls: ['./apports.page.scss'],
})
export class ApportsPage implements OnInit {

  apports : Array<Apports> = [];
  listeOn : boolean = false;

  constructor(private apportsservice : ApportsService,
              private utility : UtilityService,
              private storageService : StorageService,
              private alertController : AlertController) { 
                this.refresh();
                this.test()
              }

  async ngOnInit() {
    await this.refresh();
  }

  private async get(){
    return await this.apportsservice.get();
  }

  async test(){
    var t = await this.apportsservice.get();
    t.map(async(s) => {
      s.createdOn = new Date()
      await this.apportsservice.put(s);
      console.log(s.createdOn)
    })
  }

  private async refresh(){
    const depenses = await this.get();
    this.apports = depenses;
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Faite un apport',
      inputs: [
        {
          type : 'number',
          name : 'apport',
          placeholder : 'Montant'
        },
        {
          type : 'textarea',
          name : 'commentaire',
          placeholder : 'Description'
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
          handler: async (apports : Apports) => {

            
            apports.id = Date.now();
            apports.createdOn = new Date();
            apports.check = false;
            apports.isFirebase = false;
            apports.firebaseMethod = Methods.POST;
            apports.userid = (await this.utility.getConnexionInfo()).utilisateurId;

            await this.apportsservice.post(apports);
            await this.refresh();
            this.setListeOn();

          }
        }
        
      ]
    });
    await alert.present();
  }

  handleRefresh(event : any) {

    this.storageService.synchroniser(LocalName.Apports).then(() => {
      event.target.complete();
      this.utility.popUp('Synchronisation des dépenses terminées')
    })
    
  }

  public setListeOn(){
    this.listeOn = !this.listeOn;
  }

}
