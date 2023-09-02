import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  public async post(collectionName : string, data : Array<any>){
    const notesRef = collection(this.firestore, collectionName);
    addDoc(notesRef, data);
  }


}
