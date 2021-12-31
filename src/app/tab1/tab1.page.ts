import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Courses } from '../models/courses';
import { CoursesService } from '../services/courses.service';
import { UtilityService } from '../services/utility.service';
import { MenuService } from '../services/menu.service';
import { Setting } from '../models/setting';

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
              private menuService : MenuService) {}

  courses : Courses[];
  public masquerLesCoursesCloture :boolean = false;
  setting : Setting;

  ngOnInit(){
    this.getCourse()
    this.settingInit()
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
    this.setting = setting;
    this.masquerLesCoursesCloture = setting.masquerLesCoursesCloture
    
  }

  async generateCourseVide(){
    const today = await this.menuService.generateDateAujourdhui()
    const date = today.annnee + '-' + today.mois + '-'+ today.jour + 'T17:32:38.956-10:00'
    // "2021-12-28T17:32:38.956-10:00"
    const courses : Courses [] = await this.coursesService.getCourseFromLocalStorage();
    const courseId = await this.coursesService.generateCourseId();
    courses.push({
      id : courseId,
      date : date,
      actif : false,
      total : 0,
      firebase : false,
      isModified : false,
      documentId : null,
      plafond : 0,
      liste : []
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
    this.setting.masquerLesCoursesCloture = !this.masquerLesCoursesCloture
    this.storage.set(this.utility.localstorage.Setting, this.setting)
    
  }

  async getCourse(){
    const coursesLS = await this.storage.get(this.utility.localstorage.Courses)
    const courses = await this.orderByDesc(coursesLS)
    this.courses = courses
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

  

  async cloturer(index : number){

    const courses = await this.storage.get(this.utility.localstorage.Courses)
    var newCourse : Courses[] = [];

    
    for(let i = 0; i < courses.length; i++){
      if(i === index){
        var add : Courses = {
          id : courses[i].id,
          date : courses[i].date,
          actif : !courses[i].actif,
          total : courses[i].total,
          liste : courses[i].liste,
          firebase : false
        }
        newCourse.push(add)
      }
      if(i !== index){
        newCourse.push(courses[i])
      }
    } // for

    this.courses = newCourse
    this.storage.set(this.utility.localstorage.Courses, newCourse)

  }

  supprimer(course : Courses){
    this.coursesService.supprimerCourse(course).then(()=> {
      this.getCourse()
    })
  }


}
