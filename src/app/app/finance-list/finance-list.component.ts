import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Flux } from 'src/app/enums/Flux';
import { TypeOperation } from 'src/app/enums/TypeOperation';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Finances } from 'src/app/models/Finances';
import { CoursesService } from 'src/app/services/courses.service';
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
  @Output() checkOutput = new EventEmitter<Finances>();
  @Output() recalculeTotal = new EventEmitter<any>();

  constructor(private financeservice : FinancesService,
              private alertController : AlertController,
              private depenseservice : DepensesService,
              private epargneservice : EpargnesService,
              private courseservice : CoursesService,
              private utility : UtilityService) { }

  async ngOnInit() {
    this.infoConnexion = await this.utility.getConnexionInfo();
  }

  private async refresh(){
    this.finances = await this.get();
  }

  public async delete(finance : Finances){
    
    if(finance.flux === Flux.Debit){
      await this.depenseservice.deleteByKey(finance.key);

      if(finance.isEpargne){
        await this.epargneservice.deleteByKey(finance.key);
      }
    }
    
    await this.financeservice.delete(finance);
    await this.refresh();
    this.recalculeTotal.emit();
  }

  public async get(){
    return await this.financeservice.get();
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

  public async check(finance : Finances){
    this.checkOutput.emit(finance);
  }

  public async put(finance : Finances){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mise à jour',
      inputs: [
        {
          type : 'number',
          name : 'montant',
          value : finance.montant * -1
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
            finance.montant = result.montant * -1;
            finance.commentaire = result.commentaire === undefined ? "" : result.commentaire;

            if(finance.isEpargne){
              await this.epargneservice.putByKey(finance.key, finance.montant * -1, finance.commentaire);
            }
            else{
              if(finance.type === TypeOperation.Course){
                await this.courseservice.putCourseByKey(finance.key, finance.montant * -1, finance.commentaire);
              }
              await this.depenseservice.putByKey(finance.key, finance.montant * -1, finance.commentaire);
            }

            await this.financeservice.put(finance);
            await this.refresh();

            this.recalculeTotal.emit();

          }
        }
        
      ]
    });
    await alert.present();
  }

}
