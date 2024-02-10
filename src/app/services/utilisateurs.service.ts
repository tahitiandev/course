import { Injectable } from '@angular/core';
import { Utilisateurs } from '../models/Utilisateurs';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { UtilisateurGroupeActivation } from '../models/UtilisateurGroupeActivation';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  constructor(private storage : StorageService) { }

  public async post(utilisateur : Utilisateurs){
    console.log('2')
    utilisateur.id = Date.now();
    await this.storage.post(LocalName.Utilisateurs, utilisateur);
  }

  public async get(){
    return await this.storage.get(LocalName.Utilisateurs);
  }

  public async put(utilisateur : Utilisateurs){
    return await this.storage.put(LocalName.Utilisateurs, utilisateur);
  }

  public async delete(utilisateur : Utilisateurs){
    return await this.storage.delete(LocalName.Utilisateurs, utilisateur);
  }

  public async deleteDefinitivement(utilisateur : Utilisateurs){
    return await this.storage.deleteDefinitivement(LocalName.Utilisateurs, utilisateur);
  }

  public async getLibelleUtilisateurById(id : number){
    const utilisateurs = await this.get();
    return await utilisateurs.find(utilisateur => utilisateur.id === id).libelle;
  }

  public async getIdUtilisateurByLibelle(libelle : string){
    return (await this.get()).find(utilisateur => utilisateur.libelle == libelle).id;
  }

  public async postInvitationAuGroupe(invitation : UtilisateurGroupeActivation){
    await this.storage.post(LocalName.Invitation, invitation);
  }
}
