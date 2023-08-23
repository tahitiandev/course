import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';

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
    groupe.id = Date.now();
    await this.storage.post(LocalName.Groupes, groupe)
    }
    
}
