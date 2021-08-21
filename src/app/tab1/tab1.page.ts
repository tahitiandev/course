import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Courses } from '../models/courses';
import { CoursesService } from '../services/courses.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnChanges {

  constructor(private storage : Storage,
              private nav : NavController,
              private coursesService : CoursesService,
              private utility : UtilityService) {}

  courses : Courses[];

  ngOnInit(){
    this.getCourse()
  }

  ngOnChanges(changes : SimpleChanges){
    console.log(changes)
  }
  
  async getCourse(){
    const courses = await this.storage.get(this.utility.localstorage.Courses)
    this.courses = courses
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
          liste : courses[i].liste
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


}
