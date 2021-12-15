import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Deleted } from '../models/deleted';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage : Storage,
              private firestore : AngularFirestore) { }
  
  // Méthode qui permet de rajouter les données à supprimer sur firebase dans un localstorage nommé "deleted"
  async postToLocalStorageDeleted(firebaseInfo : boolean, collectionName : string, documentId : string){
    
    if(firebaseInfo){

      const deleted : Deleted = {
        collectionName : collectionName,
        documentId : documentId
      }

      // Get toutes les valeurs à supprimer
      var deletedInfo : Deleted [] = await this.storage.get('deleted');
      deletedInfo.push(deleted)

      this.storage.set('deleted', deletedInfo);
    }//if
  }

  // Méthode qui permet de supprimer des éléments sur firestore
  async deleteCollectionName(collectionName : string, documentId : string){
    await this.firestore.collection(collectionName)
                        .doc(documentId)
                        .delete()
  }

  // Methode qui force la mise à jour de l'ensemble des données d'une collection sur firestore
  

}
