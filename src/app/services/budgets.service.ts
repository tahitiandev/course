import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { BudgetParMois } from '../models/BudgetParMois';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  constructor(private storage : StorageService) { }

  public async get(){
    return await this.storage.get(LocalName.Budget);
  }

  public async getByMois(mois : string){
    var budgets = await this.get();
    return await budgets.find(budget => budget.mois === mois);
  }

  public async post(budget : BudgetParMois){
    await this.storage.post(LocalName.Budget, budget)
  
  }

  public async delete(budget : BudgetParMois){
    await this.storage.deleteDefinitivement(LocalName.Budget, budget)
  }

  public async put(budget : BudgetParMois){
    await this.storage.put(LocalName.Budget, budget)
  }
}
