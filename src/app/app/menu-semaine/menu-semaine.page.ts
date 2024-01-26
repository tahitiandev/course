import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/menu.service';
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
              private utiilty : UtilityService) { }

  async ngOnInit() {
    this.infoConnexion = await this.getInfoConnexion();
  }

  private async refresh(){
    this.menus = await this.get();
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
        },
        {
          type : 'number',
          name : 'budget',
          placeholder : 'Budget'
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
              groupeId : this.infoConnexion.utilisateurId
            }

            await this.menuservice.post(menu);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

}
