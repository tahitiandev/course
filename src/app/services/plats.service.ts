import { Injectable } from '@angular/core';
import { Plats } from '../models/plats';
import { UtilityService } from './utility.service';
import { Storage } from '@ionic/storage';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Deleted } from '../models/deleted';
import { FirebaseService } from './firebase.service';
import { ArticlesService } from './articles.service';

@Injectable({
  providedIn: 'root'
})
export class PlatsService {

  constructor(private utility : UtilityService,
              private storage : Storage,
              private firebaseService : FirebaseService,
              private articleService : ArticlesService) { }

  private plats : Plats [] = [
    {
      libelle : 'Pâte carbonara',
      codeArticle : [{
        codeArticle : 'FLCAR',
        quantite : 2
      },{
        codeArticle : 'VCJAM',
        quantite : 5
      }],
      firebase : false
    },
    {
      libelle : 'Hamburger',
      codeArticle : [{
        codeArticle : 'FLORA',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 5
      }],
      firebase : false
    },
    {
      libelle : 'Steak pâte',
      codeArticle : [{
        codeArticle : 'FLCAR',
        quantite : 2
      },{
        codeArticle : 'VCJAM',
        quantite : 5
      }],
      firebase : false
    },
    {
      libelle : 'Boeuf braisé',
      codeArticle : [{
        codeArticle : 'FLTOM',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 9
      }],
      firebase : false
    },
    {
      libelle : 'Lentille',
      codeArticle : [{
        codeArticle : 'FLTOM',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 9
      }],
      firebase : false
    },
    {
      libelle : 'Sashimis',
      codeArticle : [{
        codeArticle : 'FLTOM',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 9
      }],
      firebase : false
    },
    {
      libelle : 'Charcuterie',
      codeArticle : [{
        codeArticle : 'FLTOM',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 9
      }],
      firebase : false
    },
    {
      libelle : 'Poulet rôti',
      codeArticle : [{
        codeArticle : 'FLTOM',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 9
      }],
      firebase : false
    },
    {
      libelle : 'Poulet blanc',
      codeArticle : [{
        codeArticle : 'FLTOM',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 9
      }],
      firebase : false
    },
    {
      libelle : 'Quiche',
      codeArticle : [{
        codeArticle : 'FLTOM',
        quantite : 1
      },{
        codeArticle : 'FLORA',
        quantite : 9
      }],
      firebase : false
    },





  ];

  // setPlatsToLocalStorage(){
  //   this.storage.set(this.utility.localstorage.Plats, this.plats);
  // }

  async setDefaultPlatData(){
    await this.storage.set(this.utility.localstorage.Plats, this.plats)
  }

  async getPlatFromLocalStorage(){
    const plats : Plats [] = await this.storage.get(this.utility.localstorage.Plats)
    return plats;
  }

  async searchPlatByLibelle(libelle : string){

    this.plats = [];
    const plats = await this.getPlatFromLocalStorage();
    this.plats = plats;
    
    const result = await this.plats.find((plats : Plats) => {
      return plats.libelle === libelle
    })

    return result;

  }

  async setPlatToLocalStorage(newPlat : Plats){
    
    const plats: Plats[] = await this.getPlatFromLocalStorage();
    plats.push(newPlat)    
    await this.storage.set(this.utility.localstorage.Plats, plats)
  }
  
  async updatePlatToLocalStorage(platupdate : Plats){
    
    var plats : Plats [] = [];
    const platsLS : Plats[] = await this.getPlatFromLocalStorage();
    
    for(let plat of platsLS){
      if(plat.libelle === platupdate.libelle){
        await plats.push(platupdate)
      }
      if(plat.libelle != platupdate.libelle){
        await plats.push(plat)
      }
    }
    await this.storage.set(this.utility.localstorage.Plats, plats)  
    
  }

  sortByLibelleFamilleArticle(plats:Plats[]){
    return plats.sort((a,b) => {
      let x  = a.libelle.toLowerCase();
      let y  = b.libelle.toLowerCase();
      if(x < y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }

  async deletePlat(index : number){

    const plats : Plats [] = await this.storage.get(this.utility.localstorage.Plats);
    const platsNew : Plats [] = [];

    for(let i = 0; i < plats.length; i++){
      if(i != index){
        platsNew.push(plats[i]);
      }
    }

    this.storage.set(this.utility.localstorage.Plats, platsNew)

    // delete to firebase
    const platInfo : Plats = await this.searchPlatByLibelle(plats[index].libelle);
    this.firebaseService.postToLocalStorageDeleted(platInfo.firebase, this.utility.localstorage.Plats, platInfo.documentId)

    return platsNew;


  }

  // fonctionne pas
  async actualisePrixPlat(){
    const plats : Plats [] = await this.getPlatFromLocalStorage();
    var total : number = 0;
    
    for(let plat of plats){

      for(let articlesss of plat.codeArticle){
        
        const article = await this.articleService.searchArticleByArticleCode(articlesss.codeArticle);
        total += (article.prix - 0) * (articlesss.quantite - 0)

      }
      
      plat.prix = total
      total = 0;
    }

  } // actualisePrixPlat


  
}
