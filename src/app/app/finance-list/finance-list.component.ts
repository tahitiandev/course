import { Component, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Flux } from 'src/app/enums/Flux';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Finances } from 'src/app/models/Finances';
import { DepensesService } from 'src/app/services/depenses.service';
import { EpargnesService } from 'src/app/services/epargnes.service';
import { FinancesService } from 'src/app/services/finances.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-finance-list',
  templateUrl: './finance-list.component.html',
  styleUrls: ['./finance-list.component.scss'],
})
export class FinanceListComponent  implements OnInit {

  @Input() finances : Array<Finances> = [];
  infoConnexion : ConnexionInfo;

  constructor(private financeservice : FinancesService,
              private alertController : AlertController,
              private depenseservice : DepensesService,
              private epargneservice : EpargnesService,
              private utility : UtilityService) { }

  async ngOnInit() {
    this.infoConnexion = await this.utility.getConnexionInfo();
  }

  private async refresh(){
    this.finances = await this.get();
  }

  public async delete(finance : Finances){
    
    if(finance.type === Flux.Debit){
      await this.depenseservice.deleteByKey(finance.key);

      if(finance.isEpargne){
        await this.epargneservice.deleteByKey(finance.key);
      }
    }
    
    await this.financeservice.delete(finance);
    await this.refresh();
  }

  public async get(){
    return await this.financeservice.get();
  }

  public async put(finance : Finances){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mise à jour',
      inputs: [
        {
          type : 'number',
          name : 'montant',
          value : finance.montant
        },
        {
          type : 'textarea',
          name : 'commentaire',
          value : finance.commentaire
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
          handler: async (result : Finances) => {

            finance.modifiedOn = new Date();
            finance.userid = (await this.utility.getConnexionInfo()).utilisateurId;
            finance.montant = result.montant;
            finance.commentaire = result.commentaire === undefined ? "" : result.commentaire;

            if(finance.isEpargne){
              await this.epargneservice.putByKey(finance.key, finance.montant, finance.commentaire);
            }else{
              await this.depenseservice.putByKey(finance.key, finance.montant, finance.commentaire);
            }

            await this.financeservice.put(finance);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

}
