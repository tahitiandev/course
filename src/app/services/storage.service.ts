import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirestoreService } from './firestore.service';
import { LocalName } from '../enums/LocalName';

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

    if(navigator.onLine){
      await datas.map(async(data) => {
        if(!data.isFirebase){
  
          data.isFirebase = true;
  
          await this.firestore.post(
            localName,
            data,
            data.id.toString()
          )
        }
      })
    }

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

    await this.firestore.put(
      localName,
      data.id.toString(),
      data
    )
  
  }
  public async delete(localName : string, data : any){
    const datas : Array<any> =  await this.getAll(localName);
    const index = await this.getIndex(localName, data.id);
    datas[index].deletedOn = new Date();
    await this.postAll(localName, datas);  
    
    await this.firestore.put(
      localName,
      data.id.toString(),
      data
    )

  }

  public async synchroniserAvecFirestore(){
    if(navigator.onLine){
      await this.synchroniser(LocalName.Articles);
      await this.synchroniser(LocalName.Courses);
      await this.synchroniser(LocalName.CourseDetails);
      await this.synchroniser(LocalName.Familles);
      await this.synchroniser(LocalName.Magasins);
      await this.synchroniser(LocalName.Plats);
      await this.synchroniser(LocalName.PlatDetails);
      await this.synchroniser(LocalName.Utilisateurs);
      await this.synchroniser(LocalName.Groupes);
      await this.synchroniser(LocalName.Menus);
    }else{
      alert('Pas de connexion internet')
    }
  }

  public async synchroniser(localName : string){
    const datas : Array<any> = await this.storage.get(localName);
    const elemNotSendToFirebase = await datas.filter(data =>  !data.isFirebase);
    if(elemNotSendToFirebase.length > 0){
      elemNotSendToFirebase.map(async elem => {
        await this.post(localName, elem);
      })
    }
    (await this.firestore.getAll(localName)).subscribe(datas => {
      this.storage.set(localName, datas)
    })
  }
  
  // fonction à modifier plus tard
  public async set(localName : string, data:any){
    await this.storage.set(localName, data);
  }

}
