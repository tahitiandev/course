import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';
import { Articles, Familles } from 'src/app/models/articles';
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

  familles : Familles [] = [];

  ngOnInit() {
    this.onInit()
  }

  async onInit(){
    const familles : Array<Familles> = await this.getFamilles();
    this.familles = familles.filter(s => s.isDeleted !== true);
  }

  async getFamilles(){
    const familles = await this.articleService.getFamilles();
    return familles;
  }

  async postFamille() {

    const familleId = await this.articleService.generateFamilleId();

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

            await this.articleService.postFamille({
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

  async updateFamille(famille : Familles){

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
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Valider',
          handler: async (famille : Familles) => {
            const familles = await this.articleService.getFamilles();
            const familleNew = await familles.find(s => s.code === famille.code)
            familleNew.code = famille.code
            familleNew.libelle = famille.libelle
            await this.articleService.putFamille(familleNew);
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

  async deleteFamilleArticle(famille : Familles){
    await this.articleService.deleteFamille(famille)
    this.onInit()
  }


}
