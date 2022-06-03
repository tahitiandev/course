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

  async postCourses(courses : Array<Courses>){

    const result = await this.utility.saveToLocalStorage(this.utility.localstorage.Courses, courses);
    return result;

  }

  async postCourse(course : Courses){
    
    const courses : Array<Courses> = await this.getCourses();
    courses.push(course);
    const result = await this.postCourses(courses)

    return result;

  }

  async getIndexCourse(course : Courses){
    const courses : Array<Courses> = await this.getCourses();
    return await courses.findIndex(s => s.id === course.id);
  }

  async putCourse(course : Courses){

    const courses : Array<Courses> = await this.getCourses();

    const ifCourseExiste = await this.searchCourseById(course);

    if(ifCourseExiste.length === 0){

      const index = await this.getIndexCourse(course);
      course[index] = course;

    }else{

      this.utility.popupInformation('La course n\'existe pas');

    }

    await this.postCourses(courses)

  }

  private async searchCourseById(course : Courses){

    const courses : Array<Courses> = await this.getCourses();
    const result = await courses.filter(courses =>  courses.id === course.id);

    return result;
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
    await this.postCourses(courses)
    return await courses;
  }  

}
