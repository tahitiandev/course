import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { CourseDetails } from 'src/app/models/Course-details';
import { Courses } from 'src/app/models/Courses';
import { PlatDetails } from 'src/app/models/Plat-details';
import { Plats } from 'src/app/models/Plats';
import { CoursesService } from 'src/app/services/courses.service';
import { PlatsService } from 'src/app/services/plats.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-plats',
  templateUrl: './plats.page.html',
  styleUrls: ['./plats.page.scss'],
})
export class PlatsPage implements OnInit {

  plats : Array<Plats> = [];
  infoConnexion : ConnexionInfo;

  constructor(private platservice : PlatsService,
              private utility : UtilityService,
              private courseservice : CoursesService,
              private alertController : AlertController) { }

  async ngOnInit() {
    this.infoConnexion = await this.getInfoConnexion();
    await this.refresh();
  }

  public async refresh(){
    this.plats = await this.platservice.get();
  }

  private async getInfoConnexion(){
    return await this.utility.getConnexionInfo();
  }

  public async post(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Créer un plat',
      inputs: [
        {
          type : 'text',
          name : 'libelle'
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

            const plat : Plats = {
              id : 0,
              libelle : data.libelle == '' ? 'A définir' : data.libelle,
              total : 0,
              createdOn : new Date(),
              isFirebase : false
            }

            await this.platservice.post(plat);
            await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }
  
  public async delete(plat : Plats){
    await this.platservice.deleteDefinitivement(plat);
    await this.refresh();
  }

  public async postToPanier(plat : Plats){
    const inputs : Array<AlertInput> = [];
    const platdetails : Array<PlatDetails> = await this.platservice.getPlatDetails(plat.id);

    platdetails.map(platdetail => {
      inputs.push({
        type : 'checkbox',
        label : platdetail.article.libelle,
        value : platdetail,
        checked : true
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
          handler: async (result : Array<PlatDetails>) => {

            if(result.length > 0){
              const course : Array<Courses> = await this.courseservice.getCourseIsFocus(this.infoConnexion.groupeId);
              await result.map(async (res) => {

                var prix = await res.article.prix.find(prix => prix.magasin === course[0].magasinId);
                var prixOk = prix === undefined ? res.article.prix[0].prix : prix;

                var coursedetail : CourseDetails = {
                  id : 0,
                  ordre : 0,
                  courseId : course[0].id.toString(),
                  libelle : res.article.libelle,
                  quantite : res.quantite,
                  articleId : res.article.id,
                  prixArticle : Number(prixOk),
                  prixReel : Number(prixOk),
                  total : Number(prixOk) * res.quantite,
                  isFirebase : false,
                  checked : false,
                  groupeId : this.infoConnexion.groupeId
                }

                await this.courseservice.postCourseDetails(coursedetail);
              })
              await this.refresh();
            }

          }
        }
        
      ]
    });

    await alert.present();
  }
}