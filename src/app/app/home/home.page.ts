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
  // today : any;

  constructor(private utility : UtilityService,
              private utilisateursService : UtilisateursService,
              private coursesService : CoursesService) { 
    this.redirection();
  }

  async ngOnInit() {
    await this.refresh();
    await this.redirection();
    await this.statsUtilisateursByDepense();
    // this.today = await new Date().toISOString().split('T')[0] + 'T00:00:00';
  }

  private async redirection(){
    const infoConnexion = await this.utility.getConnexionInfo();
    if(!infoConnexion.isConnected){
      this.utility.navigateTo('authentification');
    }
  }

  private async refresh(){
    this.courses = await this.getCourses();
    this.utilisateurs = await this.getUtilisateurs();
  }

  private async getUtilisateurs(){
    return await this.utilisateursService.get();
  
  }
  private async getCourses(){
    return await this.coursesService.getCourse();
  }

  public statsUtilisateursByDepense(){

    var result : Array<any> = [];
    var depenses = 0
    this.utilisateurs.map(utiliateur => {
      this.courses.map(course => {
        if(course.payeurId === utiliateur.id){
            depenses += course.montantReel
        }
      })
      result.push({
        utilisateur : utiliateur.libelle,
        depense : depenses
      })

      depenses = 0
    })

    this.utilisateurByDepense = result;
  
  }
  

}
