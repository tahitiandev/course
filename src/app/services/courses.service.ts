import { Injectable } from '@angular/core';
import { Courses } from 'src/app/models/courses';
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
      ]
    }
  ]

  private defaultData : Courses [] = [
    {
      id : 1,
      date : '21/07/2021',
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
      ]
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
    // if(coursesLS){
      for(let coursen of coursesLS){
        courses.push(coursen)
      }
      courses.push(course)
    // }
    this.storage.set(this.utility.localstorage.Courses, courses)

    // const newResult = await this.getCourseFromLocalStorage()
    // console.log(newResult)
  }

  async generateCourseId(){
    await this.getCourse();
    const lastId = await this.courses.pop().id
    // console.log(lastId)
    var newId = 1;
    if(lastId){
      newId = lastId + 1
    }
    return newId;
  }






}
