import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage : Storage,
              private firestore : FirestoreService) { }

  public async postAll(localName : string, datas : Array<any>){
    this.storage.set(
      localName,
      datas
    )

    await datas.map(async(data) => {
      console.log(data)
      await this.firestore.post(
        localName,
        data
      )
    })
  }

  public async post(localName : string, data : any){
    var datas : Array<any> = await this.getAll(localName);
    data.createdOn = new Date();
    data.modifiedOn = null;
    data.deletedOn = null;
    datas.push(data);
    await this.postAll(localName, datas);
  }

  public async get(localName : string){
    const datas : Array<any> = await this.storage.get(localName);
    return await datas.filter(data => data.deletedOn === '' || data.deletedOn === null || typeof(data.createdOn) !== undefined);
  }

  public async getAll(localName : string){
    return await this.storage.get(localName);
  }

  private async getIndex(localName : string, id : number){
    const datas : any[] = await this.get(localName);
    return await datas.findIndex(data => data.id === id);
  }

  public async put(localName : string, data : any){
    const datas : Array<any> =  await this.getAll(localName);
    const index = await this.getIndex(localName, data.id);
    datas[index] = data;
    datas[index].modifiedOn = new Date();
    await this.postAll(localName, datas);    
  
  }
  public async delete(localName : string, data : any){
    const datas : Array<any> =  await this.getAll(localName);
    const index = await this.getIndex(localName, data.id);
    datas[index].deletedOn = new Date();
    await this.postAll(localName, datas);    
  }
}
