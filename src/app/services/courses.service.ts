import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Courses } from '../models/Courses';
import { CourseDetails } from '../models/Course-details';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private storage : StorageService) { }

  public async getCourse(){
    return await this.storage.get(LocalName.Courses);
  }

  public async postCourse(course : Courses){
    await this.storage.post(LocalName.Courses, course);
  }

  public async putCourse(course : Courses){
    await this.storage.put(LocalName.Courses, course);
  }

  public async deleteCourse(course : Courses){
    await this.storage.delete(LocalName.Courses, course);
  }

  public async getCourseById(id : number){
    const courses : Array<Courses> = await this.getCourse();
    return await courses.find(course => course.id == id);
  }

  public async getCourseDetails(courseId : number){
    const courseDetails : Array<CourseDetails> = await this.storage.get(LocalName.CourseDetails);
    return courseDetails.filter(coursedetail => coursedetail.courseId === courseId);
  }

  sortByOrdre(coursedetail : Array<CourseDetails>){
    return coursedetail.sort((a,b) => {
      let x  = a.ordre;
      let y  = b.ordre;
      if(x < y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }

  public async postCourseDetails(courseDetails : CourseDetails){

    var courseDetail : Array<CourseDetails> = await this.getCourseDetails(courseDetails.courseId);
    var courseOrderByOrdre : Array<CourseDetails> = this.sortByOrdre(courseDetail);

    if(courseOrderByOrdre.length > 0){
      var ordre = courseOrderByOrdre[courseOrderByOrdre.length - 1].ordre + 1
      courseDetails.ordre = ordre;
    }

    await this.storage.post(LocalName.CourseDetails, courseDetails);
    
  }

  public async putCourseDetails(courseDetails : CourseDetails){
    await this.storage.put(LocalName.CourseDetails, courseDetails);
  }

  public async deleteCourseDetails(courseDetails : CourseDetails){
    await this.storage.delete(LocalName.CourseDetails, courseDetails);
  }


}
