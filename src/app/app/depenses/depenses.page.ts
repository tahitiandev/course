import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Flux } from 'src/app/enums/Flux';
import { LocalName } from 'src/app/enums/LocalName';
import { Methods } from 'src/app/enums/Methods';
import { TypeOperation } from 'src/app/enums/TypeOperation';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Depenses } from 'src/app/models/Depenses';
import { Finances } from 'src/app/models/Finances';
import { DepensesService } from 'src/app/services/depenses.service';
import { FinancesService } from 'src/app/services/finances.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.page.html',
  styleUrls: ['./depenses.page.scss'],
})
export class DepensesPage implements OnInit {

  infoConnexion : ConnexionInfo;
  depenses : Array<Depenses> = [];
  listeOn : boolean = false;
  total = 0;

  constructor(private depensesservice : DepensesService,
              private utility : UtilityService,
              private financeservice : FinancesService,
              private storageService : StorageService,
              private alertController : AlertController) { 
                this.refresh();
              }

  async ngOnInit() {
    await this.refresh();
    this.infoConnexion = await this.utility.getConnexionInfo();
  }

  private async get(){
    return await this.depensesservice.get();
  }

  private async refresh(){
    const depenses = await this.get();
    this.depenses = depenses;
    await this.calculeTotal();
  }

  async calculeTotal(){
    var total = 0;
    var depenses = await this.get();
    depenses.map(depense => {
      total += Number(depense.depense);
    })
    this.total = total;
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: [
        {
          type : 'number',
          name : 'depense',
          placeholder : 'Montant'
        },
        {
          type : 'textarea',
          name : 'commentaire',
          placeholder : 'Nom de l\'article'
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
          handler: async (depenses : Depenses) => {

            var key = this.utility.generateKey();
            
            depenses.id = Date.now();
            depenses.createdOn = new Date();
            depenses.check = false;
            depenses.isFirebase = false;
            depenses.firebaseMethod = Methods.POST;
            depenses.userid = (await this.utility.getConnexionInfo()).utilisateurId;
            depenses.key = key;

            await this.depensesservice.post(depenses);
            await this.refresh();
            this.setListeOn();

            var finances : Finances = {
              id : 0,
              userid : this.infoConnexion.utilisateurId,
              flux : Flux.Debit,
              montant : Number(depenses.depense) * -1,
              commentaire : depenses.commentaire,
              check : false,
              createdOn : depenses.createdOn,
              isEpargne : false,
              firebaseMethod : Methods.POST,
              isFirebase : false,
              key : key,
              type : TypeOperation.Divers
            }

            await this.financeservice.post(finances);

          }
        }
        
      ]
    });
    await alert.present();
  }

  async handleRefresh(event : any) {

    await this.storageService.synchroniser(LocalName.Finances);
    await this.storageService.synchroniser(LocalName.Depenses);
    await this.storageService.synchroniser(LocalName.Apports);
    await this.storageService.synchroniser(LocalName.Epargnes);
    await this.utility.popUp('Synchronisation des données financières terminées');
    event.target.complete();
    
  }

  public setListeOn(){
    this.listeOn = !this.listeOn;
  }

}
