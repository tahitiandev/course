import { Injectable } from '@angular/core';
import { Courses, Liste } from 'src/app/models/courses';
import { Storage } from '@ionic/storage';
import { UtilityService } from './utility.service';
import { FirebaseService } from './firebase.service';
import { Deleted } from '../models/deleted';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private storage : Storage,
              private utility : UtilityService,
              private firebaseService : FirebaseService) { }

  private defaultData : Array<Courses> = []

  async setDefaultCourseData(){
    await this.storage.set(this.utility.localstorage.Courses, this.defaultData)
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

  async getCourses(){
    const courses : Array<Courses> =  await this.storage.get(this.utility.localstorage.Courses);
    const courseNotDeleted : Array<Courses> = await courses.filter(course => course.isDeleted !== true);
    return this.orderByDesc(courseNotDeleted);
  }

  async getCourseById(id : number){

    const courses : Array<Courses> = await this.getCourses();
    return await courses.find(s => s.id === id);
  }

  async postCourseToLocalStorage(course : Courses){
    
    const courses : Array<Courses> = await this.getCourses();
    courses.push(course);
    await this.saveToLocalStorage(courses)

  }

  async getIndexCourse(course : Courses){
    const courses : Array<Courses> = await this.getCourses();
    return await courses.findIndex(s => s.id === course.id)
  }

  async updateCourseToLocalStorage(course : Courses){

    const courses : Array<Courses> = await this.getCourses();
    const index = await this.getIndexCourse(course);
    course[index] = course;

    await this.saveToLocalStorage(courses)

  }

  private orderByIdAsc(course :  Courses[]){
    return course.sort((a,b) => {
      let x  = a.id;
      let y  = b.id;
      if(x > y){
        return 1;
      }else{
        return -1;
      }
      return 0;
    })
  }

  async generateCourseId(){

    const listeOfCourse : Array<Courses> = await this.getCourses();

    if(listeOfCourse.length > 0){
      
      const listeOfCourseSortById = this.orderByIdAsc(listeOfCourse)
      const lastId = await listeOfCourseSortById.pop().id
      var newId = 1;
  
      if(lastId){
        newId = lastId + 1
      }else{
        newId = 1
      }
  
      return newId;
      
    }else{

      return 0;

    }

  }

  calculeMontantTotal(listes : Liste[]){
    var total = 0;
    for(let liste of listes){
      total += (liste.quantite) * (liste.prixUnitaire)
    }
    return total;
  }

  async deleteCourse(course : Courses){

    const courses : Array<Courses> = await this.getCourses();
    const index = await this.getIndexCourse(course)
    courses[index].isDeleted = true;
    // courses.splice(index,1)
    await this.saveToLocalStorage(courses)
    return await courses;
  }  
  
  async saveToLocalStorage(courses : Array<Courses>){
    await this.storage.set(this.utility.localstorage.Courses, courses);
  }

}
