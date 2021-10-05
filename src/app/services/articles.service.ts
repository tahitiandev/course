import { Injectable } from '@angular/core';
import { Articles, FamilleArticle } from '../models/articles';
import { Storage } from '@ionic/storage';
import { UtilityService } from './utility.service';
import { CodeArticle } from '../models/plats';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private storage : Storage,
              private utility : UtilityService) { }

    private articles : Articles [] = [
    {
      code : 'FLORA',
      libelle : 'Oranges',
      prix : 100
    },
    {
      code : 'FLTOM',
      libelle : 'Tomates',
      prix : 10
    },
    {
      code : 'FLCAR',
      libelle : 'Carrotte',
      prix : 500
    },
    {
      code : 'FLSALA',
      libelle : 'Salade',
      prix : 500
    },
    {
      code : 'FLAUBER',
      libelle : 'Aubergines',
      prix : 500
    },
    {
      code : 'FLPOIV',
      libelle : 'Poivron',
      prix : 500
    },
    {
      code : 'VCJAM',
      libelle : 'Jambon',
      prix : 109
    },
    {
      code : 'VCLAR',
      libelle : 'Lardon',
      prix : 109
    },
    {
      code : 'VCRACL',
      libelle : 'Fromage à raclette',
      prix : 109
    },
    {
      code : 'VCSAUON',
      libelle : 'Saucisson',
      prix : 109
    },
    {
      code : 'VCSAUFU',
      libelle : 'Saumon fumé',
      prix : 109
    },
    {
      code : 'BOILAI',
      libelle : 'Lait Vai Ora',
      prix : 95
    },
    {
      code : 'BOICOC',
      libelle : 'Coca',
      prix : 95
    },
    {
      code : 'BOIVOLF',
      libelle : 'Volvic aux fruits',
      prix : 95
    },
    {
      code : 'BOIVAI',
      libelle : 'Vaimato',
      prix : 95
    },
    {
      code : 'VIANSTE',
      libelle : 'Steck',
      prix : 95
    },
    {
      code : 'VIANTRAV',
      libelle : 'Travers de porc',
      prix : 95
    },
    {
      code : 'VIANSAUC',
      libelle : 'Saucisse',
      prix : 95
    },
    {
      code : 'VIANPOUL',
      libelle : 'Poulet',
      prix : 95
    }
  ];

  private famille : FamilleArticle[] = [
    {
      code : 'CON',
      libelle : 'Congelé'
    },
    {
      code : 'BOI',
      libelle : 'Boisson'
    },
    {
      code : 'PDJ',
      libelle : 'Petit déjeuner'
    },
    {
      code : 'OUT',
      libelle : 'Outillage'
    },
    {
      code : 'FRIA',
      libelle : 'Friandise'
    },
    {
      code : 'BEB',
      libelle : 'Article bébé'
    },
    {
      code : 'FRU',
      libelle : 'Fruits'
    },
    {
      code : 'LEG',
      libelle : 'Légumes'
    },
    {
      code : 'VIAN',
      libelle : 'Viandes'
    },
    {
      code : 'MUL',
      libelle : 'Multi-médias'
    },
    {
      code : 'COUV',
      libelle : 'Couverts'
    },
    {
      code : 'LIV',
      libelle : 'Papeterie'
    },
    {
      code : 'LESSI',
      libelle : 'Lessives'
    },
    {
      code : 'MENAG',
      libelle : 'Produits ménagers'
    },
    {
      code : 'BAIN',
      libelle : 'Articles de bain (ex savons)'
    },
    {
      code : 'CHAR',
      libelle : 'Charcuterie'
    },
    {
      code : 'REF',
      libelle : 'Produits réfrigéré'
    }
  ]

    articlesFromLocalStorage : Articles[];


  async setDefaultArticleData(){
    await this.storage.set(this.utility.localstorage.articles, this.articles)
  }
  async setDefaultFamilleArticleData(){
    await this.storage.set(this.utility.localstorage['famille d\'articles'], this.famille)
  }

  // setArticleToLocalStorage(){
  //   this.storage.set(this.utility.localstorage.articles, this.articles)
  // }

  // async setFamilleArticleToLocalStorage() {
  //   await this.storage.set(this.utility.localstorage['famille d\'articles'], this.famille)
  // }

  async updateArticle(newArticle : Articles){
    const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles);
    var articleUpdate : Articles [] = [];

    for(let article of articles){

      if(article.code != newArticle.code){
        articleUpdate.push(article)
      }
      if(article.code === newArticle.code){
        articleUpdate.push(newArticle)
      }
    }
    this.storage.set(this.utility.localstorage.articles, articleUpdate)
  }

  async getArticleFromLocalStorage (){
    const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles)
    return articles;
  }

  // Methode qui fonctionne plus
  // Il était utilisé dans le tab2
  // async setArticleRealDataToLocalStorage(articles : Articles []){
  //   if(articles){
  //     await this.storage.set(this.utility.localstorage.articles, articles)
  //   }
  // }
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

        const newFamilleArticle : FamilleArticle = {
          code : familleArticle.code.toUpperCase(),
          libelle : this.utility.premierLettreEnMajuscule(familleArticle.libelle)
        }
        await temp.push(newFamilleArticle)
        
      }
    }

    this.storage.set(this.utility.localstorage['famille d\'articles'], temp)

  }

  async addNewFamilleArticleRealDataToLocalStorage(familleArticle : FamilleArticle){
    const temp : FamilleArticle[] = [];

    const familles = await this.storage.get(this.utility.localstorage['famille d\'articles'])

    for(let famille of familles){
        await temp.push(famille)
    }
    
    const newFamilleArticle : FamilleArticle = {
      code : familleArticle.code.toUpperCase(),
      libelle : this.utility.premierLettreEnMajuscule(familleArticle.libelle)
    }
    await temp.push(newFamilleArticle)

    this.storage.set(this.utility.localstorage['famille d\'articles'], temp)

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
              quantite : articleCode.quantite
            }
        }
  
      }
    return resultat;
  }

    async searchArticleByArticleCode(articleCode : string){
      // Je vide articles
      this.articles = [];
      
      // J'ajoute les données du localstorage
      const articles = await this.getArticleFromLocalStorage();
      this.articles = articles;
      
      // Init données à renvoyer
      var resultat : Articles;
  
      for(let article of this.articles){
        
        if(article.code == articleCode){
            resultat = article
        }
  
      }

    const plats = await this.storage.get(this.utility.localstorage.Plats)

    // Je recherche l'article en question
    // const result = await this.articles.find((article : Articles) => {
    //   return article.code === articleCode
    // })

    // Je retourne le resultat
    return resultat;

  }

  async searchArticleByLibelle(libelle : string){

    const articles : Articles [] = await this.getArticleFromLocalStorage()
    const result : Articles = articles.find((res : Articles) => {
      return res.libelle == libelle
    })
    return result
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


}
