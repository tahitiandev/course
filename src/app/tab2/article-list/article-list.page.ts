import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Articles, FamilleArticle } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Storage } from '@ionic/storage';
import { BarreCodeService } from 'src/app/services/barre-code.service';

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
    private nav : NavController,
    private barreCodeService : BarreCodeService) {}

    articles : Articles [];
    familles : FamilleArticle [];
    searchValue : string = "";

    ngOnInit(){
      this.getArticle().then(() => {
        this.spinner(false)
      });
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
        },
        {
          name: 'familleCode',
          type: 'number',
          placeholder: 'Prix',
          value : articles.familleCode
        },
        {
          name: 'barreCode',
          type: 'text',
          placeholder: 'Code barre',
          value : articles.barreCode
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
        handler: async (result : Articles) => {
          var articleAJour : Articles;

          var allArticle = await this.storage.get(this.u.localstorage.articles);
          var oldDataArticle : Articles = await allArticle.find(s => {
            return s.code === result.code;
          })

          if(oldDataArticle.firebase){
            articleAJour = {
              code : result.code,
              libelle : result.libelle,
              prix : result.prix,
              prixModifier : oldDataArticle.prixModifier,//
              quantite : oldDataArticle.quantite, //
              firebase : true,
              isModified : true,
              documentId :oldDataArticle.documentId,
              familleCode : result.familleCode.toString(), //
              familleLibelle : oldDataArticle.familleLibelle, //
              barreCode : result.barreCode
            }
          }
          else {
            articleAJour = {
              code : result.code,
              libelle : result.libelle,
              prix : result.prix,
              prixModifier : oldDataArticle.prixModifier,//
              quantite : oldDataArticle.quantite, //
              firebase : false,
              isModified : false,
              documentId :oldDataArticle.documentId,
              familleCode : result.familleCode, //
              familleLibelle : oldDataArticle.familleLibelle, //
              barreCode : result.barreCode
            }
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

    async pairArticleWithAnBarreCode(articleForm : Articles){
      const barreCode =  await this.barreCodeService.scanneBarreCode()
      const articles : Articles [] = await this.articleService.getArticleFromLocalStorage()
      var articlesNew : Articles [] = [];

      for(let article of articles){
        if(article.code != articleForm.code){
          articlesNew.push(article)
        }
        if(article.code == articleForm.code){
          var articleUpdate : Articles = {
            code : article.code,
            libelle : article.libelle,
            prix : article.prix,
            prixModifier : article.prixModifier,
            quantite : article.quantite,
            firebase : article.firebase,
            isModified : article.isModified,
            documentId : article.documentId,
            familleCode : article.familleCode,
            familleLibelle : article.familleLibelle,
            barreCode : barreCode.toString(),
          }
          articlesNew.push(articleUpdate);
        }
      }
      this.storage.set(this.u.localstorage.articles, articlesNew).then(() => {
        this.u.popupInformation('Le code barre a bien été renseigné')
        this.getArticle()
      }).catch(e => {
        alert(e)
      })


    }
    
    private async getFamilleQuiOntDesArticles(){
      const articles : Articles [] = await this.storage.get(this.u.localstorage.articles);
      const codeFamille = [];
      for(let article of articles){
        codeFamille.push(article.familleCode)
      }
      var uniqueCodeFamille = [...new Set(codeFamille)]
      const familles : FamilleArticle [] = [];
      for(let code of uniqueCodeFamille){
        var famille = await this.articleService.searchFamilleByCode(code)
        familles.push(famille)
      }

      const familleSortByLibelle = await this.articleService.sortByLibelleFamilleArticle(familles)

      return familleSortByLibelle;

    }

    async toggleArticleDetail(index : number){
      const element = await document.getElementById('articleDetail-' + index);
      element.classList.toggle('hide')
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

    async getArticle(){

      this.spinner(true)

      const familles = await this.getFamilleQuiOntDesArticles()
      this.familles = familles;
      
      const articlesLS : Articles[] = await this.storage.get(this.u.localstorage.articles);
      var groupByArticle : Articles[] = []


      for(let i = 0 ; i < familles.length; i++){

        for(let article of articlesLS){

          // if(article.code.substring(0,3) === familles[i].code.substring(0,3)){
          if(article.familleCode == familles[i].code){
            
            var articleGroup : Articles = {
              code : article.code,
              libelle : article.libelle,
              prix : article.prix,
              prixModifier : article.prixModifier,
              quantite : article.quantite,
              familleCode : article.familleCode,
              familleLibelle : familles[i].libelle,
              firebase : article.firebase,
              isModified : article.isModified,
              documentId : article.documentId,
              barreCode : article.barreCode
            }

            groupByArticle.push(articleGroup)
          } // if          
        }

      } // for

      const articles = await this.articleService.sortByArticleName(groupByArticle)
      this.articles = articles;
      }

      goDetail(id : number){
      this.nav.navigateRoot('tabs/tab2/article-details/' + id)
      }

      goToArticleAdd(){
      this.nav.navigateRoot('tabs/tab2/article-add')
      }




      async isFamilleContainsAritcle(famille : FamilleArticle){

        const result : Articles [] = [];
        
        for(let i = 0;  i < this.articles.length; i++){
          if(this.articles[i].familleLibelle === famille.libelle){
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

      deleteArticle(article : Articles){
        
        this.articleService.deleteArticle(article).then(() => {
          this.getArticle();
        })
        

      }
  
      async postArticleByBarreCode(){
        const barreCode = await this.barreCodeService.scanneBarreCode();
        const article = await this.articleService.searchArticleByBarreCode(barreCode);
        if(article === null || article === undefined){
          const alert = await this.alertController.create({
            header: 'Ajouter un article',
            inputs: [
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
            }
            }, {
            text: 'Ok',
            handler: async (formValue : Articles) => {
                this.articleService.setArticleRealDataToLocalStorage({
                  code : (await this.articleService.generateArticleId()).toString(),
                  libelle : formValue.libelle,
                  prix : formValue.prix ,
                  prixModifier : null,
                  quantite : 1,
                  firebase : false,
                  isModified : false,
                  documentId : null,
                  familleCode : '22',
                  familleLibelle : null,
                  barreCode : barreCode
                })
              }
            }
            ]
          });
      
          await alert.present();
        }//if
        else{
          this.u.popupInformation('Le code barre <strong>' + barreCode + '</strong> est déjà associé à l\'article ' + article.libelle)
        }
      }

      spinner(enAttente : boolean){

        const spinnerElement = document.getElementById('spinner');
        const bodyElement = document.getElementById('body-display');
        
        if(enAttente){
          spinnerElement.innerHTML = "<ion-spinner name='lines-small'></ion-spinner>";
          bodyElement.classList.add('displayBackground')
        }
        
        if(!enAttente){
          spinnerElement.innerHTML = '';
          bodyElement.classList.remove('displayBackground')
        }
      }


}
