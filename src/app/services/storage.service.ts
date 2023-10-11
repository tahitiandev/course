import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirestoreService } from './firestore.service';
import { LocalName } from '../enums/LocalName';
import { ConnexionInfo } from '../models/ConnexionInfo';

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

    const connexionInfo : ConnexionInfo = await this.getConnexionInfo();
    
    if(connexionInfo.isOnline){

      const dataIsFirebaseFalse = await datas.filter(data => !data.isFirebase);

      await dataIsFirebaseFalse.map(async(data) => {
        data.isFirebase = true;
  
        await this.firestore.post(
          localName,
          data,
          data.id.toString()
        )
      })

    }

  }

  public async post(localName : string, data : any){
    var datas : Array<any> = await this.getAll(localName);
    data.id = Number(new Date());
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

    const connexionInfo : ConnexionInfo = await this.getConnexionInfo();
    if(connexionInfo.isOnline){
      await this.firestore.put(
        localName,
        data.id.toString(),
        data
      )
    }
  
  }
  public async delete(localName : string, data : any){
    const datas : Array<any> =  await this.getAll(localName);
    const index = await this.getIndex(localName, data.id);
    datas[index].deletedOn = new Date();
    await this.postAll(localName, datas);  

    const connexionInfo : ConnexionInfo = await this.getConnexionInfo();
    if(connexionInfo.isOnline){
      await this.firestore.put(
        localName,
        data.id.toString(),
        data
      )
    }

  }

  public async deleteDefinitivement(localName : string, data : any){
    const datas : Array<any> =  await this.getAll(localName);
    const index = await this.getIndex(localName, data.id);
    await datas.splice(index,1);
    await this.postAll(localName, datas);  
    
    const connexionInfo : ConnexionInfo = await this.getConnexionInfo();
    if(connexionInfo.isConnected){
      await this.firestore.delete(
        localName,
        data.id.toString(),
        data
      )
    }

  }

  public async synchroniserAvecFirestore(){
    const connexionInfo : ConnexionInfo = await this.getConnexionInfo();
    if(connexionInfo.isOnline){
      await this.synchroniser(LocalName.Utilisateurs);
      await this.synchroniser(LocalName.Articles);
      await this.synchroniser(LocalName.Courses);
      await this.synchroniser(LocalName.Familles);
      await this.synchroniser(LocalName.CourseDetails);
      await this.synchroniser(LocalName.Memos);
      await this.synchroniser(LocalName.HistoriquePrix);
      await this.synchroniser(LocalName.Magasins);
      await this.synchroniser(LocalName.Plats);
      await this.synchroniser(LocalName.PlatDetails);
      await this.synchroniser(LocalName.Groupes);
      await this.synchroniser(LocalName.Menus);
    }else{
      alert('Le mode onLine est désactivé')
    }
  }

  public async synchroniser(localName : string){
    const connexionInfo : ConnexionInfo = await this.getConnexionInfo();

    if(connexionInfo.isOnline){

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

    }else{
      alert('Le mode onLine est désactivé')
    }
  }
  
  // fonction à modifier plus tard
  public async set(localName : string, data:any){
    await this.storage.set(localName, data);
  }

  private async getConnexionInfo(){
    return await this.storage.get(LocalName.InfoConnexion);
  }

}
