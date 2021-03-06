import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Plats } from 'src/app/models/plats';
import { PlatsService } from 'src/app/services/plats.service';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';
import { Articles } from 'src/app/models/articles';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-plats',
  templateUrl: './plats.page.html',
  styleUrls: ['./plats.page.scss'],
})
export class PlatsPage implements OnInit {
  
  plats : Plats[];
  articles : Articles [];

  constructor(private platsService : PlatsService,
              private alertController: AlertController,
              private storage : Storage,
              private utility : UtilityService,
              private nav : NavController,
              private firebase : FirebaseService) {
               }

  ngOnInit() {
    this.onInit();    
  }

  async onInit(){
    const plats : Array<Plats> = await this.getPlats();
    this.plats = plats.filter(s => s.isDeleted !== true)

    const articles : Array<Articles> = await this.getArticle();
    this.articles = articles;
  }

  async getArticle(){
    const articles = await this.storage.get(this.utility.localstorage.articles);
    return articles;
  }


  async getPlats(){
    const plats :Array<Plats> = await this.platsService.getPlats();
    return plats;
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

  private async setTotal(){

    const platsLS = await this.platsService.getPlats();
    const plats = await this.platsService.sortByLibelleFamilleArticle(platsLS)
    const platsWithPrix : Plats[] = [];
    for(let plat of plats){

      var prix = await this.platsService.calculePrixTotalPlat(plat)

      platsWithPrix.push({
        libelle : plat.libelle,
        codeArticle : plat.codeArticle,
        prix : prix,
        firebase : plat.firebase,
        isModified : plat.isModified,
        documentId : plat.documentId
      })

    }//for
    
    this.storage.set(this.utility.localstorage.Plats, platsWithPrix)
    // this.plats = await platsWithPrix

  }

  async supprimerPlat(plat : Plats){
    
    const plats : Array<Plats> = await this.platsService.getPlats();
    const index = await plats.findIndex(result => result.libelle === plat.libelle)
    plats[index].isDeleted = true;
    this.storage.set(this.utility.localstorage.Plats, plats)

    // plats.splice(index,1)
    // this.plats = []
    // this.plats = plats;
    // this.storage.set(this.utility.localstorage.Plats, plats)
    // this.firebase.postToLocalStorageDeleted(
    //   plat.firebase,
    //   this.utility.localstorage.Plats,
    //   plat.documentId
    //   )

  } // supprimerPlat

}