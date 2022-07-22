import { Injectable } from '@angular/core';
import { Articles } from '../models/articles';
import { HistoriquePrix } from '../models/historiquePrix';
import { Storage } from '@ionic/storage';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriquePrixService {

  constructor(private storage : Storage,
              private utility : UtilityService,) { }

  
  public async getHistoriquePrix(){
    const historiquePrix : Array<HistoriquePrix> = await this.storage.get(this.utility.localstorage['Hitorique prix']);
    return historiquePrix;
  }

  public async postHistoriquesPrix(historiquePrix : Array<HistoriquePrix>){

    await this.utility.saveToLocalStorage(this.utility.localstorage['Hitorique prix'], historiquePrix);
    return await this.getHistoriquePrix();

  }

  public async postHistoriquePrix(article : Articles, nouveauPrix : number, magasin : string){

    const historiquePrix = await this.getHistoriquePrix();
    const indexAncienPrix = await article.PrixMagasin.findIndex(prixMagasin => prixMagasin.magasin = magasin);

    const data : HistoriquePrix = {
      date : (await this.utility.getDateDuJour()).dateComplete,
      prixAncien : parseInt(article.PrixMagasin[indexAncienPrix].prix.toString()),
      prixNouveau : parseInt(nouveauPrix.toString()),
      articleId : article.code,
      magasin : magasin
    }

    historiquePrix.push(data);

    return await this.postHistoriquesPrix(historiquePrix);

  }

}
