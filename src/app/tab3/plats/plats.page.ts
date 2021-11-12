import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Plats } from 'src/app/models/plats';
import { PlatsService } from 'src/app/services/plats.service';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';
import { Articles } from 'src/app/models/articles';

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
              private nav : NavController) {
                this.getPlats()
               }

  ngOnInit() {
    this.getArticle()
    this.setTotal()
    this.getPlats()
  }

  async getArticle(){
    const articles = await this.storage.get(this.utility.localstorage.articles);
    this.articles = articles;
  }  

  async getPlats(){
    const platsLS = await this.storage.get(this.utility.localstorage.Plats)
    const plats = await this.platsService.sortByLibelleFamilleArticle(platsLS)
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

  private calculeTotal(plat : Plats){
    var total : number = 0;
    
    for(let article of plat.codeArticle){
      var articleInfo = this.articles.find(s => {
        return s.code === article.codeArticle;
      })
      total += (articleInfo.prix-0) * (article.quantite-0)
    }
    return total;
  }

  private async setTotal(){

    const platsLS = await this.platsService.getPlatFromLocalStorage();
    const plats = await this.platsService.sortByLibelleFamilleArticle(platsLS)
    const platsWithPrix : Plats[] = [];

    for(let plat of plats){

      var prix = this.calculeTotal(plat)

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

  async supprimerPlat(index : number){
    
    const platsNew = await this.platsService.deletePlat(index);
    this.plats = []
    this.plats = platsNew

  } // supprimerPlat

}