import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Plats } from '../models/Plats';
import { PlatDetails } from '../models/Plat-details';

@Injectable({
  providedIn: 'root'
})
export class PlatsService {

  constructor(private storage : StorageService) { }

  public async get(){
    return await this.storage.get(LocalName.Plats);
  }

  public async post(plat : Plats){
    await this.storage.post(LocalName.Plats, plat);
  }

  public async put(plat : Plats){
    await this.storage.put(LocalName.Plats, plat);
  }

  public async delete(plat : Plats){
    await this.storage.delete(LocalName.Plats, plat);
  }

  public async getPlatById(id : number){
    const plats = await this.get();
    return await plats.find(plats => plats.id === id);
  }

  sortByOrdre(platdetail : Array<PlatDetails>){
    return platdetail.sort((a,b) => {
      let x  = a.ordre;
      let y  = b.ordre;
      if(x < y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }

  public async getPlatDetails(courseId : number){
    const platDetails = await this.storage.get(LocalName.PlatDetails);
    return await platDetails.filter((platdetails : PlatDetails) => platdetails.courseId === courseId);
  }

  public async postPlatDetail(platDetail : PlatDetails){


    var platdetails : Array<PlatDetails> = await this.getPlatDetails(platDetail.courseId);
    var platDetailOrderByOrdre : Array<PlatDetails> = this.sortByOrdre(platdetails);

    if(platDetailOrderByOrdre.length > 0){
      var ordre = platDetailOrderByOrdre[platDetailOrderByOrdre.length - 1].ordre + 1
      platDetail.ordre = ordre;
    }

    await this.storage.post(LocalName.PlatDetails, platDetail);
  }

  public async putPlatDetail(platDetail : PlatDetails){
    await this.storage.put(LocalName.PlatDetails, platDetail);
  }

  public async deletePlatDetail(platDetail : PlatDetails){
    await this.storage.delete(LocalName.PlatDetails, platDetail);
  }

}
