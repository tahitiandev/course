import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/models/Courses';
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { CoursesService } from 'src/app/services/courses.service';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  utilisateurs : Array<Utilisateurs> = [];
  courses : Array<Courses> = [];
  utilisateurByDepense : Array<any> = [];
  year : any;
  day : any;
  month : any;
  isInputDateActif = false;

  constructor(private utility : UtilityService,
              private utilisateursService : UtilisateursService,
              private coursesService : CoursesService) { 
    this.redirection();
  }

  async ngOnInit() {
    await this.refresh();
    await this.redirection();
    var today = this.getToday();
    this.year = today.year;
    this.day = today.day;
    this.month = today.month;
    await this.statsUtilisateursByDepense();
  }

  public changeDate(){
    this.isInputDateActif = !this.isInputDateActif;
  }

  private async redirection(){
    const infoConnexion = await this.utility.getConnexionInfo();
    if(!infoConnexion.isConnected){
      this.utility.navigateTo('authentification');
    }
  }

  private getToday(){
    const today = new Date();

    const day = today.getUTCDate();
    const month = today.getUTCMonth() + 1
    const year = today.getUTCFullYear();

    return {
      day : day,
      month : month,
      year : year,
      full : today.toLocaleDateString('en-GB')
    }
  }

  private async refresh(){
    this.courses = await this.getCourses();
    this.utilisateurs = await this.getUtilisateurs();
  }

  private async getUtilisateurs(){
    return (await this.utilisateursService.get()).filter(utilisateur => utilisateur.id !== 0);
  
  }
  private async getCourses(){
    return await this.coursesService.getCourse();
  }

  public statsUtilisateursByDepense(){

    var result : Array<any> = [];
    var depenses = 0
    this.utilisateurs.map(utiliateur => {
      this.courses.map(course => {
        if(new Date(course.date).getUTCFullYear() == this.year){
          if((new Date(course.date).getUTCMonth() + 1) == this.month){
            if(course.payeurId === utiliateur.id){
              depenses += course.montantReel
            }
          } // month
        } // year

      })
      result.push({
        utilisateur : utiliateur.libelle,
        depense : depenses
      })

      depenses = 0
    })

    this.utilisateurByDepense = result;
  
  }

  public async selectDateTime(datetime : any){
    this.utilisateurByDepense = [];

    var data = datetime.detail.value
    this.month = await new Date(data).getUTCMonth() + 1;
    this.year = await new Date(data).getUTCFullYear();

    await this.statsUtilisateursByDepense();
  }
  

}
