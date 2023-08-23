import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage : Storage) { }

  public postAll(localName : string, data : Array<any>){
    this.storage.set(
      localName,
      data
    )
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
