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
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  coursesall : Array<Courses> = [];
  courses : Array<Courses> = [];
  magasins : Array<Magasins> = [];
  isActif : boolean = true;
  payeurs : Array<Utilisateurs> = [];
  isAfficherCourseCloturer : boolean =  true;
  infoConnexion : ConnexionInfo;

  constructor(private coursesService : CoursesService,
              private magasinsService : MagasinsService,
              private storageService : StorageService,
              private storage : Storage,
              private firestore : FirestoreService,
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
    const payeursall : Array<Utilisateurs> = await this.getPayeurs();
    const payeurs : Array<Utilisateurs> = await payeursall.filter(payeur => payeur.groupeId === this.infoConnexion.groupeId);
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

  private async setCourse(){
    
    if(this.infoConnexion.isOnline){
      (await this.firestore.getAll(LocalName.Courses)).subscribe(async(datas : any) => {
        var coursesOnline : Array<any> = await datas.filter((data : any) => data.groupeId == this.infoConnexion.groupeId && (data.deletedOn === undefined || data.deletedOn === null));
        var courses = this.coursesService.sortByOrdreAsc(coursesOnline);
        if(this.infoConnexion.isCourseAfficher){
          this.courses = courses;
        }else{
          this.courses = courses.filter(data => data.actif);

        }
      })
    }else{
      const courses : Array<Courses> = await this.coursesService.getCourse();
      if(this.infoConnexion.isCourseAfficher){
        this.courses = courses;
      }else{
        this.courses = courses.filter(data => data.actif);
      }
    }

  }

  private async getInfoConnexion(){
    const infoConnexion = await this.utility.getConnexionInfo();
    return infoConnexion;
  }

  public async setIsAfficherCourseMasquer(){
    this.infoConnexion.isCourseAfficher = !this.infoConnexion.isCourseAfficher;
    await this.utility.putConnexionInfo(this.infoConnexion);
    await this.refresh();
  }
  
  public async refresh(){

    const infoConnexion = await this.getInfoConnexion();
    this.infoConnexion = infoConnexion;

    await this.setCourse();
    
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
          type : 'date',
          value : new Date().toISOString().slice(0, 10)
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
              isFirebase : false,
              isFocus : true,
              groupeId : this.infoConnexion.groupeId
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
    const allcourse = await this.coursesService.getCourse();
    const courses = await this.coursesService.sortByOrdreDesc(allcourse).pop();
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
    this.courses.map(courses => courses.isFocus = false);
    const index = await this.courses.findIndex(courses => course.id === courses.id);
    this.courses[index].isFocus = true;
    await this.storage.set(LocalName.Courses, this.courses);
    this.refresh();
  }


}
