import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalName } from '../enums/LocalName';
import { Courses } from '../models/Courses';
import { CourseDetails } from '../models/Course-details';
import { TypeOperation } from '../enums/TypeOperation';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private storage : StorageService) { }

  public async getCourse(){
    const courses : Array<Courses> = await this.storage.get(LocalName.Courses);
    return this.sortByOrdreAsc(courses);
  }

  sortByOrdreAsc(courses : Array<Courses>){
    return courses.sort((a,b) => {
      let x  = a.ordre;
      let y  = b.ordre;
      if(x > y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }
  sortByOrdreDesc(courses : Array<Courses>){
    return courses.sort((a,b) => {
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

  public async postCourse(course : Courses){
    await this.storage.post(LocalName.Courses, course);
  }

  public async putCourse(course : Courses){
    await this.storage.put(LocalName.Courses, course);
  }

  public async putCourseByKey(key : any, montant : number, description : string){
    var courses = await this.getCourse();
    var course : any = await courses.find((course : Courses) => course.key === key);
    course.commentaire = description;
    course.montant = montant;
    await this.putCourse(course);
  }

  public async deleteCourse(course : Courses){
    await this.storage.delete(LocalName.Courses, course);
  }

  public async deleteCourseDefinitivement(course : Courses){
    await this.storage.deleteDefinitivement(LocalName.Courses, course);
  }

  public async getCourseById(id : number){
    const courses : Array<Courses> = await this.getCourse();
    return await courses.find(course => course.id == id);
  }

  public async getCourseDetails(courseId : number){
    const courseDetails : Array<CourseDetails> = await this.storage.get(LocalName.CourseDetails);
    return courseDetails.filter(coursedetail => coursedetail.courseId === courseId && coursedetail.deletedOn !== undefined);
  }

  private async generateOrdreCourse(){
    const courses = await this.getCourse();
    const coursesLast = await this.sortByOrdreDesc(courses).pop();
    return Number(coursesLast?.ordre) + 1;
  }

  public async setAllCoursesIsFocusFalse(){
    const courses : Array<Courses> = await this.getCourse();
    await courses.map(async (course) => {
      course.isFocus = false
      await this.putCourse(course);
    });
  }

  public async getCourseIsFocus(groupeid : number){
    const courses : Array<Courses> = await this.getCourse();
    const result = await courses.filter(course => course.isFocus);
    if(result.length > 0){

      return result;

    }else{
      await this.postCourse({
        id : 0,
        ordre : await this.generateOrdreCourse(),
        magasinId : 0,
        montantTheorique : 0,
        montantReel : 0,
        ecart : 0,
        date : new Date(),
        actif : true,
        isFirebase : false,
        isFocus : true,
        groupeId : groupeid
      })

      return await courses.filter(course => course.isFocus);
    }
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

  public async deleteCourseDetails(courseDetail : CourseDetails){
    await this.storage.delete(LocalName.CourseDetails, courseDetail);
  }

  public async deleteDefinitivementCourseDetails(courseDetail : CourseDetails){
    await this.storage.deleteDefinitivement(LocalName.CourseDetails, courseDetail);
  }


}
