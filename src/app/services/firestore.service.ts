import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc,setDoc } from '@angular/fire/firestore';
import { Articles } from '../models/Articles';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  public async post(collectionName : string, data : Array<any>, id : string){

    const firebaseApp = initializeApp(environment.firebaseConfig);
    const db = getFirestore(firebaseApp)

    await setDoc(doc(db, collectionName, id), data);
    
  }

  public async postSingle(collectionName: string, data: any, id : string) {
    const firebaseApp = initializeApp(environment.firebaseConfig);
    const db = getFirestore(firebaseApp);

    await addDoc(collection(db, collectionName, id), data);
}

  public async getAll (collectionName : string) {
    const firestoredata = await collection(this.firestore, collectionName);
    return collectionData(firestoredata);
  }

  public async put(collectionName : string, id : string, data : any){
    const firestoredata = doc(this.firestore, collectionName + '/' + id);
    return updateDoc(firestoredata, data);
  }

  public async delete(collectionName : string, id : string, data : any){
    const firestoredata = doc(this.firestore, collectionName + '/' + id);
    return deleteDoc(firestoredata);
  }

}
