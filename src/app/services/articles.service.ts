import { Injectable } from '@angular/core';
import { Articles, Familles } from '../models/articles';
import { Storage } from '@ionic/storage';
import { UtilityService } from './utility.service';
import { CodeArticle } from '../models/plats';
import { Deleted } from '../models/deleted';
import { FirebaseService } from './firebase.service';
import { AlertController } from '@ionic/angular';
import { CreerArticleAPartirDuCodeBarreResponse } from '../models/creerArticleAPartirDuCodeBarreResponse';
import { Settings } from '../models/setting';
import { Liste } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private storage : Storage,
              private utility : UtilityService,
              private firebaseService : FirebaseService,
              private alertController: AlertController) { }

  private articles : Array<Articles> = [];
  private settings : Settings;
  private familles : Array<Familles> = [];

  async onInit(){
    const settings : Settings = await this.utility.getSetting();
    this.settings = settings
  }

  async getFamilles(){

    const familles : Array<Familles> =  await this.storage.get(this.utility.localstorage['famille d\'articles']);
    const famillesOrderBy : Array<Familles> = await this.sortByCodeFamilleArticle(familles);

    return famillesOrderBy;
  }

  async generateFamilleId(){

    const familles : Array<Familles> = await this.getFamilles();
    var id = parseInt(familles[familles.length - 1].code) + 1

    return id.toString();
  }

  async generateArticleId(){

    const articlesLS : Array<Articles> = await this.getArticles();
    const articles : Array<Articles> = await this.sortByArticleCode(articlesLS);
    const articleSansErreur : Array<Articles> = await articles.filter(result => result.code !== '[object Promise]');

    if(articleSansErreur.length > 0){

      return parseInt(articleSansErreur[articleSansErreur.length - 1].code) + 1

    }else{

      return 0

    }
  }

  async setDefaultArticleData(){

    await this.postArticles(this.articles);
    
  }
  
  async setDefaultFamilleArticleData(){
    
    await this.postFamilles(this.familles);

  }

  async putArticle(article : Articles){

    const articles : Array<Articles> = await this.getArticles();
    const index = await articles.findIndex(articles =>  articles.code === article.code && articles.documentId === article.documentId);
    
    if(article.firebase){
      article.isModified = true;
    }
    articles.splice(index,1);
    articles.push(article);
    const result = this.postArticles(articles);

    const response = {
      all : result,
      article : article
    }

    return response;

  }

  async getArticles(){

    const articles : Array<Articles> = await this.storage.get(this.utility.localstorage.articles)
    const articlesOrderBy : Array<Articles> = await this.sortByArticleCode(articles)

    return articlesOrderBy;
  }
  
  async getArticleIndex(article : Articles){
    const articles = await this.getArticles();
    const index = await articles.findIndex(articles => articles === article);
    return index;
  }

  async postArticles(articles : Array<Articles>){

    await this.utility.saveToLocalStorage(this.utility.localstorage.articles, articles);
    return this.getArticles();

  }

  async postArticle(article : Articles){

    const articles = await this.getArticles();
    articles.push(article);

    const result = await this.postArticles(articles);
    const index = await this.getArticleIndex(article);

    const response = {
      all : result,
      article : result[index]
    };

    return response;
  }

  async putFamille(famille : Familles){

    const familles : Array<Familles> = await this.getFamilles();
    const index = await familles.findIndex(familles => familles.code === famille.code && familles.documentId === famille.documentId);
    familles[index] = famille;

    if(famille.firebase){
      familles[index].isModified = true;
    }

    await this.postFamilles(familles);

    return familles;

  }

  async deleteArticle(articleDeleted : Articles){ 

    const articles : Array<Articles> = await this.getArticles();
    const index = await articles.findIndex(s => s.code === articleDeleted.code);
    
    articles[index].isDeleted = true;
    await this.postArticles(articles);

    return articles;

  }

  async deleteFamille(famille : Familles){

    const familles : Array<Familles> = await this.storage.get(this.utility.localstorage['famille d\'articles']);
    const index = await familles.findIndex(s => s.code === famille.code);
    familles[index].isDeleted = true;
    
    const result = await this.postFamilles(familles)

    return result;
    
  }

  async postFamilles(familles : Array<Familles>){

    await this.storage.set(this.utility.localstorage['famille d\'articles'], familles);
    return familles;
  }

  async postFamille(famille : Familles){

    const familles : Array<Familles> = await this.getFamilles();
    familles.push(famille)
    await this.postFamilles(familles);

    return await familles;

  }
  
  async getFamilleByCode(code : string){

    const famille = await this.getFamilles();
    const result = await famille.find((famille : Familles) => famille.code == code);

    return result;

  }

  // A utiliser uniquement pour la page course-add-page.ts
  async searchArticleByArticleCodeForPageCourseAdd(articleCode : CodeArticle){
      // Je vide articles
      this.articles = [];
      
      // J'ajoute les données du localstorage
      const articles = await this.getArticles();
      this.articles = articles;
      
      // Init données à renvoyer
      var resultat : Articles;
  
      for(let article of this.articles){
        
        if(article.code == articleCode.codeArticle){
            resultat = {
              code : article.code,
              libelle : article.libelle,
              prix : article.prix,
              prixModifier : article.prixModifier,
              quantite : articleCode.quantite,
              firebase : false,
              magasin : this.settings.magasinParDefaut
            }
        }
  
      }
    return resultat;
  }

  async getArticleByArticleCode(articleCode : string){

    const articles : Array<Articles> = await this.getArticles();
    const article : Articles = await articles.find(article => article.code === articleCode);

    return article;
  }

  async getArticleByLibelle(libelle : string){

    const articles : Array<Articles> = await this.getArticles();
    const result : Articles = articles.find((res : Articles) => res.libelle == libelle);

    return result
  }

  async getArticleByIdAndLibelle(code : string, libelle : string){

    const articles : Array<Articles> = await this.getArticles();
    const result : Articles = articles.find((res : Articles) => res.code == code && res.libelle == libelle);

    return result
  }


  sortByArticleCode(articles : Array<Articles>){
    return articles.sort((a,b) => {
      let x  = parseInt(a.code);
      let y  = parseInt(b.code);
      if(x < y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }

  orderByArticleName(articles : Array<Articles>){
    return articles.sort((a,b) => {
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

  orderByLibelleFamille(familles:Familles[]){
    return familles.sort((a,b) => {
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

  sortByCodeFamilleArticle(familles:Familles[]){
    return familles.sort((a,b) => {
      let x  = parseInt(a.code) ;
      let y  = parseInt(b.code);
      if(x < y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }

  async getArticleByBarreCode(barreCode : string){

    const articles : Array<Articles> = await this.getArticles();
    const article : Articles = await articles.find((articles) => articles.barreCode === barreCode);

    return article;
  }

  async verifieSiPrixDifferent(articleSelected : Liste, prix : number){

    const article : Articles = await this.getArticleByIdAndLibelle(articleSelected.articleId, articleSelected.libelle);
    
    if(prix !== article.prix && !article.articleSpecial){

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Information - Le prix a été modifié',
        message: 'Doit-on utiliser ce prix pour vos futus achats ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Oui',
            handler: async () => {

              article.prix = prix;
              await this.putArticle(article);

            }
          }
        ]
      });

      await alert.present()

    }
  }

  async popUpPostArticleByBarreCode(barreCode : string){
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information',
      message: 'Aucun article ne correspond au code barre : <strong>' + barreCode + '</strong>. Souhaitez-vous le créer ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utility.popupInformation('Fin de l\'opération')
          }
        }, {
          text: 'Oui',
          handler: async () => {

            await this.postArticleAPartirduBarreCode(barreCode);

          }
        }
      ]
    });

    await alert.present()
  }

  private async postArticleAPartirduBarreCode(codeBarre : string){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un article',
      inputs: [
        {
          name: 'libelle',
          type: 'text',
          placeholder : 'Libellé'
        },
        {
          name: 'prix',
          type: 'number',
          placeholder : 'Prix'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Créer',
          handler: async (article : Articles) => {

            
            var codeArticle = (await this.generateArticleId()).toString();

            const newArticle : Articles = {
              code : codeArticle,
              libelle : article.libelle,
              prix : article.prix ,
              prixModifier : null,
              quantite : 1,
              firebase : false,
              isModified : false,
              documentId : null,
              familleCode : '22',
              familleLibelle : null,
              barreCode : codeBarre,
              magasin : this.settings.magasinParDefaut
            }

            await this.postArticle(newArticle);
            
          }
        }
      ]
    });
    await alert.present();
  }

  async updateAllArticlesId(){

    const articles : Array<Articles> = await this.getArticles();
    var id = 0;

    for(let article of articles){
      article.code = id.toString();
      article.isModified = true;
      id++;
    }

  }


}
