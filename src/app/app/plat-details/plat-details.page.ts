import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, AlertInput } from '@ionic/angular';
import { Articles } from 'src/app/models/Articles';
import { PlatDetails } from 'src/app/models/Plat-details';
import { Plats } from 'src/app/models/Plats';
import { ArticlesService } from 'src/app/services/articles.service';
import { PlatsService } from 'src/app/services/plats.service';

@Component({
  selector: 'app-plat-details',
  templateUrl: './plat-details.page.html',
  styleUrls: ['./plat-details.page.scss'],
})
export class PlatDetailsPage implements OnInit {

  platid = 0;
  plat : Plats = {
    id : 0,
    libelle : '',
    total : 0,
    createdOn : new Date(),
    isFirebase : false
  }
  platdetails : Array<PlatDetails> = [];
  totalPlat = 0;

  constructor(private route : ActivatedRoute,
              private alertController : AlertController,
              private articleservice : ArticlesService,
              private platservice : PlatsService) { }

  async ngOnInit() {
    await this.refresh();
  }

  public async refresh(){
    const id = await this.route.snapshot.params['id'];
    this.platid = id;
    var plat = await this.platservice.getPlatById(+id);
    this.plat = plat;
    var platdetail : Array<PlatDetails> = await this.platservice.getPlatDetails(+id);
    this.platdetails = platdetail;
    this.calculeTotal();
  }

  public async post(){

    const inputs : Array<AlertInput> = [];

    (await this.articleservice.get()).map(article => {
      inputs.push({
        type : 'radio',
        value : article,
        label : article.libelle
      })
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un plat',
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
          handler: async (article : Articles) => {

            await this.postQuantite(article);

          }
        }
        
      ]
    });

    await alert.present();
  }

  private async postQuantite(article : Articles){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un plat',
      inputs: [
        {
          type : 'number',
          name : 'quantite',
          placeholder : 'qté 1'
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

            var quantiteRenseigne = data.quantite === '' ? 1 : Number(data.quantite);
            var platdetail : PlatDetails = {
              id : 0,
              ordre : Number(new Date()),
              platId : Number(this.platid),
              article : article,
              quantite : quantiteRenseigne,
              total : article.prix[0].prix * quantiteRenseigne,
              isFirebase :false
            }

            await this.platservice.postPlatDetail(platdetail);
            await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

  private async calculeTotal(){
    const platdetails = this.platdetails;
    var total = 0;
    if(platdetails.length > 0){
      for(let platdetail of platdetails){
        total += platdetail.article.prix[0].prix * platdetail.quantite
      }
    }

    this.totalPlat = total;
    this.plat.total = total;
    await this.platservice.put(this.plat);
  }


private async put(platdetail : PlatDetails){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un plat',
      inputs: [
        {
          type : 'number',
          name : 'quantite',
          placeholder : 'qté : ' + platdetail.quantite
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

            var quantiteRenseigne = data.quantite === '' ? Number(platdetail.quantite) : Number(data.quantite);
            platdetail.quantite = quantiteRenseigne;
            platdetail.total = platdetail.article.prix[0].prix * quantiteRenseigne;
            await this.platservice.putPlatDetail(platdetail);
            await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async retirer(platdetail : PlatDetails){
    await this.platservice.deleteDefinitivementPlatDetail(platdetail);
    await this.refresh();
  }


}
