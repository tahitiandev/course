import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { HistoriquePrix } from '../models/HistoriquePrix';

@Injectable({
  providedIn: 'root'
})
export class HistoriquePrixService {

  constructor(private storage : StorageService) { }

  public async get(){
    const historiqueprix : Array<HistoriquePrix> = await await this.storage.get(LocalName.HistoriquePrix);
    return historiqueprix;
  }

  public async post(historiquePrix : HistoriquePrix){
    await this.storage.post(LocalName.HistoriquePrix, historiquePrix)
  }

  public async put(historiquePrix : HistoriquePrix){
    await this.storage.put(LocalName.HistoriquePrix, historiquePrix)
  }

  public async delete(historiquePrix : HistoriquePrix){
    await this.storage.delete(LocalName.HistoriquePrix, historiquePrix)
  }

  public async deleteDefinitivement(historiquePrix : HistoriquePrix){
    await this.storage.deleteDefinitivement(LocalName.HistoriquePrix, historiquePrix)
  }

}
