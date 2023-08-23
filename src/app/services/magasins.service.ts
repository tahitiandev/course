import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Magasins } from '../models/Magasins';
@Injectable({
  providedIn: 'root'
})
export class MagasinsService {

  constructor(private storage : StorageService) { }

  public async post(magasin : Magasins){
    await this.storage.post(LocalName.Magasins, magasin)
  }

  public async get(){
    return await this.storage.get(LocalName.Magasins);
  }

  public async getMagasinById(id : number){
    const magasins : Array<Magasins> = await this.get();
    return await magasins.find(magasin => magasin.id == id);
  }

}
