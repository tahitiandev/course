import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';
import { Articles, FamilleArticle } from 'src/app/models/articles';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-famille-list',
  templateUrl: './famille-list.page.html',
  styleUrls: ['./famille-list.page.scss'],
})
export class FamilleListPage implements OnInit {

  constructor(private articleService : ArticlesService,
              private storage : Storage,
              private utility : UtilityService,
              private alertController: AlertController,
              private nav : NavController) {
               }

  familles : FamilleArticle [] = [];

  ngOnInit() {
    this.onInit()
  }

  async onInit(){
    const familles : Array<FamilleArticle> = await this.getFamilles();
    this.familles = familles;
  }

  async getFamilles(){
    const famillesLS = await this.storage.get(this.utility.localstorage['famille d\'articles'])
    const familles = await this.articleService.sortByLibelleFamilleArticle(famillesLS)
    return familles;
  }

  async postFamille() {

    const familleId = await this.articleService.generateFamilleArticleId();

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle famille d\'article',
      inputs: [
        {
          name: 'code',
          type: 'text',
          value : familleId,
          disabled : true
        },
        {
          name: 'libelle',
          type: 'text',
          placeholder: 'Libelle'
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
          handler: async (data) => {

            await this.articleService.postNouvelleFamilleArticle({
              code : data.code,
              libelle : data.libelle,
              firebase : false,
              isModified : false,
              documentId : null
            })

            this.onInit()

          }
        }
      ]
    });

    await alert.present();

  } //

  async updateFamille(famille : FamilleArticle){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier une famille d\'article',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Code',
          value : famille.code.toString(),
          // disabled : true
        },
        {
          name: 'libelle',
          type: 'text',
          placeholder: 'Libelle',
          value : famille.libelle
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
          handler: async (famille : FamilleArticle) => {
            await this.articleService.updateFamille(famille);
            this.onInit()
          }
        }
      ]
    });

    await alert.present();

  }

  goDetail(code : string){
    this.nav.navigateRoot('tabs/tab3/famille-detail/' + code)
  }

  async deleteFamilleArticle(famille : FamilleArticle){
    await this.articleService.deleteFamilleArticle(famille)
    this.onInit()
  }


}
