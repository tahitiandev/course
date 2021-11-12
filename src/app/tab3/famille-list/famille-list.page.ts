import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';
import { FamilleArticle } from 'src/app/models/articles';
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
                // this.initFamilleFromDataLocalStorage()
               }

  familles : FamilleArticle [] = [];

  ngOnInit() {
    // this.articleService.setFamilleArticleToLocalStorage()
    this.initFamilleFromDataLocalStorage()
  }

  async initFamilleFromDataLocalStorage(){
    const famillesLS = await this.storage.get(this.utility.localstorage['famille d\'articles'])
    const familles = await this.articleService.sortByLibelleFamilleArticle(famillesLS)
    this.familles = familles
  }


  async setNewFamille() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle famille d\'article',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Code'
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
          handler: async (data : FamilleArticle) => {

            const newFamille = await this.articleService.addNewFamilleArticleRealDataToLocalStorage(data)
            this.initFamilleFromDataLocalStorage()


          //   this.articleService.setFamilleArticleRealDataToLocalStorage(data).then(() => {
          //     this.initFamilleFromDataLocalStorage()
          //   })
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
          value : famille.code,
          disabled : true
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
          handler: (data : FamilleArticle) => {
            this.articleService.setFamilleArticleRealDataToLocalStorage(data)
          }
        }
      ]
    });

    await alert.present();

  }

  goDetail(code : string){
    this.nav.navigateRoot('tabs/tab3/famille-detail/' + code)
  }

  deleteFamilleArticle(famille : FamilleArticle){
    this.articleService.deleteFamilleArticle(famille)
    this.initFamilleFromDataLocalStorage()
  }


}
