import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Memos } from '../models/memo';
import { UtilityService } from '../services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  constructor(private storage : Storage,
              private utility : UtilityService) { }

  protected async getMemos(){
    const memos : Array<Memos> = await this.storage.get(this.utility.localstorage.Mémo);
    return memos;
  }

  protected async postMemos(memos : Array<Memos>){
    await this.utility.saveToLocalStorage(this.utility.localstorage.Mémo, memos);
    const response : Array<Memos> = await this.getMemos();
    return response;
  }

  protected async postMemo(memo : Memos){
    const memos : Array<Memos> = await this.getMemos();
    memos.push(memo);
    const reponse = await this.postMemos(memos);
    
    return {
      all : reponse,
      memo : memo
    }
  }

  private async getMemoId(memo : Memos){
    const memos : Array<Memos> = await this.getMemos();
    const index = await memos.findIndex(memos => memos === memo);
    return index;
  }

  protected async putMemo(memo : Memos){
    const memos : Array<Memos> = await this.getMemos();
    const index = await this.getMemoId(memo);
    memos[index] = memo;
    const response = await this.postMemos(memos);
    return {
      all : response,
      memo : memo
    }
  }

  protected async deleteMemo(memo : Memos){
    const memos : Array<Memos> = await this.getMemos();
    const index = await this.getMemoId(memo);
    memos.splice(index,1);
    const response = await this.postMemos(memos);
    return {
      all : response,
      memo : memo
    }
  }


}
