import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocalName } from 'src/app/enums/LocalName';
import { Courses } from 'src/app/models/Courses';
import { Depenses } from 'src/app/models/Depenses';
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { CoursesService } from 'src/app/services/courses.service';
import { DepensesService } from 'src/app/services/depenses.service';
import { MagasinsService } from 'src/app/services/magasins.service';
import { StorageService } from 'src/app/services/storage.service';
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
  depenses : Array<Depenses> = [];
  utilisateurByDepense : Array<any> = [];
  year : any;
  day : any;
  month : any;
  isInputDateActif = false;
  budgetRestant = 0;
  budget = 0;
  totalDepense = 0;
  utilisateurConnecteLibelle = "";

  constructor(private utility : UtilityService,
              private utilisateursService : UtilisateursService,
              private storageService : StorageService,
              private magasinservice : MagasinsService,
              private navigate : NavController,
              private depensesservice : DepensesService,
              private coursesService : CoursesService) {   }

  async ngOnInit() {
    await this.refresh();
    await this.redirection();
    var today = this.getToday();
    this.year = today.year;
    this.day = today.day;
    this.month = today.month;
    await this.statsUtilisateursByDepense();
  }

  public handleRefresh(event : any) {
    this.storageService.synchroniserAvecFirestore().then(async()=> {
      event.target.complete()
      location.reload();
      await this.utility.popUp('Synchronisation complète terminée')
    })
  }

  public changeDate(){
    this.isInputDateActif = !this.isInputDateActif;
  }

  public getLibelleMois(index : number){
    const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    return monthNames[index];
  }

  private async redirection(){
    const infoConnexion = await this.utility.getConnexionInfo();
    if(!infoConnexion.isConnected){
      this.navigate.navigateRoot('authentification')
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
    this.depenses = await this.getDepenses();

    this.setBudget();
  }

  private async getUtilisateurs(){
    return (await this.utilisateursService.get()).filter(utilisateur => utilisateur.id !== 0);
  
  }
  private async getCourses(){
    return await this.coursesService.getCourse();
  
  }
  private async getDepenses(){
    return await this.depensesservice.get();
  }

  public statsUtilisateursByDepense(){

    var result : Array<any> = [];
    var montantCourse = 0
    var montantDepense = 0
    this.utilisateurs.map(utilisateur => {

      this.courses.map(course => {
        if(new Date(course.date).getUTCFullYear() == this.year){
          if((new Date(course.date).getUTCMonth() + 1) == this.month){
            if(course.payeurId === utilisateur.id){
              montantCourse += course.montantReel
            }
          } // month
        } // year

      })

      this.depenses.map(depense => {
        if(new Date(depense.createdOn).getUTCFullYear() == this.year){
          if((new Date(depense.createdOn).getUTCMonth() + 1) == this.month){
            if(depense.userid === utilisateur.id){
              montantDepense += Number(depense.depense)
            }
          } // month
        } // year

      })

      result.push({
        utilisateur : utilisateur.libelle,
        montantCourse : montantCourse,
        montantdepense : montantDepense
      })

      montantCourse = 0
      montantDepense = 0
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

  public async statistiquePayeurByMagasin(){
    const utilisateurs = this.utilisateurs;
    const magasins = await this.magasinservice.get();
    const courses = this.courses;
    var depense = 0;
    var result = []

    courses.map(course => {
      utilisateurs.map(utilisateur => {
        if(course.payeurId === utilisateur.id){
          magasins.map(magasin => {
            if(magasin.id === course.magasinId){
              depense += course.montantReel;
            }
          })//magasin
        }
      })//utilisateur
    })//course

  }

  private async setBudget(){
    const infoConnexion = await this.utility.getConnexionInfo();
    const budget = infoConnexion.budget;

    const libelleUtilisateurConnecte = await this.utilisateursService.getLibelleUtilisateurById(infoConnexion.utilisateurId); 

    const utilisateurByDepense = this.utilisateurByDepense;
    const depenses = await utilisateurByDepense.find(result => result.utilisateur === libelleUtilisateurConnecte);

    const totalDepense = depenses.montantCourse + depenses.montantdepense;
    const budgetRestant = infoConnexion.budget - totalDepense;

    this.budgetRestant = budgetRestant;
    this.budget = budget;
    this.totalDepense = totalDepense;
    this.utilisateurConnecteLibelle =libelleUtilisateurConnecte;


    // return {
    //   budget : budget,
    //   totalDepense : totalDepense,
    //   budgetRestant : budgetRestant
    // };
  }
  

}
