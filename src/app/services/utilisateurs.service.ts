import { Injectable } from '@angular/core';
import { Utilisateurs } from '../models/Utilisateurs';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  constructor(private storage : StorageService) { }

  public async post(utilisateur : Utilisateurs){
    utilisateur.id = Date.now();
    await this.storage.post(LocalName.Utilisateurs, utilisateur);
  }

  public async get(){
    return await this.storage.get(LocalName.Utilisateurs);
  }
}
