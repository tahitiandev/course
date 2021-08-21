import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Courses, Liste } from 'src/app/models/courses';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

  constructor(private route : ActivatedRoute,
              private courseService : CoursesService,
              private alertController: AlertController) { }

  listeId : number;
  coursesDetail : Courses;
  listeArticle : Liste[]= [];

  ngOnInit() {
    this.listeId = this.route.snapshot.params['id']
    this.getCourse()
  }
  
  async getCourse(){
    const courseDetail = await this.courseService.getCourseById(+this.listeId);
    this.coursesDetail = courseDetail
    this.listeArticle = courseDetail.liste;
    
  }

  async clickCheckBox(index : number){

    var actifCheckBox : boolean = await this.listeArticle[index].actif
    var newListe : Liste [] = []

    for(let i = 0 ; i < this.listeArticle.length; i++){

      if(i !== index){
        newListe.push(this.listeArticle[i])
      }
      if(i === index){
        newListe.push({
          articleId : this.listeArticle[i].articleId,
          libelle : this.listeArticle[i].libelle,
          prixUnitaire : this.listeArticle[i].prixUnitaire,
          actif : !this.listeArticle[i].actif,
          quantite : this.listeArticle[i].quantite
        })
      }

    } //for
  
    const courseUpdate : Courses = await {
      id : this.coursesDetail.id,
      date : this.coursesDetail.date,
      actif : this.coursesDetail.actif,
      total : this.coursesDetail.total,
      liste : newListe
    }

    this.listeArticle = newListe

    this.courseService.updateCourseInLocalStorage(courseUpdate)
    

  }

  async supprimerArticle(index: number){

    var actifCheckBox : boolean = await this.listeArticle[index].actif
    var newListe : Liste [] = []

    for(let i = 0 ; i < this.listeArticle.length; i++){

      if(i !== index){
        newListe.push(this.listeArticle[i])
      }

    } //for

    const courseUpdate : Courses = await {
      id : this.coursesDetail.id,
      date : this.coursesDetail.date,
      actif : this.coursesDetail.actif,
      total : this.coursesDetail.total,
      liste : newListe
    }

    this.listeArticle = newListe
    this.courseService.updateCourseInLocalStorage(courseUpdate)


  }

  async updateArticle(data : Liste, index : number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'prixUnitaire',
          type: 'text',
          value: data.prixUnitaire
        },
        {
          name: 'quantite',
          type: 'text',
          id: 'name2-id',
          value: data.quantite
        },
        {
          name: 'actif',
          type: 'text',
          id: 'name2-id',
          value: data.actif
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (data) => {
            
            var newListe : Liste [] = []
        
            for(let i = 0 ; i < this.listeArticle.length; i++){
        
              if(i !== index){
                newListe.push(this.listeArticle[i])
              }
              if(i === index){
                newListe.push({
                  articleId : this.listeArticle[i].articleId,
                  libelle : this.listeArticle[i].libelle,
                  prixUnitaire : data.prixUnitaire,
                  actif : data.actif,
                  quantite : data.quantite
                })
              }
        
            } //for
          
            const courseUpdate : Courses = await {
              id : this.coursesDetail.id,
              date : this.coursesDetail.date,
              actif : this.coursesDetail.actif,
              total : this.coursesDetail.total,
              liste : newListe
            }
        
            this.listeArticle = newListe
        
            this.courseService.updateCourseInLocalStorage(courseUpdate)

          }
        }
      ]
    });

    await alert.present();
  }


}
