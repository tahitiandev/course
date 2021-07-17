import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';
import { FamilleArticle } from 'src/app/models/articles';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-famille-list',
  templateUrl: './famille-list.page.html',
  styleUrls: ['./famille-list.page.scss'],
})
export class FamilleListPage implements OnInit {

  constructor(private articleService : ArticlesService,
              private storage : Storage,
              private utility : UtilityService,
              private alertController: AlertController) {
                this.initFamilleFromDataLocalStorage()
               }

  familles : FamilleArticle [] = [];

  ngOnInit() {
    // this.articleService.setFamilleArticleToLocalStorage()
    this.initFamilleFromDataLocalStorage()
  }

  async initFamilleFromDataLocalStorage(){
    const familles = await this.storage.get(this.utility.localstorage['famille d\'articles'])
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
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data : FamilleArticle) => {
            this.articleService.setFamilleArticleRealDataToLocalStorage(data).then(() => {
              this.initFamilleFromDataLocalStorage()
            })
          }
        }
      ]
    });

    await alert.present();

  } //




}
