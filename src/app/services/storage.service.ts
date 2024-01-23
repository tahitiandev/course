import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FirestoreService } from './firestore.service';
import { LocalName } from '../enums/LocalName';
import { ConnexionInfo } from '../models/ConnexionInfo';
import { Methods } from '../enums/Methods';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage : Storage,
              private firestore : FirestoreService) { }

  public async postAll(localName : string, datas : Array<any>){

    const connexionInfo : ConnexionInfo = await this.getConnexionInfo();
    if(connexionInfo.isOnline){

      const datasend = await datas.filter(data => !data.isFirebase);

      await datasend.map(async(data) => {
        data.isFirebase = true;
  
        await this.firestore.post(
          localName,
          data,
          data.id.toString()
        )
      })

    }

    await this.storage.set(
      localName,
      datas
    )

  }

  private parseDate(date : any) {
    const dateObject = new Date(date);

    // Obtenir le temps en millisecondes depuis l'époque
    const milliseconds = dateObject.getTime();

    // Convertir les millisecondes en secondes et nanosecondes
    const seconds = Math.floor(milliseconds / 1000);
    const nanoseconds = (milliseconds % 1000) * 1e6;

    // Retourner l'objet avec nanoseconds et seconds
    return { 
            nanoseconds : nanoseconds,
            seconds : seconds 
          };
  }

  public async post(localName : string, data : any){

    var datas : Array<any> = await this.getAll(localName);
    data.id = Number(new Date());
    data.createdOn = this.parseDate(new Date());
    data.modifiedOn = null;
    data.deletedOn = null;
    data.isFirebase = false;
    datas.push(data);
    await this.postAll(localName, datas);

  }

  public async get(localName : string){
    const datas : Array<any> = await this.storage.get(localName);
    return await datas.filter(data => data.deletedOn === '' || data.deletedOn === null || data.deletedOn !== undefined);
  }

  public async getAll(localName : string){
    return await this.storage.get(localName);
  }

  private async getIndex(localName : string, id : number){
    const datas : any[] = await this.getAll(localName);
    return await datas.findIndex(data => data.id === id);
  }

  public async put(localName : string, data : any){
    const datas : Array<any> =  await this.getAll(localName);
    const index = await this.getIndex(localName, data.id);
    datas[index] = data;
    datas[index].modifiedOn = new Date();
    
    const connexionInfo : ConnexionInfo = await this.getConnexionInfo();
    if(connexionInfo.isOnline){
      
      await this.firestore.put(
        localName,
        data.id.toString(),
        data
        )
        
      }
      else{
        
        if(datas[index].isFirebase){
          datas[index].firebaseMethod = Methods.PUT;
        }
        
      }
        
      await this.postAll(localName, datas);
  
  }

  public async delete(localName : string, data : any){
    const datas : Array<any> =  await this.getAll(localName);
    const index = await this.getIndex(localName, data.id);
    datas[index].deletedOn = new Date();
    datas[index].firebaseMethod = Methods.DELETE;
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

    const connexionInfo : ConnexionInfo = await this.getConnexionInfo();

    if(connexionInfo.isOnline){

      datas.splice(index,1);
      await this.firestore.delete(
        localName,
        data.id.toString(),
        data
      )

    }
    else{
      if(datas[index].isFirebase){
        datas[index].firebaseMethod = Methods.DELETE;
        datas[index].deletedOn = new Date();
      }
      else{
        datas.splice(index,1);
      }
    }

    await this.postAll(
      localName,
      datas
    )

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
      await this.synchroniser(LocalName.Depenses);
      await this.synchroniser(LocalName.Apports);
      await this.synchroniser(LocalName.Epargnes);
      await this.synchroniser(LocalName.Magasins);
      await this.synchroniser(LocalName.Plats);
      await this.synchroniser(LocalName.PlatDetails);
      await this.synchroniser(LocalName.Groupes);
      await this.synchroniser(LocalName.Menus);
      await this.synchroniser(LocalName.Budget);
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

          elem.isFirebase = true;
          await this.firestore.post(
            localName,
            elem,
            elem.id.toString()
          )

        })
      } // if

      const elemPutorDelete : Array<any> = await datas.filter(data => {
        return data.firebaseMethod === Methods.DELETE || data.firebaseMethod === Methods.PUT;
      })

      if(elemPutorDelete.length > 0){

        elemPutorDelete.map(async(elem) => {

          if(elem.firebaseMethod === Methods.PUT){
            await this.put(localName, elem);
          }

          if(elem.firebaseMethod === Methods.DELETE){
            await this.deleteDefinitivement(localName, elem);
          }

        })
      }

      (await this.firestore.getAll(localName)).subscribe(async(datas) => {

        if(localName === LocalName.Apports || localName === LocalName.Depenses || localName === LocalName.Epargnes){
          var dataUserConnecte = await datas.filter((data : any)=> data.userid === connexionInfo.utilisateurId);
          this.storage.set(localName, dataUserConnecte)
        }else{
          this.storage.set(localName, datas)
        }

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
