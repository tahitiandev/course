import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Flux } from 'src/app/enums/Flux';
import { LocalName } from 'src/app/enums/LocalName';
import { Methods } from 'src/app/enums/Methods';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Depenses } from 'src/app/models/Depenses';
import { Epargnes } from 'src/app/models/Epargnes';
import { Finances } from 'src/app/models/Finances';
import { DepensesService } from 'src/app/services/depenses.service';
import { EpargnesService } from 'src/app/services/epargnes.service';
import { FinancesService } from 'src/app/services/finances.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.page.html',
  styleUrls: ['./finances.page.scss'],
})
export class FinancesPage implements OnInit {

  infoConnexion : ConnexionInfo;
  finances : Array<Finances> = [];
  isVisible : boolean = false;
  total = 0;

  constructor(private alertController : AlertController,
              private utility : UtilityService,
              private epargneservice : EpargnesService,
              private depenseservice : DepensesService,
              private storageService : StorageService,
              private financesservice : FinancesService) { }

  async ngOnInit() {
    this.infoConnexion = await this.utility.getConnexionInfo();
    await this.refresh()
  }

  async handleRefresh(event : any) {

    await this.storageService.synchroniser(LocalName.Finances);
    await this.storageService.synchroniser(LocalName.Depenses);
    await this.storageService.synchroniser(LocalName.Apports);
    await this.storageService.synchroniser(LocalName.Epargnes);
    await this.utility.popUp('Synchronisation des données financières terminées');
    event.target.complete();
    
  }

  public setIsVisible(){
    this.isVisible = !this.isVisible;
  }

  public async getCheck(finance:Finances){
    finance.check = !finance.check;
    await this.financesservice.put(finance);
    this.refresh();
  }

  private async refresh(){
    this.finances = await this.get();
    await this.calculeTotal();
  }

  private async get(){
    return await this.financesservice.get();
  }

  public async calculeTotal(){
    var finance = await this.get();
    var total = 0;
    finance.map(f => {
      total += Number(f.montant)
    })
    this.total = total;
  }

  sortByOrdreAsc(finances : Array<Finances>){
    return finances.sort((a,b) => {
      let x  = a.id;
      let y  = b.id;
      if(x > y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }

  public async post(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Type d\'opération',
      buttons: [
        {
          text: 'Débit',
          handler: async () => {
            await this.postDebit();
          }
        },
        {
          text: 'Crédit',
          handler: async () => {
            await this.postCredit();
          }
        }
      ]
    });
    await alert.present();
  }

  private async postDebit(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Type d\'opération',
      inputs : [
        {
          type : 'number',
          name : 'montant',
          placeholder : 'Montant'
        },
        {
          type : 'text',
          name : 'description',
          placeholder : 'Description'
        },
        {
          type : 'checkbox',
          label : 'Epargne',
          name : 'isEpargne'
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
          text: 'Valider',
          handler: async (data : any) => {

            var key = this.utility.generateKey();

            var finances : Finances = {
              id : 0,
              userid : this.infoConnexion.utilisateurId,
              montant : data.montant * -1,
              type : Flux.Debit,
              commentaire : data.description,
              check : false,
              createdOn : new Date(),
              isFirebase : false,
              firebaseMethod : Methods.POST,
              isEpargne : data.isEpargne,
              key : key
            }

            if(data.isEpargne){

              var epargne : Epargnes = {
                id : 0,
                userid : this.infoConnexion.utilisateurId,
                epargne : data.montant,
                commentaire : data.description,
                check :  false,
                createdOn : finances.createdOn,
                isFirebase : false,
                firebaseMethod : Methods.POST,
                key : key
              }
              await this.epargneservice.post(epargne);
            }

            await this.financesservice.post(finances);
            await this.refresh();
            this.setIsVisible();

            if(!finances.isEpargne){

              var depense : Depenses = {
                id : 0,
                userid : this.infoConnexion.utilisateurId,
                depense : data.montant,
                commentaire : data.description,
                check : false,
                createdOn : finances.createdOn,
                isFirebase : false,
              firebaseMethod : Methods.POST,
              key : key
            }
            await this.depenseservice.post(depense);
          }
          
          await this.calculeTotal();

          }

        }
      ]
    });
    await alert.present();
  }

  public async postCredit(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Type d\'opération',
      inputs : [
        {
          type : 'number',
          name : 'montant',
          placeholder : 'Montant'
        },
        {
          type : 'text',
          name : 'description',
          placeholder : 'Description'
        },
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
          text: 'Valider',
          handler: async (data : any) => {
            var finances : Finances = {
              id : 0,
              userid : this.infoConnexion.utilisateurId,
              montant : data.montant,
              type : Flux.Credit,
              commentaire : data.description,
              check : false,
              createdOn : new Date(),
              isFirebase : false,
              firebaseMethod : Methods.POST,
              isEpargne : false,
              key : this.utility.generateKey()

            }

            await this.financesservice.post(finances);
            await this.refresh();
            this.setIsVisible();
            
            await this.calculeTotal();
          
          }
        }
      ]
    });
    await alert.present();
  }
  

}