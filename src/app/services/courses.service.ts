import { Injectable } from '@angular/core';
import { Courses, Liste } from 'src/app/models/courses';
import { Storage } from '@ionic/storage';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private storage : Storage,
              private utility : UtilityService) { }


  private courses : Courses[] = [
    {
      id : 1,
      date : '21/07/2021',
      actif : true,
      total : 1050,
      liste : [
        {
          articleId : '',
          libelle : '',
          quantite : 2,
          prixUnitaire : 10,
          actif : false
        }
      ],
      firebase : false,
      plafond : 150000,
    }
  ]

  private defaultData : Courses [] = [
    {
      id : 1,
      date : '2021-08-17T10:55:41.500-10:00',
      actif : true,
      total : 1050,
      liste : [
        {
          articleId : 'FLORA',
          libelle : 'test Oranges',
          quantite : 2,
          prixUnitaire : 10,
          actif : false
        }
      ],
      firebase : false,
      plafond : 150000,
    }
  ]

  async setDefaultCourseData(){
    await this.storage.set(this.utility.localstorage.Courses, this.defaultData)
  }

  async getCourseFromLocalStorage(){
    this.courses = [];
    const courses : Courses [] =  await this.storage.get(this.utility.localstorage.Courses)
    this.courses = courses
    return courses;
  }

  async getCourse(){
    return await this.courses;
  }


  async getCourseById(id : number){

    this.courses = [];
    const courses = await this.getCourseFromLocalStorage()
    this.courses = courses;

    const courseDetail = this.courses.find(s => {
      return s.id === id
    })
    return courseDetail;
  }

  async setCourseInLocalStorage(course : Courses){
    var courses : Courses [] = [];
    const coursesLS : Courses [] = await this.getCourseFromLocalStorage()

      for(let coursen of coursesLS){
        courses.push(coursen)
      }
      courses.push(course)

    this.storage.set(this.utility.localstorage.Courses, courses)


  }

  async updateCourseInLocalStorage(course : Courses){

    var coursesLS : Courses [] = await this.getCourseFromLocalStorage()
    var newData : Courses [] = [];
    
    for(let courseUnite of coursesLS){
      if(courseUnite.id != course.id){
        newData.push(courseUnite)
      }
      if(courseUnite.id === course.id){
        newData.push(course)
      }
    }

    this.storage.set(this.utility.localstorage.Courses, newData)

  }

  async generateCourseId(){

    const listeOfCourse = await this.getCourseFromLocalStorage();
    const lastId = await listeOfCourse.pop().id
    var newId = 1;

    if(lastId){
      newId = lastId + 1
    }else{
      newId = 1
    }

    return newId;
  }

  calculeMontantTotal(listes : Liste[]){
    var total = 0;
    for(let liste of listes){
      total += (liste.quantite) * (liste.prixUnitaire)
    }
    return total;
  }

  async supprimerCourse(courseSelected : Courses){
    const courses : Courses [] = await this.storage.get(this.utility.localstorage.Courses);
    const courseNew : Courses [] = []
    for(let course of courses){
      if(course.id !== courseSelected.id){
        courseNew.push(course)
      }
    }//for
    this.storage.set(this.utility.localstorage.Courses, courseNew)
    return courseNew;
  }

}
