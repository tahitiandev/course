import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BudgetParMois } from 'src/app/models/BudgetParMois';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { BudgetsService } from 'src/app/services/budgets.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  infoConnexion : ConnexionInfo;
  budgets : Array<BudgetParMois> = [];

  constructor(private alertController : AlertController,
              private utility : UtilityService,
              private budgetsservice : BudgetsService) { }

  async ngOnInit() {
    this.infoConnexion = await this.utility.getConnexionInfo();
    this.refresh();
    this.initBudget();
  }

  public async refresh(){
    const budgets = await this.get();
    this.budgets = budgets;
  }

  private async get(){
    return await this.budgetsservice.get();
  }

  private async initBudget(){
    const budgets : Array<BudgetParMois> = await this.get();
    const moisall = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
    if(budgets.length === 0){

      for(let mois of moisall){
        const budget : BudgetParMois = {
          id : 0,
          mois : mois,
          budget : 0,
          isFirebase : false,
          userid : this.infoConnexion.utilisateurId
        }
        await this.budgetsservice.post(budget)
      }
    }
    await this.refresh();
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
              isFirebase : false,
              userid : this.infoConnexion.utilisateurId
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

          }
        }
        
      ]
    });
    await alert.present();
  }

}
