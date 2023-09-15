import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Memos } from '../models/Memos';
import { LocalName } from '../enums/LocalName';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  constructor(private storage : StorageService) { }

  public async post(memo : Memos){
    await this.storage.post(LocalName.Memos, memo);
  }

  public async get(){
    return await this.storage.get(LocalName.Memos);
  }

  public async put(memo : Memos){
    await this.storage.put(LocalName.Memos, memo);
  }

  public async delete(memo : Memos){
    await this.storage.deleteDefinitivement(LocalName.Memos, memo);
  }

}
