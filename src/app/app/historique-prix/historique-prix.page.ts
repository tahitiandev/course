import { Component, OnInit } from '@angular/core';
import { HistoriquePrix } from 'src/app/models/HistoriquePrix';
import { Magasins } from 'src/app/models/Magasins';
import { HistoriquePrixService } from 'src/app/services/historique-prix.service';
import { MagasinsService } from 'src/app/services/magasins.service';

@Component({
  selector: 'app-historique-prix',
  templateUrl: './historique-prix.page.html',
  styleUrls: ['./historique-prix.page.scss'],
})
export class HistoriquePrixPage implements OnInit {

  historiqueprix : Array<HistoriquePrix> = [];
  magasins : Array<Magasins> = [];
  
  constructor(private historiqueprixservice : HistoriquePrixService,
              private magasinservice : MagasinsService) { }

  async ngOnInit() {
    
    await this.refresh();
  
  }

  public async refresh(){
    this.historiqueprix = await this.historiqueprixservice.get();
    this.magasins = await this.getMagasin();
  }

  public async getMagasin(){
    const magasins : Array<Magasins> = await this.magasinservice.get();
    return magasins;
  }

  public getLibelleMagasin(magasinId : number){
    return this.magasins.find(magasin => magasin.id == magasinId)?.libelle;
  }

  public async deleteDefinitivement(historique : HistoriquePrix){
    await this.historiqueprixservice.deleteDefinitivement(historique);
    await this.refresh();
  }



}
