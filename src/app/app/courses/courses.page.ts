import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput, IonicModule } from '@ionic/angular';
import { CoursesService } from '../../services/courses.service';
import { Courses } from '../../models/Courses';
import { MagasinsService } from '../../services/magasins.service';
import { Magasins } from '../../models/Magasins';
import { UtilityService } from '../../services/utility.service';
import { Storage } from '@ionic/storage';
import { LocalName } from '../../enums/LocalName';
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  courses : Array<Courses> = [];
  magasins : Array<Magasins> = [];
  isActif : boolean = true;
  payeurs : Array<Utilisateurs> = [];
  isAfficherCourseCloturer : boolean =  true;

  constructor(private coursesService : CoursesService,
              private magasinsService : MagasinsService,
              private storageService : StorageService,
              private storage : Storage,
              private utility : UtilityService,
              private alertController : AlertController) { 
              }

  async ngOnInit() {
    await this.refresh();
  }

  public handleRefresh(event : any) {
    this.storageService.synchroniser(LocalName.Courses).then(()=> {
      this.storageService.synchroniser(LocalName.CourseDetails).then(()=> {
        event.target.complete()
        this.refresh();
      })
    })
  }

  private async getPayeurs(){
    return await this.storage.get(LocalName.Utilisateurs);
  }

  public async setPayeur(course : Courses){
    const payeurs : Array<Utilisateurs> = await this.getPayeurs();
    const inputs : Array<AlertInput> = [];

    payeurs.map(data => inputs.push({
      type : 'radio',
      value : data.id,
      label : data.libelle
    }))

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Définir le payeur',
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
          handler: async (payeurId : number) => {

            course.payeurId = payeurId;
            await this.coursesService.putCourse(course);
            this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

  public getLibellePayeur(payeurId : number){
    return this.payeurs.find(utilisateurs => utilisateurs.id === payeurId)?.libelle;
  }

  private async get(){
    const courses : Array<Courses> = await this.coursesService.getCourse();
    if(this.isAfficherCourseCloturer){
      return courses;
    }else{
      return courses.filter(data => data.actif)
    }
  }

  public async setIsAfficherCourseMasquer(){
    this.isAfficherCourseCloturer = !this.isAfficherCourseCloturer;
    const infoConnexion = await this.utility.getConnexionInfo();
    infoConnexion.isCourseAfficher = this.isAfficherCourseCloturer;
    await this.utility.putConnexionInfo(infoConnexion);
    await this.refresh();
  }
  
  public async refresh(){
    const infoConnexion = await this.utility.getConnexionInfo();
    this.isAfficherCourseCloturer = infoConnexion.isCourseAfficher;

    const courses : Array<Courses> = await this.get();
    this.courses = courses.filter(s => s.deletedOn === undefined || s.deletedOn === null);
    
    const magasins = await this.getMagasin();
    this.magasins = magasins;

    const payeurs = await this.getPayeurs();
    this.payeurs = payeurs;


  }
  
  public async getMagasin(){
    const magasins : Array<Magasins> = await this.storage.get(LocalName.Magasins);
    return magasins;
  }
  
  public getLibelleMagasin(magasinId : number){
    return this.magasins.find(magasin => magasin.id == magasinId)?.libelle;
  }

  public async post(){

    const magasins : Array<Magasins> = await this.magasinsService.get();
    const inputs : Array<AlertInput> = [];

    magasins.map(magasin => inputs.push({
      type : 'radio',
      value : magasin.id,
      label : magasin.libelle
    }))

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ou souhaitez-vous faire vos courses ?',
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
          handler: async (magasinId : any) => {

            await this.postChooseDate(magasinId);

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async postChooseDate(magasinId : any){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'A quelle date ?',
      inputs: [
        {
          type : 'date'
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
          handler: async (date : any) => {

            var course : Courses = {
              id : Date.now(),
              ordre : await this.generateOrdreCourse(),
              magasinId : magasinId,
              montantTheorique : 0,
              montantReel : 0,
              ecart : 0,
              date : date[0],
              actif : true,
              isFirebase : false
            }
            
            await this.coursesService.postCourse(course);
            await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

  private async generateOrdreCourse(){
    const courses = await this.coursesService.sortByOrdreDesc(this.courses).pop();
    return Number(courses?.ordre) + 1;
  }

  public put(id : number){
    this.utility.navigateTo('course-details/' + id)
  }

  public async activer(course : Courses){
    course.actif = !course.actif
    course.isFocus = false;
    await this.coursesService.putCourse(course);
    await this.refresh();
  }

  public async supprimer(course : Courses){
    await this.coursesService.deleteCourseDefinitivement(course);
    await this.refresh();
  }

  public async setIsFocus(course : Courses){
    const courses : Array<Courses> = await this.get();
    courses.map(courses => courses.isFocus = false);
    const index = await courses.findIndex(courses => course.id === courses.id);
    courses[index].isFocus = true;
    await this.storage.set(LocalName.Courses, courses);
    this.refresh();
  }


}
