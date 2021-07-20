import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Courses } from '../models/courses';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private storage : Storage,
              private nav : NavController,
              private coursesService : CoursesService) {}

  courses : Courses[];

  ngOnInit(){
    this.courses = this.coursesService.getCourse();
  }

  goDetail(id : number){
    this.nav.navigateRoot('tabs/tab1/course-details/' + id)
  }

  goToCourseAdd(){
    this.nav.navigateRoot('tabs/tab1/course-add')
  }


}
