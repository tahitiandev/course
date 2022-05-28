import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/models/courses';
import { CoursesService } from 'src/app/services/courses.service';
import { Storage } from '@ionic/storage';
import { Setting } from 'src/app/models/setting';
import { UtilityService } from 'src/app/services/utility.service';
import { Depenses } from 'src/app/models/depenses';

interface TotalParPayeur {
  payeur : string,
  total : number
}

interface TotalParMagasin {
  magasin : string,
  total : number
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})



export class StatsPage implements OnInit {

  courses : Array<Courses> = [];
  settings : Setting;
  payeurs;
  totalParPayeur : Array<TotalParPayeur> = [];
  totalParMagasin : Array<TotalParMagasin> = [];
  dateDebut;
  dateFin;
  depenses : Array<Depenses> = [];

  constructor(private courseService : CoursesService,
              private utility : UtilityService,
              private storage : Storage) { }

  ngOnInit() {
    this.onInit()
  }
  
  async onInit(){
    await this.getCourses();
    await this.getSettings();
    await this.getPayeurs();
    const date = await this.getDateDebutDateFinDeSemaine()
    this.dateDebut = await date.dateDebut
    this.dateFin = await date.dateFin   

    this.getTotalParPayeurParSemaine()
    this.getTotalParMagasinParSemaine()

    const depenses : Array<Depenses> = await this.getDepense();
    this.depenses = depenses;


  }

  async getCourses(){
    const courses : Array<Courses> = await this.courseService.getCourseFromLocalStorage();
    this.courses = courses;
    return await courses;
  }

  async getSettings(){
    const settings : Setting = await this.storage.get(this.utility.localstorage.Setting)
    this.settings = settings
    return await settings;
  }

  async getPayeurs(){
    this.payeurs = await this.settings.payeurs;
    return await this.payeurs
  }

  async getDepense(){
    const depenses : Array<Depenses> = await this.storage.get(this.utility.localstorage.Dépenses);
    return depenses;
  }

  getDateDebut(event){
    this.dateDebut = event.target.value
    this.getTotalParPayeurParSemaine()
    this.getTotalParMagasinParSemaine()

  }
  
  getDateFin(event){
    this.dateFin = event.target.value
    this.getTotalParPayeurParSemaine()
    this.getTotalParMagasinParSemaine()
  }

  async getTotalParPayeurParSemaine(){

    const courses = await this.getCourses();

    const result : Array<TotalParPayeur> = [];
    const payeurs = await this.settings.payeurs;
    const periodeDebut = await this.dateDebut;
    const periodeFin = await this.dateFin
    // const periodeDebut = await this.utility.parseDateStringToDateTime(this.dateDebut);
    // const periodeFin = await this.utility.parseDateStringToDateTime(this.dateFin);
    const depenses : Array<Depenses> = await this.getDepense();
    var index = 0

    for(let payeur of payeurs){

      result.push({
        payeur : payeur,
        total : 0
      })

      // 1 - dépense liée au course
      for(let course of courses){
        if(course.payeur === payeur){
          if(course.date >= periodeDebut && course.date <= periodeFin)
          // if(new Date(course.date) >= periodeDebut && new Date(course.date) <= periodeFin)
          result[index].total += course.total
        }
      } // for(course)

      // 2 - dépense liée au mouvement financier
      for(let depense of depenses){
        if(depense.payeur === payeur){
          // if(new Date(depense.date) >= periodeDebut && new Date(depense.date) <= periodeFin){
          if(depense.date >= periodeDebut && depense.date <= periodeFin){
            result[index].total += depense.montant
          }
        }
      }

      index ++

    } // for(payeur)

    this.totalParPayeur = result;
    return result

  }

  private getDateDebutDateFinDeSemaine(){
    return this.utility.getDateDebutetDateDeFinDeSemaine()
  }

  async getTotalParMagasinParSemaine(){

    const courses = await this.getCourses();
    const result : Array<TotalParMagasin> = [];
    const magasins = await this.settings.magasins;
    const periodeDebut = await this.dateDebut;
    const periodeFin = await this.dateFin
    var index = 0;

    for(let magasin of magasins){

      result.push({
        magasin : magasin,
        total : 0
      })

      for(let course of courses){
        if(course.magasin === magasin){
          if(course.date >= periodeDebut && course.date <= periodeFin)
          result[index].total += course.total
        }
      } // for(course)

      index ++

    }

    this.totalParMagasin = result;
    return result;


  }



}
