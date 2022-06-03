import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Articles, Familles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Storage } from '@ionic/storage';
import { BarreCodeService } from 'src/app/services/barre-code.service';
import { AlertInput } from '@ionic/core';
import { Settings } from 'src/app/models/setting';

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

    articles : Array<Articles>;
    familles : Array<Familles>;
    searchValue : string = "";
    settings : Settings;
    filtreMagasin : string = "";
    magasins : string [] = []

    ngOnInit(){
      this.onInit();
    }

    async onInit(){
      // Charger les articles
      this.getArticle().then(() => {
        this.spinner(false)
      });

      // Charger les settings
      const settings : Settings = await this.storage.get(this.u.localstorage.Setting)
      this.settings = await settings

      // Charger la liste des magasins
      this.magasins = await settings.magasins
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
        },
        {
          text: 'Magasin : ' + articles.magasin,
          cssClass: 'primary',
          handler: async (result) => {
            this.modifierMagasin(articles)
          }
        },
        {
        text: 'Ok',
        handler: async (result : Articles) => {

          var articles = await this.storage.get(this.u.localstorage.articles);
          var article : Articles = await articles.find(s => {
            return s.code === result.code;
          })

          article.code = result.code;
          article.libelle = result.libelle;
          article.prix = result.prix;
          article.barreCode = result.barreCode

          await this.articleService.updateArticle(article)
          await this.getArticle()
          await this.spinner(false)

          }
        }
        ]
      });
  
      await alert.present();

    }

    async modifierMagasin(article : Articles){

      const magasins = this.settings.magasins

      var inputsOption : Array<AlertInput> = [];

      for(let magasin of magasins){
        inputsOption.push({
          name: 'magasin',
          type: 'radio',
          label : magasin,
          value : magasin
        })
      }

      const alert = await this.alertController.create({
        header: 'Modifier l\'article',
        inputs: inputsOption,
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
        text: 'Valider',
        handler: async (result) => {
          
          article.magasin = result
          
          const articles : Articles [] = await this.storage.get(this.u.localstorage.articles);
          const index =  await articles.findIndex(s => {
            return s.code === article.code
          })

          articles[index] = article

          this.storage.set(this.u.localstorage.articles, articles).then(() => {
            this.getArticle().then(() => {
              this.spinner(false)
            })
          })

        }
        }
        ]
      });
  
      await alert.present();

    }


    async modifierArticleId(article : Articles){

      const alert = await this.alertController.create({
        header: 'Modifier l\'article',
        inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Code article',
          value : article.code
        }
        ],
        buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'Modifier la famille',
          cssClass: 'primary',
          handler: async (result) => {

          }
        },
        {
        text: 'Ok',
        handler: async (result : Articles) => {

          var articles : Array<Articles> = await this.storage.get(this.u.localstorage.articles);
          
          if(result.code !== article.code){

            const index = await articles.findIndex((articleResult : Articles)=> {
              return articleResult.libelle === article.libelle
            })
            
            articles[index].code = result.code
            if(articles[index].firebase){
              articles[index].isModified = true
            }

            await this.storage.set(this.u.localstorage.articles, articles);
            await this.getArticle()
            await this.spinner(false);

          }
          
        }
        }
        ]
      });
  
      await alert.present();
    }

    async pairArticleWithAnBarreCode(article : Articles){
      const barreCode =  await this.barreCodeService.scanneBarreCode()
      const articles : Array<Articles> = await this.articleService.getArticles()

      const index = await articles.findIndex(s => s.code === article.code)
      articles[index].barreCode = barreCode.toString();

      await this.storage.set(this.u.localstorage.articles, articles)
      await this.u.popupInformation('Le code barre a bien été renseigné');
      await this.getArticle();
      await this.spinner(false)

    }
    
    private async getFamilleQuiOntDesArticles(){
      const articles : Articles [] = await this.storage.get(this.u.localstorage.articles);
      const codeFamille = [];
      for(let article of articles){
        codeFamille.push(article.familleCode)
      }
      var uniqueCodeFamille = [...new Set(codeFamille)]
      const familles : Familles [] = [];
      for(let code of uniqueCodeFamille){
        var famille = await this.articleService.searchFamilleByCode(code)
        familles.push(famille)
      }

      const familleSortByLibelle = await this.articleService.orderByLibelleFamille(familles)

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
          firebase : false,
          magasin : this.settings.magasinParDefaut
        })

        this.storage.set(this.u.localstorage.articles, articleTemp).then(() => this.getArticle())
        
          
        }
      }
      ]
    });

    await alert.present();
    }

    async changeMagasin(event){
      const magasin = await event.target.value
      this.filtreMagasin = await magasin
      this.getArticle().then(() => this.spinner(false))
    }

    async getArticle(){

      this.spinner(true)

      this.articles = []
      this.familles = []

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
              barreCode : article.barreCode,
              magasin : article.magasin
            }

            if(!article.isDeleted){
              groupByArticle.push(articleGroup)
            }
          } // if          
        }

      } // for

      const articles = await this.articleService.orderByArticleName(groupByArticle)
      this.filtreArticleByMagasin(articles);
      }

      private async filtreArticleByMagasin(articles : Array<Articles>){
        var articlesFiltre : Articles [] = []

        if(this.filtreMagasin != ""){

          for(let article of articles){
            if(article.magasin === this.filtreMagasin){
              articlesFiltre.push(article)
            }
          }
          this.articles = await articlesFiltre
        }else{
          this.articles = articles
        }

      }

      actualiser(){
        this.getArticle().then(()=> this.spinner(false))
        
      }

      goDetail(id : number){
      this.nav.navigateRoot('tabs/tab2/article-details/' + id)
      }

      goToArticleAdd(){
      this.nav.navigateRoot('tabs/tab2/article-add')
      }

      async modifierFamilleArticle(article : Articles){

        const familles : Array<Familles> = this.articleService.orderByLibelleFamille(await this.storage.get(this.u.localstorage['famille d\'articles']));

        var inputOption : Array<AlertInput> = [];

        for(let famille of familles){
          inputOption.push({
            name : 'famille',
            type : 'radio',
            label : famille.libelle,
            value : famille.code
          })
        }


        const alert = await this.alertController.create({
          header: 'Ajouter un article',
          inputs: inputOption,
          buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
          handler: () => {
          }
          }, {
          text: 'Valider',
          handler: async (result) => {

              const familleInfo : Familles = await familles.find(s => {
                return s.code = result
              })

              article.familleCode = result
              article.familleLibelle = familleInfo.libelle

              await this.articleService.updateArticle(article)       
              await this.getArticle()
              await this.spinner(false)
            }
          }
          ]
        });
    
        await alert.present();
      }

      async isFamilleContainsAritcle(famille : Familles){

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

      async deleteArticle(article : Articles){
        
        await this.articleService.deleteArticle(article)
        await this.getArticle();
        await this.spinner(false);
        

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
                this.articleService.postArticle({
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
                  barreCode : barreCode,
                  magasin : this.settings.magasinParDefaut
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
