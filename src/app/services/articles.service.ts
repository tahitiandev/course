import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { UtilityService } from './utility.service';
import { LocalName } from '../enums/LocalName';
import { Articles } from '../models/Articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private storage : StorageService,
    private utility : UtilityService) { }


    public async get(){
      return this.orderByFamille(await this.storage.get(LocalName.Articles));
    }

    public async post(article : Articles){
      await this.storage.post(LocalName.Articles, article);
    }

    public async put(article : Articles){
      await this.storage.put(LocalName.Articles, article);
    }

    public async delete(article : Articles){
      await this.storage.delete(LocalName.Articles, article);
    }

    public async deleteDefinitivement(article : Articles){
      await this.storage.deleteDefinitivement(LocalName.Articles, article);
    }

    public async getArticleById(articleId : number){
      const articles : Array<Articles> = await this.get();
      return articles.filter(article => article.id == articleId);
    }

    public async getArticleByCodeBarre(codebarre : any){
      const articles : Array<Articles> = await this.get();
      return articles.filter(article => article.codeBarre == codebarre);
    }

    orderByFamille(article : Array<Articles>){
      return article.sort((a,b) => {
      let x  = a.familleId;
      let y  = b.familleId;
      if(x < y){
      return -1;
      }else{
      return 1;
      }
      return 0;
      })
    }
}
