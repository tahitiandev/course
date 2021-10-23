import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Articles, FamilleArticle } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.page.html',
  styleUrls: ['./article-list.page.scss'],
})
export class ArticleListPage implements OnInit {

  constructor(private storage : Storage,
    private alertController: AlertController,
    private u : UtilityService,
    private articleService : ArticlesService,
    private nav : NavController) {}

    articles : Articles [];
    familles : FamilleArticle [];
    searchValue : string = "";

    ngOnInit(){
      this.getArticle();
    }

    async modifierUnArticle(articles : Articles){

      const alert = await this.alertController.create({
        header: 'Modifier l\'article',
        inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Code article',
          value : articles.code,
          disabled : true
        },
        {
          name: 'libelle',
          type: 'text',
          placeholder: 'Libellé',
          value : articles.libelle
        },
        {
          name: 'prix',
          type: 'number',
          placeholder: 'Prix',
          value : articles.prix
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
        handler: (result : Articles) => {

            var articleAJour : Articles;
            articleAJour = {
              code : result.code,
              libelle : result.libelle,
              prix : result.prix,
              firebase : false
            }

            this.articleService.updateArticle(articleAJour).then(() => {
              this.getArticle()
            })
          
          }
        }
        ]
      });
  
      await alert.present();

    }

    async AjouterUnArticle(){

      const alert = await this.alertController.create({
      header: 'Ajouter un article',
      inputs: [
      {
        name: 'code',
        type: 'text',
        placeholder: 'Code article'
      },
      {
        name: 'libelle',
        type: 'text',
        placeholder: 'Libellé'
      },
      {
        name: 'prix',
        type: 'number',
        placeholder: 'Prix'
      }
      ],
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      handler: () => {
        console.log('Confirm Cancel');
      }
      }, {
      text: 'Ok',
      handler: async (newArticle : Articles) => {

        const articles : Articles [] = await this.storage.get(this.u.localstorage.articles)
        var articleTemp : Articles [] = [];
        
        for(let article of articles){
          articleTemp.push(article)
        }
        articleTemp.push({
          code : newArticle.code,
          libelle : newArticle.libelle,
          prix : newArticle.prix,
          firebase : false
        })

        this.storage.set(this.u.localstorage.articles, articleTemp).then(() => this.getArticle())
        
        
        // Récupère les données du LS et le met dans une variable temporaire
        // this.storage.get(this.u.localstorage.articles).then(articles => {
        //   this.addNewArticle(newArticle, articles)
        //   // this.refreshArticleList()
        // });
          
        }
      }
      ]
    });

    await alert.present();
    }

    // addNewArticle(newArticle :  Articles, articleInLocalStorage : Articles []){

    //   // Ajout des articles déjà existant
    //   if(articleInLocalStorage){
    //   this.articles = [];

    //   for(let article of articleInLocalStorage){
    //   this.articles.push(article)
    //   }

    //   }

    //   // Add du nouvelle article
    //   this.articles.push({
    //   code : newArticle.code,
    //   libelle : newArticle.libelle,
    //   prix : newArticle.prix
    //   })

    //   // MAJ des donées dans le localStorage
    //   this.storage.set(this.u.localstorage.articles, this.articles)

    //   }



        async getArticle(){
      const articlesLS : Articles[] = await this.storage.get(this.u.localstorage.articles);
      const famillesLS : FamilleArticle [] = await this.storage.get(this.u.localstorage['famille d\'articles'])
      const familles = this.articleService.sortByLibelleFamilleArticle(famillesLS)
      this.familles = familles;
      var groupByArticle : Articles[] = []


      for(let i = 0 ; i < familles.length; i++){

        for(let article of articlesLS){

          if(article.code.substring(0,3) === familles[i].code.substring(0,3)){
            
            var articleGroup : Articles = {
              code : article.code,
              libelle : article.libelle,
              prix : article.prix,
              prixModifier : article.prixModifier,
              quantite : article.quantite,
              famille : familles[i].libelle,
              firebase : false
            }

            groupByArticle.push(articleGroup)
          } // if          
        }

      } // for 1      

      const articles = await this.articleService.sortByArticleName(groupByArticle)
      this.articles = articles;
      }

      goDetail(id : number){
      this.nav.navigateRoot('tabs/tab2/article-details/' + id)
      }

      goToArticleAdd(){
      this.nav.navigateRoot('tabs/tab2/article-add')
      }




      async isFamilleContainsAritcle(famille :  FamilleArticle){

        const result : Articles [] = [];
        
        for(let i = 0;  i < this.articles.length; i++){
          if(this.articles[i].famille === famille.libelle){
            result.push(this.articles[i])
          }
        }

        var showFamille : boolean =  true

        if(result.length > 0){
          showFamille = true
        }else{
          showFamille = false
        }

        return showFamille

      }
  



}
