import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Depenses } from '../models/Depenses';

@Injectable({
  providedIn: 'root'
})
export class DepensesService {

  constructor(private storage : StorageService) { }

  public async get(){
    return await this.storage.get(LocalName.Depenses);
  }

  public async post(depenses : Depenses){
    await this.storage.post(LocalName.Depenses, depenses)
  
  }

  public async delete(depenses : Depenses){
    await this.storage.deleteDefinitivement(LocalName.Depenses, depenses)
  }

  public async put(depenses : Depenses){
    await this.storage.put(LocalName.Depenses, depenses)
  }

}
