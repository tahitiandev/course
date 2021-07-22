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
      date : '2021-01-06',
      actif : true,
      total : 10000,
      liste : [
        {
          articleId : '1',
          libelle : 'Oranges',
          prixUnitaire : 100,
          quantite : 10,
          prixTotal : 1000,
          actif : false,
        },
        {
          articleId : '2',
          libelle : 'Oranges',
          prixUnitaire : 100,
          quantite : 10,
          prixTotal : 1000,
          actif : false,
        }
      ]
    },
    {
      id : 2,
      date : '2021-01-07',
      actif : true,
      total : 10000,
      liste : [
        {
          articleId : '1',
          libelle : 'Tomates',
          prixUnitaire : 10,
          quantite : 2,
          prixTotal : 20,
          actif : false,
        },
        {
          articleId : '2',
          libelle : 'Oranges',
          prixUnitaire : 100,
          quantite : 10,
          prixTotal : 1000,
          actif : false,
        }
      ]
    }
  ]

  async setDefaultCourseData(){
    await this.storage.set(this.utility.localstorage.Courses,this.courses)
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
    var newId = 1;
    if(lastId){
      newId = lastId + 1
    }
    return newId;
  }






}
