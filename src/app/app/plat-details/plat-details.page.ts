import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, AlertInput } from '@ionic/angular';
import { Articles } from 'src/app/models/Articles';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { CourseDetails } from 'src/app/models/Course-details';
import { Courses } from 'src/app/models/Courses';
import { PlatDetails } from 'src/app/models/Plat-details';
import { Plats } from 'src/app/models/Plats';
import { ArticlesService } from 'src/app/services/articles.service';
import { CoursesService } from 'src/app/services/courses.service';
import { PlatsService } from 'src/app/services/plats.service';
import { UtilityService } from 'src/app/services/utility.service';

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
  isRechercheAvancee = false;
  infoConnexion : ConnexionInfo;

  constructor(private route : ActivatedRoute,
              private alertController : AlertController,
              private articleservice : ArticlesService,
              private courseservice : CoursesService,
              private utility : UtilityService,
              private platservice : PlatsService) { }

  async ngOnInit() {
    this.infoConnexion = await this.utility.getConnexionInfo();
    await this.refresh();
  }

  public async selectArticle(article : Articles){
    await this.postQuantite(article);
    this.setIsRechercheAvance();
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

  setIsRechercheAvance(){
    this.isRechercheAvancee = !this.isRechercheAvancee;
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
        },
        {
          text: 'Recherche avancée',
          cssClass: 'secondary',
          handler: () => {
            this.setIsRechercheAvance();
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

  public async sendToCourse(platdetail : PlatDetails){
    const course : Array<Courses> = await this.courseservice.getCourseIsFocus(this.infoConnexion.groupeId);
    const prix = platdetail.article.prix.find(prix => prix.magasin === course[0].magasinId);
    const coursedetail : CourseDetails = {
      id : Number(new Date()),
      ordre : 0,
      courseId : course[0].id.toString(),
      libelle : platdetail.article.libelle,
      quantite : platdetail.quantite,
      articleId : platdetail.article.id,
      prixArticle : prix === undefined ? platdetail.article.prix[0].prix : prix.prix,
      prixReel : prix === undefined ? platdetail.article.prix[0].prix : prix.prix,
      total : Number(platdetail.quantite * (prix === undefined ? platdetail.article.prix[0].prix : prix.prix)),
      checked : false,
      isFirebase : false
    }
    await this.courseservice.postCourseDetails(coursedetail);
    this.utility.popUp('Article ajouté au panier')
    this.refresh();
  }


}
