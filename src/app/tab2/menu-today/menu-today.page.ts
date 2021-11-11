import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JoursDeLaSemaine } from 'src/app/enum/jours';
import { Plats } from 'src/app/models/plats';
import { PlatsService } from 'src/app/services/plats.service';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';
import { MenuDelaSemaine } from 'src/app/models/menuDeLaSemaine';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-today',
  templateUrl: './menu-today.page.html',
  styleUrls: ['./menu-today.page.scss'],
})
export class MenuTodayPage implements OnInit {


  slideOpts = {
    initialSlide: 0,
    speed: 500,
    autoHeight: true
  };

  plats : Plats [];
  
  lundiForm : FormGroup;
  mardiForm : FormGroup;
  mercrediForm : FormGroup;
  jeudiForm : FormGroup;
  vendrediForm : FormGroup;
  samediForm : FormGroup;
  dimancheForm : FormGroup;

  public menuDeLaSemaine : MenuDelaSemaine = {
    lundi : '',
    mardi : '',
    mercredi : '',
    jeudi : '',
    vendredi : '',
    samedi : '',
    dimanche : '',
    dateDebut : '',
    dateFin : '',
    firebase : false}

  constructor(private platservice : PlatsService,
              private formbuilder : FormBuilder,
              private storage : Storage,
              private utility : UtilityService,
              private menuService : MenuService) { }

  ngOnInit() {
    this.initialize()
  }

  initialize(){
    this.getPlat()
    this.initForm()
    this.loadMenuOfTheWeek()
    this.initPeriodeSemaine()
  }

  private miseEnformeDate(dateRenseigne : Date){

    var jourTmp = dateRenseigne.getDate()
    var jour = jourTmp.toString()
    if(jourTmp < 10){
      jour = '0' + jour;
    }

    var moisTmp = dateRenseigne.getMonth() + 1;
    var mois = moisTmp.toString()

    if(moisTmp < 10){
      mois = '0' + mois;
    }

    var today = jour + "/" + mois+ "/" + dateRenseigne.getFullYear();

    var infoDate = {
      'jour' : jour,
      'mois' : mois,
      'annnee' : dateRenseigne.getFullYear(),
      'dateComplete' : today
    }

    return infoDate

  }

  private ajoutOuSupprimeDesJoursDuneDate(jour : number, date : Date){

    var finDeSemaine = new Date()
    finDeSemaine.setDate(date.getDate() + jour)
    var NewFinDeSemaine = this.miseEnformeDate(finDeSemaine).dateComplete
    return NewFinDeSemaine

  }

  async initPeriodeSemaine(){

    var jourToday=new Date()
    var jourDeLaSemaine=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    const today = await this.generateDateAujourdhui()
    
    var aujourrhui = new Date(Date.parse(today.mois + '/' + today.jour + '/' + today.annnee))

    switch(jourDeLaSemaine[jourToday.getDay()]){
      case 'Lundi':
        this.menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(0,aujourrhui)
        this.menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(5,aujourrhui)
        break;
      case 'Mardi':

        this.menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-1,aujourrhui)
        this.menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(5,aujourrhui)

        break;
      case 'Mercredi':
        this.menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-2,aujourrhui)
        this.menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(4,aujourrhui)
        break;
      case 'Jeudi':
        this.menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-3,aujourrhui)
        this.menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(3,aujourrhui)
        break;
      case 'Vendredi':
        this.menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-4,aujourrhui)
        this.menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(2,aujourrhui)
        break;
      case 'Samedi':
        this.menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-5,aujourrhui)
        this.menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(1,aujourrhui)
        break;
      case 'Dimanche':
        this.menuDeLaSemaine.dateDebut = this.ajoutOuSupprimeDesJoursDuneDate(-6,aujourrhui)
        this.menuDeLaSemaine.dateFin = this.ajoutOuSupprimeDesJoursDuneDate(0,aujourrhui)
        break;
    }



  }

  private async generateDateAujourdhui(){
    var date = await new Date();

    // JOUR
    var jourTmp = date.getDate();
    var jour = jourTmp.toString()
    if(jourTmp < 10){
      jour = '0' + jour;
    }
    
    // MOIS
    var moisTmp = date.getMonth() + 1;
    var mois = moisTmp.toString()
    
    if(moisTmp < 10){
      mois = '0' + mois;
    }
    
    // DATE COMPLETE
    var today = await jour + "/" + mois+ "/" + date.getFullYear();

    var infoDate = {
      'jour' : jour,
      'mois' : mois,
      'annnee' : date.getFullYear(),
      'dateComplete' : today
    }

    return infoDate;

  }

  async loadMenuOfTheWeek(){
    const menuDuJour : MenuDelaSemaine = await this.menuService.loadMenuOfTheWeek();
    if(menuDuJour != null){
        this.menuDeLaSemaine.lundi = await menuDuJour.lundi;
        this.menuDeLaSemaine.mardi = await menuDuJour.mardi;
        this.menuDeLaSemaine.mercredi = await menuDuJour.mercredi;
        this.menuDeLaSemaine.jeudi = await menuDuJour.jeudi;
        this.menuDeLaSemaine.vendredi = await menuDuJour.vendredi;
        this.menuDeLaSemaine.samedi = await menuDuJour.samedi;
        this.menuDeLaSemaine.dimanche = await menuDuJour.dimanche;
        this.menuDeLaSemaine.dateDebut = await menuDuJour.dateDebut;
        this.menuDeLaSemaine.dateFin = await menuDuJour.dateFin;
    }
  }

  initForm(){
    this.lundiForm = this.formbuilder.group({
      plat : ''
    })
    this.mardiForm = this.formbuilder.group({
      plat : ''
    })
    this.mercrediForm = this.formbuilder.group({
      plat : ''
    })
    this.jeudiForm = this.formbuilder.group({
      plat : ''
    })
    this.vendrediForm = this.formbuilder.group({
      plat : ''
    })
    this.samediForm = this.formbuilder.group({
      plat : ''
    })
    this.dimancheForm = this.formbuilder.group({
      plat : ''
    })
  }

  async getPlat(){
    const plats = await this.platservice.getPlatFromLocalStorage();
    this.plats = plats;
  }
  
  async getPlatByLibelle(libelle : string, jour : string){
    const result = await this.platservice.searchPlatByLibelle(libelle);
    // console.log(result)
    if(jour === 'lundi'){
      this.menuDeLaSemaine.lundi = result.libelle
    }
    if(jour === 'mardi'){
      this.menuDeLaSemaine.mardi = result.libelle
    }
    if(jour === 'mercredi'){
      this.menuDeLaSemaine.mercredi = result.libelle
    }
    if(jour === 'jeudi'){
      this.menuDeLaSemaine.jeudi = result.libelle
    }
    if(jour === 'vendredi'){
      this.menuDeLaSemaine.vendredi = result.libelle
    }
    if(jour === 'samedi'){
      this.menuDeLaSemaine.samedi = result.libelle
    }
    if(jour === 'dimanche'){
      this.menuDeLaSemaine.dimanche = result.libelle
    }
  }

  async saveDataToLocalStorage(){
    await this.menuService.saveMenuToLocalStorage(this.menuDeLaSemaine)

  }

  loadAndSavePlatDuJour(jour : string){

    if(jour === 'lundi'){
      const selectedValue = this.lundiForm.get('plat').value.libelle
      // console.log(selectedValue)
      this.getPlatByLibelle(selectedValue, jour)
    }
    if(jour === 'mardi'){
      const selectedValue = this.mardiForm.get('plat').value
      this.getPlatByLibelle(selectedValue, jour)
    }
    if(jour === 'mercredi'){
      const selectedValue = this.mercrediForm.get('plat').value
      this.getPlatByLibelle(selectedValue, jour)
    }
    if(jour === 'jeudi'){
      const selectedValue = this.jeudiForm.get('plat').value
      this.getPlatByLibelle(selectedValue, jour)
    }
    if(jour === 'vendredi'){
      const selectedValue = this.vendrediForm.get('plat').value
      this.getPlatByLibelle(selectedValue, jour)
    }
    if(jour === 'samedi'){
      const selectedValue = this.samediForm.get('plat').value
      this.getPlatByLibelle(selectedValue, jour)
    }
    if(jour === 'dimanche'){
      const selectedValue = this.dimancheForm.get('plat').value
      this.getPlatByLibelle(selectedValue, jour)
    }

    this.saveDataToLocalStorage()

  }

  slideNext(slides){
    slides.slideNext()
  }
  slideBack(slides){
    slides.slidePrev()
  }

}
