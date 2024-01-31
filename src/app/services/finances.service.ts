import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Finances } from '../models/Finances';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {

  constructor(private storage : StorageService) { }

  public async get(){
    return await this.storage.get(LocalName.Finances);
  }

  public async post(finances : Finances){
    await this.storage.post(LocalName.Finances, finances)
  
  }

  public async delete(finances : Finances){
    await this.storage.deleteDefinitivement(LocalName.Finances, finances)
  }

  public async put(finances : Finances){
    await this.storage.put(LocalName.Finances, finances)
  }

  public async deleteByKey(key : any){
    var finances = await this.get();
    var finance : Finances = await finances.find((finance : Finances) => finance.key === key);
    await this.delete(finance);
  }

  public async putByKey(key : any, montant : number, description : string){
    var finances = await this.get();
    var finance : Finances = await finances.find((finance : Finances) => finance.key === key);
    finance.commentaire = description;
    finance.montant = montant;
    await this.put(finance);
  }

}
