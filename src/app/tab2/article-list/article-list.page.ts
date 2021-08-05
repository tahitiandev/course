import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Articles } from 'src/app/models/articles';
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

ngOnInit(){
this.getArticle();
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

async getArticle(){
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
