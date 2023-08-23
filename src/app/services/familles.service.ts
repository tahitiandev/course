import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Familles } from '../models/Familles';

@Injectable({
  providedIn: 'root'
})
export class FamillesService {

  constructor(private storage : StorageService) { }

  public async get(){
    return await this.storage.get(LocalName.Familles);
  }

  public async post(familles : Familles){
    await this.storage.post(LocalName.Familles, familles)
  }

}
