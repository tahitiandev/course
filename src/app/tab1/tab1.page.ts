import { Component, OnInit, SimpleChanges } from '@angular/core';
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
export class Tab1Page implements OnInit {

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
    this.onInit()
  }
  
  async onInit(){

    const setting = await this.settingInit()
    this.setting = await setting;
    this.masquerLesCoursesCloture = await setting.masquerLesCoursesCloture

    this.getCourse()
    this.majTotalGeneral()
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
    return setting
    
  }

  async listeDesMagasins(){

    const magasins = await this.setting.magasins;

    const input : AlertInput [] = []

    magasins.map(magasin => {
      input.push({
        name : 'magasin',
        type : 'radio',
        label : magasin,
        value : magasin
      })
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Liste des magasins',
      inputs: input,
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
          handler: async (magasin) => {

            this.generateCourseVide(magasin)
              
          }
        }
        
      ]
    });

    await alert.present();
  }

  async generateCourseVide(magasin){

    const today = await this.menuService.generateDateAujourdhui()
    const date = today.annnee + '-' + today.mois + '-'+ today.jour + 'T17:32:38.956-10:00'
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
      liste : listeVide,
      magasin : magasin
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
      const courseActif : Courses [] = await courses.filter(course => course.actif === false)
        this.courses = []
        this.courses = this.orderByDesc(courseActif)
    }else{

      this.courses = courses

    }
    return await courses;
  }

  calculeTotal(course : Courses){
    var total : number = 0;
    course.liste.map(article => total += (article.prixUnitaire-0) * (article.quantite-0))
    return total.toLocaleString();
  }

  private calculeTotalReturnInt(course : Courses){
    var total : number = 0;
    course.liste.map(article => total += (article.prixUnitaire-0) * (article.quantite-0))
    return total;
  }

  async majTotalGeneral(){
    const courses : Courses[] = await this.getCourse();
    courses.map(course => course.total = this.calculeTotalReturnInt(course))
    this.storage.set(this.utility.localstorage.Courses, courses)
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

    payeurs.map(payeur => {
      input.push({
        name : 'payeur',
        label : payeur,
        value : payeur,
        type : 'radio'
      })
    })

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

    tags.map(tag => {
      input.push({
        name : 'tag',
        label : tag,
        value : tag,
        type : 'radio'
      })
    })

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

    const courses : Array<Courses> = await this.storage.get(this.utility.localstorage.Courses)
    const index = await courses.findIndex(s => {
      return s.id === courseSelected.id
    })

    courses[index].actif = !courses[index].actif

    if(courses[index].firebase){
      courses[index].isModified = true;
    }

    if(this.masquerLesCoursesCloture){

      const coursesActif : Array<Courses> = []
      for(let course of courses){
        if(!course.actif){
          coursesActif.push(course)
        }
      }
      this.courses = []
      this.courses = this.orderByDesc(coursesActif)
    }else{
      
      this.courses = []
      this.courses = this.orderByDesc(courses)
      
    }

    this.storage.set(this.utility.localstorage.Courses, courses)

  }

  async supprimer(course : Courses){
    const courseNewList = await this.coursesService.supprimerCourse(course)
    this.courses = await []
    this.courses = await this.orderByDesc(courseNewList);
  }

}
