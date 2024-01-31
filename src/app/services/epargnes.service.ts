import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Epargnes } from '../models/Epargnes';

@Injectable({
  providedIn: 'root'
})
export class EpargnesService {

  constructor(private storage : StorageService) { }

  public async get(){
    return await this.storage.get(LocalName.Epargnes);
  }

  public async getById(id : number){
    const epargne = await this.get();
    return await epargne.find(epargne => epargne.id === id);
  }

  public async post(epargnes : Epargnes){
    await this.storage.post(LocalName.Epargnes, epargnes)
  
  }

  public async delete(epargnes : Epargnes){
    await this.storage.deleteDefinitivement(LocalName.Epargnes, epargnes)
  }

  public async put(epargnes : Epargnes){
    await this.storage.put(LocalName.Epargnes, epargnes)
  }

  public async deleteByKey(key : any){
    var epargnes = await this.get();
    var epargne : Epargnes = await epargnes.find((epargne : Epargnes) => epargne.key === key);
    await this.delete(epargne);
  }

}
