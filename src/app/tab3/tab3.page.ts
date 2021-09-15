import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Setting } from '../models/setting';
import { UtilityService } from '../services/utility.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  darkModeBtn : boolean;
  setting : Setting;
  theme = {
    'dark' : 'dark',
    'light' : 'light'
  }

  constructor(private utility : UtilityService,
              private storage : Storage) {

                this.storage.get('setting').then((setting : Setting) => {
                  if(setting){
                    this.setting = setting
            
                    // Init thème
                    if(this.setting.theme === true){
                      this.darkModeBtn = true
                    }else{
                      this.darkModeBtn = false
                    }
                  }else{
                    console.log('Erreur d\'initialisation du setting du localstorage')
                  }
                })

              }

  goToUrl(tabNumber : string, pageName? : string){
    this.utility.goToUrl(tabNumber, pageName);    
  }

  async toggletheme(event){
    if(event.detail.checked){

      document.body.setAttribute('color-theme',this.theme.dark);
      const setting = await this.storage.get(this.utility.localstorage.Setting);
      this.setting = setting;
      this.setting.theme = true
      this.storage.set(this.utility.localstorage.Setting, this.setting)
    }else{
      document.body.setAttribute('color-theme',this.theme.light);
      const setting = await this.storage.get(this.utility.localstorage.Setting);
      this.setting.theme = false
      this.storage.set(this.utility.localstorage.Setting, this.setting)
    }
  }


}
