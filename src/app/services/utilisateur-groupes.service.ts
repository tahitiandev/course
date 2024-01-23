import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { UtilisateurGroupes } from '../models/UtilisateurGroupes';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurGroupesService {

  constructor(private utility : UtilityService,
    private storage : StorageService) { }


    public async get(){
    return await this.storage.get(LocalName.Groupes);
    }

    public async post(groupe : any){
    await this.storage.post(LocalName.Groupes, groupe)
    }

    public async put(groupe : UtilisateurGroupes){
      return await this.storage.put(LocalName.Groupes, groupe);
    }
  
    public async delete(groupe : UtilisateurGroupes){
      return await this.storage.delete(LocalName.Groupes, groupe);
    }
  
    public async deleteDefinitivement(groupe : UtilisateurGroupes){
      return await this.storage.deleteDefinitivement(LocalName.Groupes, groupe);
    }

    public async getLibelleById(idGroupe : number){
      const groupes : Array<UtilisateurGroupes> = await this.get();
      return groupes.find(groupe => groupe.id === idGroupe)?.libelle;
    }
    
}
