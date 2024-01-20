import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BudgetParMois } from 'src/app/models/BudgetParMois';
import { BudgetsService } from 'src/app/services/budgets.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  budgets : Array<BudgetParMois> = [];

  constructor(private alertController : AlertController,
              private utility : UtilityService,
              private budgetsservice : BudgetsService) { }

  ngOnInit() {
    this.refresh();
  }

  public async refresh(){
    const budgets = await this.get();
    this.budgets = budgets;
  }

  private async get(){
    return await this.budgetsservice.get();
  }

  public async post(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Faite une epargne',
      inputs: [
        {
          type : 'text',
          name : 'mois',
          placeholder : 'Mois'
        },
        {
          type : 'number',
          name : 'budget',
          placeholder : 'Budget'
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
          handler: async (data : any) => {
            const budget : BudgetParMois = {
              id : 0,
              mois : data.mois,
              budget : data.budget,
              isFirebase : false
            }

            await this.budgetsservice.post(budget);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async put(mois : string){

    var budget : BudgetParMois = await this.budgetsservice.getByMois(mois);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier le budget de ' + budget.mois,
      inputs: [
        {
          type : 'number',
          name : 'budget',
          placeholder : budget.budget.toString()
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
          handler: async (data : any) => {
            budget.budget = data.budget === "" ? budget.budget : data.budget;

            await this.budgetsservice.put(budget);
            await this.refresh();

            const connexionInfo = await this.utility.getConnexionInfo();
            connexionInfo.budget = budget.budget;
            await this.utility.putConnexionInfo(connexionInfo);

          }
        }
        
      ]
    });
    await alert.present();
  }

}
