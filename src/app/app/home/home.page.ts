import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocalName } from 'src/app/enums/LocalName';
import { Apports } from 'src/app/models/Apports';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Courses } from 'src/app/models/Courses';
import { Depenses } from 'src/app/models/Depenses';
import { Epargnes } from 'src/app/models/Epargnes';
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { ApportsService } from 'src/app/services/apports.service';
import { BudgetsService } from 'src/app/services/budgets.service';
import { CoursesService } from 'src/app/services/courses.service';
import { DepensesService } from 'src/app/services/depenses.service';
import { EpargnesService } from 'src/app/services/epargnes.service';
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
  apports : Array<Apports> = [];
  utilisateurByDepense : Array<any> = [];
  year : any;
  day : any;
  month : any;
  isInputDateActif = false;
  budgetRestant = 0;
  budget = 0;
  totalDepense = 0;
  utilisateurConnecteLibelle = "";
  montantApportUtilisateurConnecte = 0
  epargneAll : Array<Epargnes> = [];
  epargne = 0;
  infoConexion : ConnexionInfo;

  constructor(private utility : UtilityService,
              private utilisateursService : UtilisateursService,
              private storageService : StorageService,
              private magasinservice : MagasinsService,
              private budgetsservice : BudgetsService,
              private navigate : NavController,
              private apportsservice : ApportsService,
              private epargnesservice : EpargnesService,
              private depensesservice : DepensesService,
              private coursesService : CoursesService) {   }

  async ngOnInit() {
    this.infoConexion = await this.utility.getConnexionInfo();
    await this.redirection();
    var today = this.getToday();
    this.year = today.year;
    this.day = today.day;
    this.month = today.month;
    await this.refresh();
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
    this.apports = await this.getApports();

    this.getApportUtilisateurConnecte();
    this.setBudget();
    this.getEpargneDuMoisSelectionne();
  }

  public async getEpargne(){
    return await this.epargnesservice.get();
  }

  private async getEpargneDuMoisSelectionne(){

    const epargnes = await this.getEpargne();
    const apports = await this.getApports();
    var epargneRestant = 0;

    epargnes.map(epargne => {
      epargneRestant += Number(epargne.epargne);
    })

    apports.map(apport => {
      epargneRestant -= Number(apport.apport);
    })

    this.epargne = epargneRestant;
  }

  private async getInfoConnexion(){
    return await this.utility.getConnexionInfo();
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

      if(utilisateur.groupeId === this.infoConexion.groupeId){

      this.courses.map(course => {

        var createdOn = this.utility.detecteDate(course.date);

        if(new Date(createdOn).getUTCFullYear() == this.year){
          if((new Date(createdOn).getUTCMonth() + 1) == this.month){
            if(course.payeurId === utilisateur.id){
              montantCourse += course.montantReel
            }
          } // month
        } // year

      })

      this.depenses.map(depense => {

        var createdOn = this.utility.detecteDate(depense.createdOn);

        if(new Date(createdOn).getUTCFullYear() == this.year){
          if((new Date(createdOn).getUTCMonth() + 1) == this.month){
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
      
    }//if(utilisateur.groupeId === this.infoConexion.groupeId){
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

  private async getApports(){
    return await this.apportsservice.get();
  }

  private async getApportUtilisateurConnecte(){

    const infoConnexion = await this.utility.getConnexionInfo();
    var montantApport = 0;

    this.apports.map(apport => {

      var createdOn = this.utility.detecteDate(apport.createdOn);

      if(createdOn.getUTCFullYear() == this.year){
        if((new Date(createdOn).getUTCMonth() + 1) == this.month){
          if(apport.userid == infoConnexion.utilisateurId){
            montantApport += Number(apport.apport)
          }
        } // month
      } // year

    })

    this.montantApportUtilisateurConnecte = montantApport;

  }

  private getLibelleMoisAndReturnIdMois(libelleMois : string){
    var mois = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ]
    return mois.findIndex(s => s === libelleMois) + 1;
  }

  private async getBudget(){
    return await this.budgetsservice.get();
  }

  private async setBudget(){
    const infoConnexion = await this.utility.getConnexionInfo();
    const budgets = await this.getBudget();
    var budget = 0;

    if(budgets.length > 0){

      const budgetResult = await budgets.find(async(budget) => {
        this.getLibelleMoisAndReturnIdMois(budget.mois) === this.month
      })
      budget = budgetResult.budget;
    }
    
    const libelleUtilisateurConnecte = await this.utilisateursService.getLibelleUtilisateurById(infoConnexion.utilisateurId); 

    const utilisateurByDepense = this.utilisateurByDepense;
    const depenses = await utilisateurByDepense.find(result => result.utilisateur === libelleUtilisateurConnecte);

    const totalDepense = depenses.montantCourse + depenses.montantdepense;
    const budgetRestant = budget - totalDepense + this.montantApportUtilisateurConnecte;

    this.budgetRestant = budgetRestant;
    this.budget = budget;
    this.totalDepense = totalDepense;
    this.utilisateurConnecteLibelle =libelleUtilisateurConnecte;

  }
  

}
