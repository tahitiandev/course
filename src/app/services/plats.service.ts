import { Injectable } from '@angular/core';
import { Plats } from '../models/plats';
import { UtilityService } from './utility.service';
import { Storage } from '@ionic/storage';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Deleted } from '../models/deleted';
import { FirebaseService } from './firebase.service';
import { ArticlesService } from './articles.service';
import { Articles } from '../models/articles';

@Injectable({
  providedIn: 'root'
})
export class PlatsService {

  constructor(private utility : UtilityService,
              private storage : Storage,
              private firebaseService : FirebaseService,
              private articleService : ArticlesService) { }

  private plats : Array<Plats> = [];

  async setDefaultPlatData(){
    await this.storage.set(this.utility.localstorage.Plats, this.plats)
  }

  async getPlats(){

    const plats : Array<Plats> = await this.storage.get(this.utility.localstorage.Plats)
    const PlatsParse : Array<Plats> = await this.sortByLibelleFamilleArticle(plats);

    return PlatsParse;
  }

  async getPlatIndex(plat : Plats){

    const plats : Array<Plats> = await this.getPlats();
    const index = await plats.findIndex(plats => plats === plat);

    return index;
  }

  async getPlatByLibelle(libelle : string){

    const plats : Array<Plats> = await this.getPlats();    
    const plat = await plats.find((plats : Plats) => plats.libelle === libelle);

    return plat;
  }

  async postPlats(plats : Array<Plats>){

    await this.utility.saveToLocalStorage(this.utility.localstorage.Plats, plats);

    return await this.getPlats();
  }

  async postPlat(plat : Plats){
    
    const plats: Array<Plats> = await this.getPlats();
    plats.push(plat);
    await this.postPlats(plats);

    const response = {
      all : this.getPlats(),
      plat : plat
    }

    return response;
    
  }
  
  async putPlat(platupdate : Plats){
    
    var plats : Plats [] = [];
    const platsLS : Plats[] = await this.getPlats();
    
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
    const platInfo : Plats = await this.getPlatByLibelle(plats[index].libelle);
    this.firebaseService.postToLocalStorageDeleted(platInfo.firebase, this.utility.localstorage.Plats, platInfo.documentId)

    return platsNew;


  }

  // fonctionne pas
  async actualisePrixPlat(){
    const plats : Plats [] = await this.getPlats();
    var total : number = 0;
    
    for(let plat of plats){

      for(let articlesss of plat.codeArticle){
        
        const article = await this.articleService.getArticleByArticleCode(articlesss.codeArticle);
        total += (article.prix - 0) * (articlesss.quantite - 0)

      }
      
      plat.prix = total
      total = 0;
    }

  } // actualisePrixPlat

  async calculePrixTotalPlat(plat : Plats){

    const articles : Array<Articles> = await this.articleService.getArticles();

    var total : number = 0;
    
    for(let article of plat.codeArticle){
      var articleInfo = articles.find(s => {
        return s.code === article.codeArticle;
      })
      total += (articleInfo.prix-0) * (article.quantite-0)
    }
    return total;
    
  }


  
}
