import { Injectable } from '@angular/core';
import { LocalName } from '../enums/LocalName';
import { StorageService } from './storage.service';
import { ConnexionInfo } from '../models/ConnexionInfo';

@Injectable({
  providedIn: 'root'
})
export class InfoConnexionService {

  constructor(private storage : StorageService) { }

  public async get(){
    return await this.storage.getInFoconnexion();
  }

  public async post(infonnexion : ConnexionInfo){
    await this.storage.post(LocalName.InfoConnexion, infonnexion);
  }

  public async put(infonnexion : ConnexionInfo){
    await this.storage.put(LocalName.InfoConnexion, infonnexion);
  }

  public async delete(infonnexion : ConnexionInfo){
    await this.storage.delete(LocalName.InfoConnexion, infonnexion);
  }

  public async deleteDefinitivement(infonnexion : ConnexionInfo){
    await this.storage.deleteDefinitivement(LocalName.InfoConnexion, infonnexion);
  }
}
