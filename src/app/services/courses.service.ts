import { Injectable } from '@angular/core';
import { Courses } from 'src/app/models/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }


  private courses : Courses[] = [
    {
      id : 1,
      date : '2021-01-06',
      actif : true,
      total : 10000,
      liste : [
        {
          articleId : 1,
          libelle : 'Oranges',
          prixUnitaire : 100,
          quantite : 10,
          prixTotal : 1000
        },
        {
          articleId : 2,
          libelle : 'Oranges',
          prixUnitaire : 100,
          quantite : 10,
          prixTotal : 1000
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
          articleId : 1,
          libelle : 'Tomates',
          prixUnitaire : 10,
          quantite : 2,
          prixTotal : 20
        },
        {
          articleId : 2,
          libelle : 'Oranges',
          prixUnitaire : 100,
          quantite : 10,
          prixTotal : 1000
        }
      ]
    },
    {
      id : 3,
      date : '2021-01-08',
      actif : false,
      total : 10000
    },
    {
      id : 4,
      date : '2021-01-06',
      actif : false,
      total : 10000
    },
  ]

  getCourse(){
    return this.courses;
  }

  getCourseById(id : number){
    const courseDetail = this.courses.find(s => {
      return s.id = id
    })
    return courseDetail;
  }








}
