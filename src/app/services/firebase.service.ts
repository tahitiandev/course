import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Deleted } from '../models/deleted';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilityService } from './utility.service';
import { Articles } from '../models/articles'
import { Familles } from '../models/articles'
import { Plats } from '../models/plats'
import { Courses } from '../models/courses'
import { MenuDelaSemaine } from '../models/menuDeLaSemaine'
import { Depenses } from '../models/depenses'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage : Storage,
              private firestore : AngularFirestore,
              private utility : UtilityService) { }
  
  // Méthode qui permet de rajouter les données à supprimer sur firebase dans un localstorage nommé "deleted"
  async postToLocalStorageDeleted(firebaseInfo : boolean, collectionName : string, documentId : string){
    
    if(firebaseInfo){

      const deleted : Deleted = {
        collectionName : collectionName,
        documentId : documentId
      }

      // Get toutes les valeurs à supprimer
      var deletedInfo : Deleted [] = await this.storage.get('deleted');

      // Vérifie si la valeur n'est pas déjà présente dans le localstorage deleted
      const isExist = await deletedInfo.find(alldata => {
        return alldata.documentId === documentId
      })
      if(isExist === undefined){
        deletedInfo.push(deleted)
      }
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

  async getCollectionFromFirebase(collectionName : string){
    
    await this.firestore.collection(collectionName)
                                     .snapshotChanges()
                                     .subscribe((result) => {
                                        var alldata = [];
                                        for(let data of result){
                                          var parseData : any = data.payload.doc.data();
                                          parseData.documentId = data.payload.doc.id
                                          
                                          alldata.push(parseData)
                                        }

                                        this.storage.set(this.utility.objectName['set temp collectionName'],alldata)
                                        
                                     })

  }

  private async getDataCollectionTemp(){

    return await this.storage.get(this.utility.objectName['set temp collectionName'])

  }

  async miseAJourDocumentID(){

    const articles : Array<Articles> = await this.storage.get(this.utility.localstorage.articles)
    this.getCollectionFromFirebase(this.utility.localstorage.articles)
    var articlesFirebase : Array<Articles> = await this.getDataCollectionTemp();
    
    for(let article of articlesFirebase){
      for(let articler of articles){
        if(article === articler){
          articler.documentId = article.documentId
        }
      }
    }

    const familles : Array<Familles> = await this.storage.get(this.utility.localstorage['famille d\'articles']);
    this.getCollectionFromFirebase(this.utility.localstorage['famille d\'articles'])
    var famillesFirebase : Array<Familles> = await this.getDataCollectionTemp();

    for(let famille of famillesFirebase){
      for(let familler of familles){
        if(famille === familler){
          familler.documentId = famille.documentId
        }
      }
    }

    const plats : Array<Plats> = await this.storage.get(this.utility.localstorage.Plats);
    this.getCollectionFromFirebase(this.utility.localstorage.Plats);
    var platsFirebase : Array<Plats> = await this.getDataCollectionTemp();

    for(let plat of platsFirebase){
      for(let platr of plats){
        if(plat === platr){
          platr.documentId = plat.documentId
        }
      }
    }

    const courses : Array<Plats> = await this.storage.get(this.utility.localstorage.Plats);
    this.getCollectionFromFirebase(this.utility.localstorage.Plats);
    var platsFirebase : Array<Plats> = await this.getDataCollectionTemp();

    for(let plat of platsFirebase){
      for(let platr of plats){
        if(plat === platr){
          platr.documentId = plat.documentId
        }
      }
    }



















  }
  

}
