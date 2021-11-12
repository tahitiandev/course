import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Deleted } from '../models/deleted';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage : Storage) { }

  async postToLocalStorageDeleted(firebaseInfo : boolean, collectionName : string, documentId : string){
    if(firebaseInfo){
      const deleted : Deleted = {
        collectionName : collectionName,
        documentId : documentId
      }

      var deletedInfo : Deleted [] = await this.storage.get('deleted');

      for(let element of deletedInfo){
        if(element.documentId != documentId){
          deletedInfo.push(element)
        }
      }

      this.storage.set('deleted', deletedInfo);
    }
  }

}
