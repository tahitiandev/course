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

    const listeOfCourse : Array<Courses> = await this.getCourseFromLocalStorage();

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

  async supprimerCourse(courseSelected : Courses){
    const courses : Courses [] = await this.storage.get(this.utility.localstorage.Courses);
    const courseNew : Courses [] = []
    for(let course of courses){
      if(course.id !== courseSelected.id){
        courseNew.push(course)
      }
      if(course.id === courseSelected.id){
        this.firebaseService.postToLocalStorageDeleted(course.firebase, this.utility.localstorage.Courses,course.documentId)
      }
    }//for
    this.storage.set(this.utility.localstorage.Courses, courseNew)
    return courseNew;
  }  

}
