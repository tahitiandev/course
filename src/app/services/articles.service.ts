import { Injectable } from '@angular/core';
import { Articles, FamilleArticle } from '../models/articles';
import { Storage } from '@ionic/storage';
import { UtilityService } from './utility.service';
import { CodeArticle } from '../models/plats';
import { Deleted } from '../models/deleted';
import { FirebaseService } from './firebase.service';
import { AlertController } from '@ionic/angular';
import { CreerArticleAPartirDuCodeBarreResponse } from '../models/creerArticleAPartirDuCodeBarreResponse';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private storage : Storage,
              private utility : UtilityService,
              private firebaseService : FirebaseService,
              private alertController: AlertController) { }

    private articles : Articles [] = [];

  private famille : FamilleArticle[] = [
    {
      code : 'CON',
      libelle : 'Congelé',
      firebase : false
    },
    {
      code : 'BOI',
      libelle : 'Boisson',
      firebase : false
    },
    {
      code : 'PDJ',
      libelle : 'Petit déjeuner',
      firebase : false
    },
    {
      code : 'OUT',
      libelle : 'Outillage',
      firebase : false
    },
    {
      code : 'FRIA',
      libelle : 'Friandise',
      firebase : false
    },
    {
      code : 'BEB',
      libelle : 'Article bébé',
      firebase : false
    },
    {
      code : 'FRU',
      libelle : 'Fruits',
      firebase : false
    },
    {
      code : 'LEG',
      libelle : 'Légumes',
      firebase : false
    },
    {
      code : 'VIAN',
      libelle : 'Viandes',
      firebase : false
    },
    {
      code : 'MUL',
      libelle : 'Multi-médias',
      firebase : false
    },
    {
      code : 'COUV',
      libelle : 'Couverts',
      firebase : false
    },
    {
      code : 'LIV',
      libelle : 'Papeterie',
      firebase : false
    },
    {
      code : 'LESSI',
      libelle : 'Lessives',
      firebase : false
    },
    {
      code : 'MENAG',
      libelle : 'Produits ménagers',
      firebase : false
    },
    {
      code : 'BAIN',
      libelle : 'Articles de bain (ex savons)',
      firebase : false
    },
    {
      code : 'CHAR',
      libelle : 'Charcuterie',
      firebase : false
    },
    {
      code : 'REF',
      libelle : 'Produits réfrigéré',
      firebase : false
    }
  ]

    articlesFromLocalStorage : Articles[];

  async generateFamilleArticleId(){
    const familles : FamilleArticle [] = await this.storage.get(this.utility.localstorage['famille d\'articles']);
    const famillesSort : FamilleArticle [] = await this.sortByCodeFamilleArticle(familles)
    var id = parseInt(famillesSort[famillesSort.length - 1].code) + 1
    return id.toString();
  }

  async generateArticleId(){
    const articlesLS : Articles [] = await this.storage.get(this.utility.localstorage.articles);
    const articles : Articles [] = await this.sortByArticleCode(articlesLS);
    return await parseInt(articles[articles.length - 1].code) + 1
  }

  async temp(){
    const familles : FamilleArticle [] = await this.storage.get(this.utility.localstorage['famille d\'articles']);
    const temp = []
    var id = 0;

    for(let famille of familles){
      temp.push({
        old : famille.code,
        new : id.toString()
      })

      id = id +1
    }

    this.storage.set('temp', temp)

  }

  async modifyFamilleArticleIdByNumber(){
    const familles : FamilleArticle [] = await this.storage.get(this.utility.localstorage['famille d\'articles']);
    const famillesNew : FamilleArticle [] = [];
    var index = 0;
    for(let famille of familles){
      var isModified = false;
      if(famille.isModified){
        isModified = true
      }

      famillesNew.push({
        code : index.toString(),
        libelle : famille.libelle,
        firebase : famille.firebase,
        isModified : true,
        documentId : famille.documentId
      })
      index = index + 1
    }
    
    this.storage.set(this.utility.localstorage['famille d\'articles'], famillesNew)

  }

  async modifyArticleId(){
    const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles);
    const articlesNew : Articles [] = [];
    var id = 0;

    for(let article of articles){

      articlesNew.push({
        code : id.toString(),
        libelle : article.libelle,
        prix : article.prix,
        prixModifier : article.familleLibelle == undefined ? 0 : article.prixModifier,
        quantite : article.familleLibelle == undefined ? 1 : article.quantite,
        firebase : article.firebase,
        isModified : article.isModified == undefined ? false : article.isModified,
        documentId : article.documentId,
        familleCode : article.familleCode == undefined ? "" : article.familleCode,
        familleLibelle : article.familleLibelle == undefined ? "" : article.libelle,
        magasin : article.magasin == undefined ? "Carrefour" : article.magasin
      })

      id = id + 1
    }

    this.storage.set(this.utility.localstorage.articles, articlesNew)
  }

  async modifyFamilleCodeForeachArticle(){

    // Get all articles
    const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles);
    // Get map old articleId and new articleId
    const temp = await this.storage.get('temp');
    
    var articlesNew : Articles [] = [];

    const articleDivers = ['FLA','VCJ','VCL','VCR','FLC','FLP','VCS','FLS','SK1','FLO','FLT'];

    for(let article of articles){

      for(let tmp of temp){
        if(tmp.old.substring(0,3) === article.code.substring(0,3)){
          articlesNew.push({
            code : article.code,
            libelle : article.libelle,
            prix : article.prix,
            prixModifier : article.familleLibelle == undefined ? 0 : article.prixModifier,
            quantite : article.familleLibelle == undefined ? 1 : article.quantite,
            firebase : article.firebase,
            isModified : article.isModified == undefined ? false : article.isModified,
            documentId : article.documentId,
            familleCode : tmp.new,
            familleLibelle : article.familleLibelle == undefined ? "" : article.libelle,
            magasin : article.magasin == undefined ? "Carrefour" : article.magasin
          })
        }
      }

      for(let div of articleDivers){
        if(div === article.code.substring(0,3)){
          articlesNew.push({
            code : article.code,
            libelle : article.libelle,
            prix : article.prix,
            prixModifier : article.familleLibelle == undefined ? 0 : article.prixModifier,
            quantite : article.familleLibelle == undefined ? 1 : article.quantite,
            firebase : article.firebase,
            isModified : article.isModified == undefined ? false : article.isModified,
            documentId : article.documentId,
            familleCode : '20',
            familleLibelle : article.familleLibelle == undefined ? "" : article.libelle,
            magasin : article.magasin == undefined ? "Carrefour" : article.magasin
          })
        }
      }

    }
    this.storage.set(this.utility.localstorage.articles, articlesNew)

  }
  async setDefaultArticleData(){
    await this.storage.set(this.utility.localstorage.articles, this.articles)
  }
  async setDefaultFamilleArticleData(){
    await this.storage.set(this.utility.localstorage['famille d\'articles'], this.famille)
  }

  async updateArticle(newArticle : Articles){
    const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles);
    var articleUpdate : Articles [] = [];
    var compteur = 1
    const test = articles.find(s => {
      return s.libelle == ''
    })

    for(let article of articles){

      if(article.code != newArticle.code){
        articleUpdate.push(article)
      }
      if(article.code === newArticle.code){
        // cela évite les doublons
        if(compteur === 1){
          articleUpdate.push(newArticle)
          compteur++
        }
      }
    }
    this.storage.set(this.utility.localstorage.articles, articleUpdate)
  }

  async getArticleFromLocalStorage (){
    const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles)
    return articles;
  }

  async setArticleRealDataToLocalStorage(newArticle : Articles){

    var articles : Articles [] = [];
    const articlesLS = await this.getArticleFromLocalStorage();

    if(articlesLS){
      for(let article of articlesLS){
        if(article.code != newArticle.code){
          await articles.push(article)
        }
      }

      await articles.push(newArticle)
      await this.storage.set(this.utility.localstorage.articles, articles)

    }
  }

  async setFamilleArticleRealDataToLocalStorage(familleArticle : FamilleArticle){
    const temp : FamilleArticle[] = [];

    const familles = await this.storage.get(this.utility.localstorage['famille d\'articles'])

    for(let famille of familles){
      if(famille.code != familleArticle.code){
        await temp.push(famille)
      }
      if(famille.code === familleArticle.code){

        const familleInfo : FamilleArticle = await this.searchFamilleByCode(familleArticle.code)

        const newFamilleArticle : FamilleArticle = {
          code : familleArticle.code.toString(),
          libelle : this.utility.premierLettreEnMajuscule(familleArticle.libelle),
          firebase : false,
          isModified : familleInfo.isModified,
          documentId : familleInfo.documentId
        }

        if(familleInfo.firebase){
          newFamilleArticle.isModified =  true;
        }else{
          newFamilleArticle.isModified = false;
        }

        await temp.push(newFamilleArticle)
        
      }
    }

    this.storage.set(this.utility.localstorage['famille d\'articles'], temp)

  }

  async deleteArticle(articleDeleted : Articles){ 

    const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles);

    // Mise àjour dans le localstorage
    const articlesNew : Articles [] = [];
    for(let article of articles){
      if(article.code != articleDeleted.code){
        articlesNew.push(article)
      }
    }
    this.storage.set(this.utility.localstorage.articles, articlesNew);

    // Mise à jour sur firebase (via localstorage : deleted)
    const articleInfo = await this.searchArticleByArticleCode(articleDeleted.code);
    this.firebaseService.postToLocalStorageDeleted(articleInfo.firebase, this.utility.localstorage.articles, articleInfo.documentId);

  }

  async deleteFamilleArticle(familleArticle : FamilleArticle){
    const familles : FamilleArticle[] = await this.storage.get(this.utility.localstorage['famille d\'articles']);
    const famillesNew : FamilleArticle [] = [];
    for(let famille of familles){
      if(famille.code != familleArticle.code){
        famillesNew.push(famille)
      }
    }
    
    this.storage.set(this.utility.localstorage['famille d\'articles'], famillesNew)
    
    // Supprimer dans firebase
    const familleInfo : FamilleArticle = await this.searchFamilleByCode(familleArticle.code);
    this.firebaseService.postToLocalStorageDeleted(familleInfo.firebase, this.utility.localstorage['famille d\'articles'], familleInfo.documentId);
    
  }

  async addNewFamilleArticleRealDataToLocalStorage(familleArticle : FamilleArticle){
    const temp : FamilleArticle[] = [];

    const familles = await this.storage.get(this.utility.localstorage['famille d\'articles'])

    for(let famille of familles){
        await temp.push(famille)
    }
    
    const newFamilleArticle : FamilleArticle = {
      code : familleArticle.code.toUpperCase(),
      libelle : this.utility.premierLettreEnMajuscule(familleArticle.libelle),
      firebase : false
    }
    await temp.push(newFamilleArticle)

    this.storage.set(this.utility.localstorage['famille d\'articles'], temp)

  }

  async postNouvelleFamilleArticle(familleSelected : FamilleArticle){

    const familles : FamilleArticle [] = await this.getFamilleArticleFromLocalStorage();
    const famillesNew : FamilleArticle [] = []
    for(let famille of familles){
      famillesNew.push(famille)
    }
    famillesNew.push(familleSelected)
    this.storage.set(this.utility.localstorage['famille d\'articles'], famillesNew)
    return famillesNew;

  }
  
  async searchFamilleByCode(code : string){

    const famille = await this.getFamilleArticleFromLocalStorage();
    const result = await famille.find((famille : FamilleArticle) => {
      return famille.code == code
    })

    return result;

  }

  async getFamilleArticleFromLocalStorage(){
    const familles : FamilleArticle [] =  await this.storage.get(this.utility.localstorage['famille d\'articles'])
    return familles;
  }

  // A utiliser uniquement pour la page course-add-page.ts
  async searchArticleByArticleCodeForPageCourseAdd(articleCode : CodeArticle){
      // Je vide articles
      this.articles = [];
      
      // J'ajoute les données du localstorage
      const articles = await this.getArticleFromLocalStorage();
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
              magasin : 'Carrefour'
            }
        }
  
      }
    return resultat;
  }

  async searchArticleByArticleCode(articleCode : string){
    const articles : Articles [] = await this.getArticleFromLocalStorage()
    const article : Articles = await articles.find(article => {
      return article.code === articleCode
    })
    return article;
  }

  async searchArticleByLibelle(libelle : string){

    const articles : Articles [] = await this.getArticleFromLocalStorage()
    const result : Articles = articles.find((res : Articles) => {
      return res.libelle == libelle
    })
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

  sortByArticleName(articles : Array<Articles>){
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

  sortByLibelleFamilleArticle(familles:FamilleArticle[]){
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

  sortByCodeFamilleArticle(familles:FamilleArticle[]){
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

  async searchArticleByBarreCode(barreCode : string){
    const articles : Articles [] = await this.getArticleFromLocalStorage();
    const article : Articles = await articles.find((elements) => {
        return elements.barreCode === barreCode
    })
    return article;
  }

  async verifieSiPrixDifferent(codeArticle : string, prix : number){
    const articleInfo : Articles = await this.searchArticleByArticleCode(codeArticle)
    if(prix !== articleInfo.prix && codeArticle != null){

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
            handler: () => {
              articleInfo.prix = prix
              this.updateArticle(articleInfo)
            }
          }
        ]
      });

      await alert.present()

    }
  }

  // Dans la liste de course, si on scanne un code barre qui n'existe pas, on le créé
  async creerArticleAPartirduBarreCode(barreCode : string, ifMethodeUseInpostArticleByBarreCode : boolean){
    var response :CreerArticleAPartirDuCodeBarreResponse = {
      articleIsCreer : null,
      article : null
    }
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
            response.articleIsCreer = false
          }
        }, {
          text: 'Oui',
          handler: async () => {
            const article : Articles = await this.formulaireCreerArticleAPartirduBarreCode(barreCode,ifMethodeUseInpostArticleByBarreCode)
            response.article = await article
            response.articleIsCreer = await true
          }
        }
      ]
    });

    await alert.present()

    return response
  }

  private async formulaireCreerArticleAPartirduBarreCode(codeBarre : string,ifMethodeUseInpostArticleByBarreCode:boolean){

    var articleNew : Articles = null;

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
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: async (formValue) => {
            const newArticle : Articles = {
              code : this.generateArticleId().toString(),
              libelle : formValue.libelle,
              prix : formValue.prix ,
              prixModifier : null,
              quantite : 1,
              firebase : false,
              isModified : false,
              documentId : null,
              familleCode : '22',
              familleLibelle : null,
              barreCode : codeBarre,
              magasin : 'Carrefour'
            }
            this.setArticleRealDataToLocalStorage(newArticle).then(()=> {
              articleNew = newArticle
            })
            
          }//
        }
      ]
    });
    await alert.present();
    return articleNew;
  }

  async test(){
    const articles : FamilleArticle[] = await this.getFamilleArticleFromLocalStorage()
    const result : FamilleArticle = await articles.find(s => {
      return s.libelle == 'à classer'
    })
    console.log(result)
    return result
    // const article1 = await articles.find(s => {
    //   return s.barreCode === 'hello'
    // })
    
    // const article2 = await articles.find(s => {
    //   return s.barreCode == 'teste'
    // })

    // return article2
    
    // article1.code = '24';
    // article2.code = '25';
    // console.log(article1)
    // console.log(article2)
    // this.deleteArticle(article1)
    // this.deleteArticle(article2)

    
    // const id = await (await this.generateArticleId()).toString()
    // console.log(id)
    // goodArticle.code = '65'
    // this.updateArticle(goodArticle)
    // console.log(goodArticle)


    // for(let article of articles){
    //   if(article.libelle === 'Saucisse (x6)'){
    //     console.log(article)
    //   }
    // }
  }

  async ajouterUnMgasinParDefaut(){
    const articles : Articles [] = await this.storage.get('articles');

    for(let article of articles){
      article.isModified = true
      article.magasin = 'Carrefour'
    }

    this.storage.set('articles',articles)
  }

}
