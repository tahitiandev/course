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


}
