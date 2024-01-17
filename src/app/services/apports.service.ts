import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Apports } from '../models/Apports';

@Injectable({
  providedIn: 'root'
})
export class ApportsService {

  constructor(private storage : StorageService) { }

  public async get(){
    return await this.storage.get(LocalName.Apports);
  }

  public async post(apports : Apports){
    await this.storage.post(LocalName.Apports, apports)
  
  }

  public async delete(apports : Apports){
    await this.storage.deleteDefinitivement(LocalName.Apports, apports)
  }

  public async put(apports : Apports){
    await this.storage.put(LocalName.Apports, apports)
  }
}
