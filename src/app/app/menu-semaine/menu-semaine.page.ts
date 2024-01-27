import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { LocalName } from 'src/app/enums/LocalName';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Menu } from 'src/app/models/Menu';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuService } from 'src/app/services/menu.service';
import { PlatsService } from 'src/app/services/plats.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-menu-semaine',
  templateUrl: './menu-semaine.page.html',
  styleUrls: ['./menu-semaine.page.scss'],
})
export class MenuSemainePage implements OnInit {

  infoConnexion : ConnexionInfo;
  menus : Array<Menu> = [];

  constructor(private alertController : AlertController,
              private menuservice : MenuService,
              private platsservice : PlatsService,
              private firestore : FirestoreService,
              private utiilty : UtilityService) { }

  async ngOnInit() {
    this.infoConnexion = await this.getInfoConnexion();
    this.initMenu();
    this.refresh();
  }

  public async sendToCourse(plat : Plats){
    const platdetail = await this.platsservice.getPlatDetails(+plat.id);
    const inputs : Array<AlertInput> = [];
    await platdetail.map(ingredient => {
      inputs.push({
        type : 'checkbox',
        value : ingredient,
        label : ingredient.article.libelle
      })
    })
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Choisir les ingéridients',
      inputs: inputs,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (data : any) => {
            this.utiilty.popUp('ne fait rien pour l\'instant')
          }
        }
        
      ]
    });
    await alert.present();
  }

  private async initMenu(){
    const menus : Array<Menu> = await this.get();
    const jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
    if(menus.length === 0){

      for(let jour of jours){
        const menu : Menu = {
          id : 0,
          jour : jour,
          isFirebase : false,
          groupeId : this.infoConnexion.groupeId
        }
        await this.menuservice.post(menu)
      }
    }
  }

  private async refresh(){
    if((await this.utiilty.getConnexionInfo()).isOnline){
      (await this.firestore.getAll(LocalName.Menus)).subscribe(async(datas : any) => {
        const menus : Array<any> = await datas.filter((data:any) => data.groupeId == this.infoConnexion.groupeId);
        this.menus = menus;
      })
    }else{
      this.menus = await this.get();
    }
  }

  private async getInfoConnexion(){
    return await this.utiilty.getConnexionInfo();
  }

  private async get(){
    return await this.menuservice.get();
  }

  public async post(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Faite une epargne',
      inputs: [
        {
          type : 'text',
          name : 'jour',
          placeholder : 'Jour'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (data : any) => {
            const menu : Menu = {
              id : 0,
              jour : data.jour,
              isFirebase : false,
              groupeId : this.infoConnexion.groupeId
            }

            await this.menuservice.post(menu);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async put(menu : Menu){

    const plats : Array<Plats> = await this.platsservice.get();
    const inputs : Array<AlertInput> = [];

    plats.map(plat => {
      inputs.push({
        type : 'radio',
        value : plat,
        label : plat.libelle
      })
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Choisir un plat',
      inputs: inputs,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (plat : Plats) => {

            menu.plat = plat;
            menu.libelle = plat.libelle;

            await this.menuservice.put(menu);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

}
