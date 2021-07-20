import { Component, OnInit } from '@angular/core';
import { Articles } from '../models/articles';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';
import { UtilityService } from '../services/utility.service';
import { ArticlesService } from '../services/articles.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private storage : Storage,
              private alertController: AlertController,
              private u : UtilityService,
              private articleService : ArticlesService,
              private nav : NavController) {}

  articles : Articles [];

  ngOnInit(){
    // this.articleService.setArticleToLocalStorage()
    this.storage.get(this.u.localstorage.articles).then(articles => {
      this.articles = articles
      // console.log(articles)
    })

  }

  async ajouterUnArticle(){

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
          handler: (newArticle) => {
            
            // Récupère les données du LS et le met dans une variable temporaire
            this.storage.get(this.u.localstorage.articles).then(articles => {
              this.addNewArticle(newArticle, articles)
              // this.refreshArticleList()
            });
              
            }
        }
      ]
    });

    await alert.present();
  }

  addNewArticle(newArticle :  Articles, articleInLocalStorage : Articles []){

    // Ajout des articles déjà existant
    if(articleInLocalStorage){
      this.articles = [];
      
      for(let article of articleInLocalStorage){
        this.articles.push(article)
      }
      
    }

    // Add du nouvelle article
    this.articles.push({
      code : newArticle.code,
      libelle : newArticle.libelle,
      prix : newArticle.prix
    })

    // MAJ des donées dans le localStorage
    this.storage.set(this.u.localstorage.articles, this.articles)
    
  }

  async refreshArticleList(){
    const articles = await this.storage.get(this.u.localstorage.articles);
    this.articles = articles;
  }

  goDetail(id : number){
    this.nav.navigateRoot('tabs/tab2/article-details/' + id)
  }

  goToArticleAdd(){
    this.nav.navigateRoot('tabs/tab2/article-add')
  }

}
