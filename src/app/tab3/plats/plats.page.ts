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
              private nav : NavController) { }

  ngOnInit() {
    this.storage.get(this.utility.localstorage.Plats).then(plats => this.plats = plats)
  }

  goDetail(libelle : string, autresChemin? : string){
    if(autresChemin){
      this.nav.navigateRoot('tabs/tab3/'+ autresChemin + '/' + libelle)
    }else{
      this.nav.navigateRoot('tabs/tab3/'+ libelle)
    }
  }
  



}