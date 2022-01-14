import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Courses, Liste } from '../models/courses';
import { CoursesService } from '../services/courses.service';
import { UtilityService } from '../services/utility.service';
import { MenuService } from '../services/menu.service';
import { Setting } from '../models/setting';
import { AlertInput } from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnChanges {

  constructor(private storage : Storage,
              private nav : NavController,
              private coursesService : CoursesService,
              private utility : UtilityService,
              private menuService : MenuService,
              private alertController : AlertController) {}

  courses : Courses[];
  public masquerLesCoursesCloture :boolean = false;
  setting : Setting;

  ngOnInit(){
    this.settingInit()
    this.getCourse()
  }

  ngOnChanges(changes : SimpleChanges){
  }
  
  private orderByDesc(course :  Courses[]){
    return course.sort((a,b) => {
      let x  = a.id;
      let y  = b.id;
      if(x < y){
        return 1;
      }else{
        return -1;
      }
      return 0;
    })
  }

  async settingInit(){
    const setting : Setting = await this.storage.get(this.utility.localstorage.Setting);
    this.setting = await setting;
    this.masquerLesCoursesCloture = await setting.masquerLesCoursesCloture
    
  }

  async generateCourseVide(){
    const today = await this.menuService.generateDateAujourdhui()
    const date = today.annnee + '-' + today.mois + '-'+ today.jour + 'T17:32:38.956-10:00'
    // "2021-12-28T17:32:38.956-10:00"
    const courses : Courses [] = await this.coursesService.getCourseFromLocalStorage();
    const courseId = await this.coursesService.generateCourseId();
    const listeVide : Liste [] = [];
    courses.push({
      id : courseId,
      date : date,
      actif : false,
      total : 0,
      firebase : false,
      isModified : false,
      documentId : null,
      plafond : 0,
      liste : listeVide
    })
    this.storage.set(this.utility.localstorage.Courses, courses).then(() => {
      this.courses = courses
      this.goDetail(courseId)
    })
  }

  async toggleShowListeDisabled(){
    this.masquerLesCoursesCloture = !this.masquerLesCoursesCloture
    if(this.masquerLesCoursesCloture){
      const courses: Courses [] = await this.coursesService.getCourseFromLocalStorage();
      const coursesNew : Courses [] = []
      for(let course of courses){
        if(!course.actif){
          coursesNew.push(course)
        }
      }
      this.courses = []
      this.courses = this.orderByDesc(coursesNew)
    }else{
      this.courses = []
      this.getCourse()
    }
    this.setting.masquerLesCoursesCloture = this.masquerLesCoursesCloture
    this.storage.set(this.utility.localstorage.Setting, this.setting)
    
  }

  async getCourse(){
    const coursesLS = await this.storage.get(this.utility.localstorage.Courses)
    const courses = await this.orderByDesc(coursesLS)
    if(this.masquerLesCoursesCloture){
      const coursesNew : Courses [] = [];
      for(let course of courses){
        if(!course.actif){
          coursesNew.push(course)
        }
        this.courses = []
        this.courses = this.orderByDesc(coursesNew)
      }
    }else{

      this.courses = courses

    }
  }

  calculeTotal(course : Courses){
    var total : number = 0;
    for(let article of course.liste){
      total += (article.prixUnitaire-0) * (article.quantite-0)
    }
    return total.toLocaleString();
  }

  goDetail(id : number){
    this.nav.navigateRoot('tabs/tab1/course-details/' + id)
  }

  goToCourseAdd(){
    this.nav.navigateRoot('tabs/tab1/course-add')
  }

  async popUpPayeur(course : Courses){

    const payeurs = await this.setting.payeurs;
    const input : AlertInput [] = [];

    for(let payeur of payeurs){
      input.push({
        name : 'payeur',
        label : payeur,
        value : payeur,
        type : 'radio'
      })
    }

    input.push({
      name: 'payeur',
      label: 'Effacer le payeur',
      value : null,
      type: 'radio'
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information',
      inputs: input,
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utility.popupInformation('L\'envoi a été annulé')
          }
        }, {
          text: 'Oui',
          handler: async (payeur) => {

            const courses : Courses [] = await this.storage.get(this.utility.localstorage.Courses)
            const index = await courses.findIndex(s => {
              return s.id === course.id
            })

            courses[index].payeur = payeur

            if(courses[index].firebase){
              courses[index].isModified = true
            }

            this.storage.set(this.utility.localstorage.Courses, courses).then(() => {
              this.getCourse()
            })
        }
        }
      ]
    });

    await alert.present()
  }

  async popUpTag(course : Courses){

    const tags = await this.setting.tags;
    const input : AlertInput [] = [];

    for(let tag of tags){
      input.push({
        name : 'tag',
        label : tag,
        value : tag,
        type : 'radio'
      })
    }

    input.push({
      name: 'tag',
      label: 'Effacer le tag',
      value : null,
      type: 'radio'
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information',
      inputs: input,
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utility.popupInformation('L\'envoi a été annulé')
          }
        }, {
          text: 'Oui',
          handler: async (tag) => {

            const courses : Courses [] = await this.storage.get(this.utility.localstorage.Courses)
            const index = await courses.findIndex(s => {
              return s.id === course.id
            })

            courses[index].tag = tag

            if(courses[index].firebase){
              courses[index].isModified = true
            }

            this.storage.set(this.utility.localstorage.Courses, courses).then(() => {
              this.getCourse()
            })
            
        }
        }
      ]
    });

    await alert.present()
  }

  async popUpMagasin(course : Courses){

    const magasins = await this.setting.magasins;
    const input : AlertInput [] = [];

    for(let magasin of magasins){
      input.push({
        name : 'magasin',
        label : magasin,
        value : magasin,
        type : 'radio'
      })
    }

    input.push({
      name: 'magasin',
      label: 'Effacer le magasin',
      value : null,
      type: 'radio'
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information',
      inputs: input,
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utility.popupInformation('L\'envoi a été annulé')
          }
        }, {
          text: 'Oui',
          handler: async (magasin) => {

            const courses : Courses [] = await this.storage.get(this.utility.localstorage.Courses)
            const index = await courses.findIndex(s => {
              return s.id === course.id
            })

            courses[index].magasin = magasin
            if(courses[index].firebase){
              courses[index].isModified = true
            }

            this.storage.set(this.utility.localstorage.Courses, courses).then(() => {
              this.getCourse()
            })
            
        }
        }
      ]
    });

    await alert.present()
  }

  async cloturer(courseSelected : Courses){

    const coursesLS = await this.storage.get(this.utility.localstorage.Courses)
    const courses = await this.orderByDesc(coursesLS)
    var courseNew : Courses [] = [];

    for(let course of courses){
      if(course.id === courseSelected.id){
        course.actif = !course.actif
        if(course.firebase){
          course.isModified = true;
        }
        courseNew.push(course)
      }else{
        courseNew.push(course)
      }
    }

    if(this.masquerLesCoursesCloture){

      const coursesActif : Courses [] = []
      for(let course of courses){
        if(!course.actif){
          coursesActif.push(course)
        }
      }
      this.courses = []
      this.courses = this.orderByDesc(coursesActif)
    }else{
      this.courses = []
      this.courses = courseNew;
      
    }

    this.storage.set(this.utility.localstorage.Courses, courseNew)

  }

  async supprimer(course : Courses){
    const courseNewList = await this.coursesService.supprimerCourse(course)
    this.courses = await []
    this.courses = await this.orderByDesc(courseNewList);
  }

}
