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

  public async getMemos(){
    const memos : Array<Memos> = await this.storage.get(this.utility.localstorage.Mémo);
    const memosActif = await memos.filter(memos => !memos.isDeleted);
    return memosActif;
  }

  public async postMemos(memos : Array<Memos>){
    await this.utility.saveToLocalStorage(this.utility.localstorage.Mémo, memos);
    const response : Array<Memos> = await this.getMemos();
    return response;
  }

  public async postMemo(memo : Memos){
    const memos : Array<Memos> = await this.getMemos();
    memos.push(memo);
    const response = await this.postMemos(memos);
    
    return {
      all : response,
      memo : memo
    }
  }

  private async getMemoIndex(memo : Memos){
    const memos : Array<Memos> = await this.getMemos();
    const index = await memos.findIndex(memos => {
      return memos.id === memo.id
    });
    return index;
  }

  public async putMemo(memo : Memos){
    const memos : Array<Memos> = await this.getMemos();
    const index = await this.getMemoIndex(memo);
    memos[index] = memo;
    const response = await this.postMemos(memos);
    return {
      all : response,
      memo : memo
    }
  }

  public async deleteMemo(memo : Memos){
    memo.isDeleted = true;
    const response = await this.putMemo(memo);
    return {
      all : response.all,
      memo : response.memo
    }
  }

  private async orderById(memos : Array<Memos>){
    return memos.sort((a,b) => {
      let x  = a.id;
      let y  = b.id;
      if(x < y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }

  public async generateMemoId(){
    
    const allmemos : Array<Memos> = await this.storage.get(this.utility.localstorage.Mémo);
    const memos : Array<Memos> = await this.orderById(allmemos);

    if(memos.length !== 0){

      return memos[memos.length - 1].id + 1;

    }else{

      return 0;

    }

  }


}
