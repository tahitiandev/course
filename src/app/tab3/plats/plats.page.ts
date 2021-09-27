import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Plats } from 'src/app/models/plats';
import { PlatsService } from 'src/app/services/plats.service';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-plats',
  templateUrl: './plats.page.html',
  styleUrls: ['./plats.page.scss'],
})
export class PlatsPage implements OnInit {
  
  plats : Plats[];

  constructor(private platsService : PlatsService,
              private alertController: AlertController,
              private storage : Storage,
              private utility : UtilityService,
              private nav : NavController) {
                this.getPlats()
               }

  ngOnInit() {
    this.getPlats()
  }

  async getPlats(){
    const plats = await this.platsService.getPlatFromLocalStorage()
    this.plats = plats;
  }

  goDetail(libelle : string, autresChemin? : string){
    if(autresChemin){
      this.nav.navigateRoot('tabs/tab3/'+ autresChemin + '/' + libelle)
    }else{
      this.nav.navigateRoot('tabs/tab3/'+ libelle)
    }
  }

  async actualiser(){
    const plats = await this.storage.get(this.utility.localstorage.Plats)
    this.plats = plats
  }

  supprimerPlat(index : number){
    var platTemp : Plats [] = [];
    for(let plat of this.plats){
      if(plat.libelle != this.plats[index].libelle){
        platTemp.push(plat)
      } // if
    } // for

    this.plats = []
    this.plats = platTemp

    this.storage.set(this.utility.localstorage.Plats, platTemp)

  } // supprimerPlat

}