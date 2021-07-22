import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/models/courses';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

  constructor(private route : ActivatedRoute,
              private courseService : CoursesService) { }

  listeId : number;
  coursesDetail : Courses;
  listeArticle : any[]= [];

  ngOnInit() {
    this.listeId = this.route.snapshot.params['id']
    this.getCourse()
  }
  
  async getCourse(){
    const courseDetail = await this.courseService.getCourseById(+this.listeId);
    this.coursesDetail = courseDetail
    this.listeArticle = courseDetail.liste;
    
  }

}
