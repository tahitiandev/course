import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Menu } from '../models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private storage : StorageService) { }

  public async get(){
    return await this.storage.get(LocalName.Menus);
  }

  public async getByMois(mois : string){
    var menus = await this.get();
    return await menus.find(menu => menu.mois === mois);
  }

  public async post(menu : Menu){
    await this.storage.post(LocalName.Menus, menu)
  
  }

  public async delete(menu : Menu){
    await this.storage.deleteDefinitivement(LocalName.Menus, menu)
  }

  public async put(menu : Menu){
    await this.storage.put(LocalName.Menus, menu)
  }
}
