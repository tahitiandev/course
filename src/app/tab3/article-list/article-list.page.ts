import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Articles, Familles, PrixMagasin } from 'src/app/models/articles';
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
    private utility : UtilityService,
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
      await this.getArticle();
      this.spinner(false);

      // Charger les settings
      const settings : Settings = await this.storage.get(this.utility.localstorage.Setting);
      this.settings = await settings;

      // Charger la liste des magasins
      this.magasins = settings.magasins;

      this.tempSetMagasinPrix();

    }

    async updateArticle(articles : Articles){

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
          disabled : true,
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
        // {
        //   text: 'Magasin : ' + articles.magasin,
        //   cssClass: 'primary',
        //   handler: async (result) => {
        //     this.modifierMagasin(articles)
        //   }
        // },
        // {
        //   text: 'Ajouter un prix',
        //   cssClass: 'primary',
        //   handler: async (result) => {
        //     this.chooseMagasinPrixMagasin(articles, 'create')
        //   }
        // },
        // {
        //   text: 'Modifier un prix',
        //   cssClass: 'primary',
        //   handler: async (result) => {
        //     this.chooseMagasinPrixMagasin(articles, 'update')
        //   }
        // },
        // {
        //   text: 'Supprimer un prix',
        //   cssClass: 'primary',
        //   handler: async (result) => {
        //     this.chooseMagasinPrixMagasin(articles, 'delete')
        //   }
        // },
        {
        text: 'Valider',
        handler: async (result : Articles) => {

          var articles = await this.storage.get(this.utility.localstorage.articles);
          var article : Articles = await articles.find(s => {
            return s.code === result.code;
          })

          article.code = result.code;
          article.libelle = result.libelle;
          article.prix = result.prix;
          article.barreCode = result.barreCode

          await this.articleService.putArticle(article)
          await this.getArticle()
          await this.spinner(false)

          }
        }
        ]
      });
  
      await alert.present();

    }

    private async chooseMagasinPrixMagasin(article : Articles, typeCrudPrixMagasin : string){

      var magasins = [];

      if(typeCrudPrixMagasin === 'create'){
        magasins = this.settings.magasins;
      }
      if(typeCrudPrixMagasin === 'update' || typeCrudPrixMagasin === 'delete'){
        for(let prixMagasin of article.PrixMagasin){
          magasins.push(prixMagasin.magasin)
        } 
      }

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
        header: 'Ajouter un prix',
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

          if(typeCrudPrixMagasin === 'create'){
            await this.setPrixMagasinStep2(article, result);
          }

          if(typeCrudPrixMagasin === 'update'){
            for(let prixMagasin of article.PrixMagasin){
              if(prixMagasin.magasin === result){
                await this.updatePrixMagasin(article, result, prixMagasin.prix);
              }
            }
          }

        }
        }
        ]
      });
  
      await alert.present();
    }

    async getListePrixMagasin(article : Articles) {

      const prixMagasins = article.PrixMagasin;
      const inputsOption = [];

      for(let prixMagasin of prixMagasins){
        inputsOption.push({
          name: 'magasin',
          type: 'radio',
          label : prixMagasin.magasin + ' ' + prixMagasin.prix,
          value : prixMagasin
        })
      }

      const alert = await this.alertController.create({
        header: 'Listes des prix',
        inputs: inputsOption,
        buttons: [
        {
          text: 'Ajouter',
          handler: () => {
            this.chooseMagasinPrixMagasin(article, 'create')
          }
        },
        {
          text: 'Modifier',
          handler: async (result) => {
            await this.updatePrixMagasin(article, result.magasin, result.prix);
          }
        },
        {
        text: 'Supprimer',
        handler: async (result) => {

        //  await this.articleService.deleteArticle(article);
        const index = article.PrixMagasin.findIndex(prixMagasins => prixMagasins.magasin === result.magasin);
        article.PrixMagasin.splice(index, 1);
        await this.articleService.putArticle(article);
          
        }
        },{
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }
        ]
      });
  
      await alert.present();
    }

    private async updatePrixMagasin(article : Articles, magasin : string, prix : number){

      const alert = await this.alertController.create({
        header: 'Modifier le prix de ' + magasin,
        inputs: [{
          type : 'number',
          label : 'Prix',
          name : 'prix',
          value : prix
        }],
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
          
          const index = article.PrixMagasin.findIndex(prixMagasin => prixMagasin.magasin === magasin);
          article.PrixMagasin[index].prix = result.prix
          await this.articleService.putArticle(article);
          await this.getArticle();
          this.spinner(false);

        }
        }
        ]
      });
  
      await alert.present().then(() => {
        const firstInput: any = document.querySelector('ion-alert input');
        firstInput.focus();
        return;
      });
    }

    private async setPrixMagasinStep2(article : Articles, magasin : string){

      const alert = await this.alertController.create({
        header: 'Ajouter un prix',
        inputs: [{
          type : 'number',
          label : 'Prix',
          name : 'prix'
        }],
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
          
          article.PrixMagasin.push({
            prix : result.prix,
            magasin : magasin
          })

          await this.articleService.putArticle(article);
          await this.getArticle();
          this.spinner(false);

        }
        }
        ]
      });
  
      await alert.present().then(() => {
        const firstInput: any = document.querySelector('ion-alert input');
        firstInput.focus();
        return;
      });

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
          
          const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles);
          const index =  await articles.findIndex(s => {
            return s.code === article.code
          })

          articles[index] = article

          this.storage.set(this.utility.localstorage.articles, articles).then(() => {
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

          var articles : Array<Articles> = await this.storage.get(this.utility.localstorage.articles);
          
          if(result.code !== article.code){

            const index = await articles.findIndex((articleResult : Articles)=> {
              return articleResult.libelle === article.libelle
            })
            
            articles[index].code = result.code
            if(articles[index].firebase){
              articles[index].isModified = true
            }

            await this.storage.set(this.utility.localstorage.articles, articles);
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

      await this.storage.set(this.utility.localstorage.articles, articles)
      await this.utility.popupInformation('Le code barre a bien été renseigné');
      await this.getArticle();
      await this.spinner(false)

    }
    
    private async getFamilleQuiOntDesArticles(){
      const articles : Articles [] = await this.storage.get(this.utility.localstorage.articles);
      const codeFamille = [];
      for(let article of articles){
        codeFamille.push(article.familleCode)
      }
      var uniqueCodeFamille = [...new Set(codeFamille)]
      const familles : Familles [] = [];
      for(let code of uniqueCodeFamille){
        var famille = await this.articleService.getFamilleByCode(code)
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

        const articles : Array<Articles> = await this.storage.get(this.utility.localstorage.articles)
        var articleTemp : Array<Articles> = [];
        
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

        this.storage.set(this.utility.localstorage.articles, articleTemp).then(() => this.getArticle())
        
          
        }
      }
      ]
    });

    await alert.present();
    }

    async tempSetMagasinPrix(){

      const articles : Array<Articles> = await this.articleService.getArticles();
      articles.map(articles => {
        articles.PrixMagasin = [
          {
            magasin : articles.magasin === 'Carrefour' ? 'Carrefour Arue' : articles.magasin,
            prix : articles.prix
          }
        ];
        if(articles.magasin === 'Carrefour'){
          articles.magasin = 'Carrefour Arue';
        }
        articles.isModified = true;
      })

      await this.articleService.postArticles(articles);

    }

    async changeMagasin(event){
      const magasin = await event.target.value
      this.filtreMagasin = await magasin
      this.getArticle().then(() => this.spinner(false))
      this.getArticleByMagasin();
    }

    async getArticleByMagasin(){

      const magasinSelected = this.filtreMagasin;
      const articles : Array<Articles> = await this.articleService.getArticles();
      const articlesFiltre : Array<Articles> = [];

      if(magasinSelected !== ''){
        for(let article of articles){

          for(let index = 0; index < article.PrixMagasin.length; index++){
  
            if(article.PrixMagasin[index].magasin === magasinSelected){
              article.prix = article.PrixMagasin[index].prix;
              articlesFiltre.push(article);
            }
  
          }//for
  
        }//for
        
        return await articlesFiltre;
      }else{
        return articles;
      } 

    }

    async getArticle(){

      this.spinner(true)

      this.articles = []
      this.familles = []

      const familles = await this.getFamilleQuiOntDesArticles();
      this.familles = familles;
      
      const articlesByMagasin : Array<Articles> = await this.getArticleByMagasin();
      var groupByArticle : Array<Articles> = []


      for(let i = 0 ; i < familles.length; i++){

        for(let article of articlesByMagasin){

          if(article.familleCode == familles[i].code){

            article.familleLibelle = familles[i].libelle

            if(!article.isDeleted){
              groupByArticle.push(article)
            }
          } // if          
        }

      } // for

      const articles = await this.articleService.orderByArticleName(groupByArticle)

      this.articles = articles;

      // this.filtreArticleByMagasin(articles);
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

      async updateFamilleAssociee(article : Articles){

        const familles : Array<Familles> = this.articleService.orderByLibelleFamille(await this.storage.get(this.utility.localstorage['famille d\'articles']));

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

              await this.articleService.putArticle(article)       
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

      public async getArticleByBarreCode(){
        const barreCode = await this.barreCodeService.scanneBarreCode();
        const article = this.articleService.getArticleByBarreCode(barreCode);
        const articles = [];
        articles.push(article);
        this.articles = articles;

        const famille = this.articleService.getFamilleByCode((await article).code);
        const familles = [];
        familles.push(famille);
        this.familles = familles;
      }
  
      async postArticleByBarreCode(){
        const barreCode = await this.barreCodeService.scanneBarreCode();
        const article = await this.articleService.getArticleByBarreCode(barreCode);
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
              text: 'Annuler',
              role: 'cancel',
              cssClass: 'secondary',
            handler: () => {
            }
            }, {
            text: 'Valider',
            handler: async (formValue : Articles) => {

              const article : Articles = {
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
                magasin : this.filtreMagasin === '' ? this.settings.magasinParDefaut : this.filtreMagasin,
                PrixMagasin : [
                  {
                    magasin : this.filtreMagasin === '' ? this.settings.magasinParDefaut : this.filtreMagasin,
                    prix : formValue.prix
                  }
                ]
              }

              await this.chooseMagasins(article);

              }
            }
            ]
          });
      
          await alert.present();
        }//if
        else{

          const magasin = this.filtreMagasin === '' ? this.settings.magasinParDefaut : this.filtreMagasin;
          const prixMagasin = article.PrixMagasin.filter(prixMagasins => prixMagasins.magasin === magasin);

          if(prixMagasin.length === 0){
            await this.postPrixMagasin(article, magasin);
          }else{
            this.utility.popupInformation('Le code barre <strong>' + barreCode + '</strong> est déjà associé à l\'article ' + article.libelle + ' sur le magasin ' + magasin)
          }

        }
      }

      private async postPrixMagasin(article : Articles, magasin : string){

        const alert = await this.alertController.create({
          header: 'Ajouter un article',
          inputs: [
            {
              name: 'prix',
              type: 'text',
              placeholder: 'Prix'
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
          text: 'Valider',
          handler: async (result) => {

            article.PrixMagasin.push({
              prix : result.prix,
              magasin : magasin
            })

            await this.articleService.putArticle(article);

            }// valider
          }
          ]
        });

        await alert.present().then(() => {
          const firstInput: any = document.querySelector('ion-alert input');
          firstInput.focus();
          return;
        });
      }

      private async chooseMagasins(article : Articles){

        const inputOptions : Array<AlertInput> = [];

        for(let magasin of this.magasins){
          inputOptions.push({
            type : 'radio',
            label : magasin,
            value : magasin
          })
        }

        const alert = await this.alertController.create({
          header: 'Ajouter un article',
          inputs: inputOptions,
          buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
          handler: () => {
          }
          }, {
          text: 'Valider',
          handler: async (magasin) => {

            article.PrixMagasin.push({
              magasin : magasin.magasin,
              prix : article.prix
            })

            await this.articleService.postArticle(article);
            await this.getArticle();
            this.spinner(false);


            }// valider
          }
          ]
        });

        await alert.present();

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
