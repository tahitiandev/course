import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { AlertInput } from '@ionic/core';
import { UtilityService } from 'src/app/services/utility.service';
import { Memos } from 'src/app/models/memo';
import { MemoService } from 'src/app/service/memo.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {

  constructor(
              private articleService : ArticlesService,
              private utility : UtilityService,
              private memoService : MemoService,
              private alertController : AlertController) { }
  
  articles : Array<Articles>;
  memos : Array<Memos>;
  isRechercheRapideActif : boolean = false;

  ngOnInit() {
    this.onInit();
  }

  private async onInit(){
    const articles = await this.getArticles();
    this.articles = articles;

    const memos = await this.getMemos();
    this.memos = memos;

  }

  private async getArticles (){
    const articles = await this.articleService.getArticles();
    return articles;
  }

  private async getMemos(){
    const memos : Array<Memos> = await this.memoService.getMemos();
    return memos;
  }

  public async postMemo(){

    const articles = await this.articleService.orderByArticleName(await this.getArticles());
    const inputs : Array<AlertInput> = [];
    articles.map(articles => {
      inputs.push({
        name : 'article',
        type : 'radio',
        label : articles.libelle,
        value : articles

      })
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Choisir un article',
      inputs : inputs,
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utility.popupInformation('Fin de l\'opération');
          }
        }, {
          text: 'Oui',
          handler: async (article : Articles) => {
            
            const memo : Memos = {
              id : await this.memoService.generateMemoId(),
              libelle : article.libelle,
              date : (await this.utility.getDateDuJour()).dateComplete,
              firebase : false,
              isModified : false,
              isDeleted : false
            }

            const response = await this.memoService.postMemo(memo);
            
            this.memos = response.all;

          }
        }
      ]
    });

    await alert.present()
    

  }

  public async deleteMemo(memo : Memos){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Souhaitez-vous réellement l\'effacer ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utility.popupInformation('Opération annulée');
          }
        }, {
          text: 'Oui',
          handler: async () => {
            const response = await this.memoService.deleteMemo(memo);
            this.memos = response.all;
            await this.utility.popupInformation('Opération effectuée');
          }
        }
      ]
    });

    await alert.present()
  }

  public async postMemoPersonnalise(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer une note personnalisée',
      inputs : [
        {
          type : 'text',
          label : 'Libellé',
          name : 'libelle'
          
        }
      ],
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utility.popupInformation('Opération annulée');
          }
        }, {
          text: 'Oui',
          handler: async (data) => {

            const memo : Memos = {
              id : await this.memoService.generateMemoId(),
              libelle : data.libelle,
              date : (await this.utility.getDateDuJour()).dateComplete,
              firebase : false,
              isModified : false,
              isDeleted : false
            }

            const response = await this.memoService.postMemo(memo);
            
            this.memos = response.all;
            
          }
        }
      ]
    });

    await alert.present()
  }

  public rechercheRapide(){
    this.isRechercheRapideActif = !this.isRechercheRapideActif;
  }




}
