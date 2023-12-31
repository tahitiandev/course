import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { MenuDelaSemaine } from '../models/menuDeLaSemaine';
import { Plats } from '../models/plats';
import { MenuService } from '../services/menu.service';
import { PlatsService } from '../services/plats.service';
import { UtilityService } from '../services/utility.service';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

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

  jourDelaSemaine //new

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
              private alertController : AlertController,
              private storage : Storage,
              private firebaseService : FirebaseService,
              private utility : UtilityService,
              private menuService : MenuService,
              ) { }

  ngOnInit() {
    this.initialize()
  }

  initialize(){
    this.getPlat()
    this.initForm()

    this.loadMenuOfTheWeek().then((s) => {
      this.spinner(false)
    })
    this.initPeriodeSemaine()
    this.getJourDeLaSemaine()
  }

  private getJourDeLaSemaine(){
    this.jourDelaSemaine = this.menuService.getJourDeLaSemaine()
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

  spinner(enAttente : boolean){

    const spinnerElement = document.getElementById('spinner');
    
    if(enAttente){
      spinnerElement.innerHTML = "<ion-spinner name='lines-small'></ion-spinner>";
      // spinnerElement.innerHTML = "<h1>test</h1>";
    }
    
    if(!enAttente){
      spinnerElement.innerHTML = '';
    }
  }

  // NEW
  async loadMenuOfTheWeek(){

    this.spinner(true)

    const menuDuJour : MenuDelaSemaine = await this.menuService.loadMenuOfTheWeek();

    if(menuDuJour != null){

        this.jourDelaSemaine[0][0].menu = await menuDuJour.lundi
        this.jourDelaSemaine[0][1].menu = await menuDuJour.mardi;
        this.jourDelaSemaine[1][0].menu = await menuDuJour.mercredi;
        this.jourDelaSemaine[1][1].menu = await menuDuJour.jeudi;
        this.jourDelaSemaine[2][0].menu = await menuDuJour.vendredi;
        this.jourDelaSemaine[2][1].menu = await menuDuJour.samedi;
        this.jourDelaSemaine[3][0].menu = await menuDuJour.dimanche;

        this.menuDeLaSemaine.lundi = await menuDuJour.lundi;
        this.menuDeLaSemaine.mardi = await menuDuJour.mardi;
        this.menuDeLaSemaine.mercredi = await menuDuJour.mercredi;
        this.menuDeLaSemaine.jeudi = await menuDuJour.jeudi;
        this.menuDeLaSemaine.vendredi = await menuDuJour.vendredi;
        this.menuDeLaSemaine.samedi = await menuDuJour.samedi;
        this.menuDeLaSemaine.dimanche = await menuDuJour.dimanche;
        this.menuDeLaSemaine.dateDebut = await menuDuJour.dateDebut;
        this.menuDeLaSemaine.dateFin = await menuDuJour.dateFin;
        this.menuDeLaSemaine.firebase = await menuDuJour.firebase;
        this.menuDeLaSemaine.isModified = await menuDuJour.isModified === undefined ? false : true;
        this.menuDeLaSemaine.documentId = await menuDuJour.documentId;
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
    const plats = await this.platservice.getPlats();
    this.plats = plats;
  }
  
  async getPlatByLibelle(libelle : string, jour : string){
    const result = await this.platservice.getPlatByLibelle(libelle);
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

  async loadAndSavePlatDuJour(jour : string){

    if(jour === 'lundi'){
      const selectedValue = this.lundiForm.get('plat').value
      this.getPlatByLibelle(selectedValue.libelle, jour)
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

    await this.menuService.postMenu(this.menuDeLaSemaine)

  }

  slideNext(slides){
    slides.slideNext()
  }
  slideBack(slides){
    slides.slidePrev()
  }

  // NEW
  async selectionMenuDuJour(jour : string){

    const input : AlertInput [] = []

    for(let plats of this.plats){
      await input.push({
        name : 'plats',
        type : 'radio',
        label : plats.libelle,
        value : plats
      })
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sélectionner le menu de ' + jour,
      inputs: input,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Valider',
          handler: async (response) => {

            if(jour === 'Lundi'){
              this.jourDelaSemaine[0][0].menu = response.libelle
              this.menuDeLaSemaine.lundi = response.libelle
            }
            if(jour === 'Mardi'){
              this.jourDelaSemaine[0][1].menu = response.libelle
              this.menuDeLaSemaine.mardi = response.libelle
            }
            if(jour === 'Mercredi'){
              this.jourDelaSemaine[1][0].menu = response.libelle
              this.menuDeLaSemaine.mercredi = response.libelle
            }
            if(jour === 'Jeudi'){
              this.jourDelaSemaine[1][1].menu = response.libelle
              this.menuDeLaSemaine.jeudi = response.libelle
            }
            if(jour === 'Vendredi'){
              this.jourDelaSemaine[2][0].menu = response.libelle
              this.menuDeLaSemaine.vendredi = response.libelle
            }
            if(jour === 'Samedi'){
              this.jourDelaSemaine[2][1].menu = response.libelle
              this.menuDeLaSemaine.samedi = response.libelle
            }
            if(jour === 'Dimanche'){
              this.jourDelaSemaine[3][0].menu = response.libelle
              this.menuDeLaSemaine.dimanche = response.libelle
            }
            const menus : MenuDelaSemaine [] = await this.storage.get(this.utility.localstorage['menu de la semaine'])

            // si menu déjà sur firebase
            if(this.menuDeLaSemaine.firebase){
              
              // Chargement des données
              const index = await menus.findIndex(s => {
                return s.dateDebut === this.menuDeLaSemaine.dateDebut && s.dateFin === this.menuDeLaSemaine.dateFin
              })
              
              // On modifie les données
              this.menuDeLaSemaine.isModified = true;
              menus[index] = this.menuDeLaSemaine

              this.firebaseService.postToLocalStorageDeleted(
                this.menuDeLaSemaine.firebase,
                this.utility.localstorage['menu de la semaine'],
                this.menuDeLaSemaine.documentId
              )
            }else{
              menus.push(this.menuDeLaSemaine)
            }

            const menuFromLocalstorage = await this.storage.get(this.utility.localstorage['menu de la semaine']);
            const index : number = await menuFromLocalstorage.findIndex((data : MenuDelaSemaine) => {
              return data.dateDebut === this.menuDeLaSemaine.dateDebut && data.dateFin === this.menuDeLaSemaine.dateFin
            })

            // si le localstorage n'a pas de données
            if(index === -1){
              this.storage.set(this.utility.localstorage['menu de la semaine'], menus)
            }else{
              menuFromLocalstorage[index] = this.menuDeLaSemaine
              this.storage.set(this.utility.localstorage['menu de la semaine'], menuFromLocalstorage)
            }


          }// Valider
        }
      ]
    });

    if(jour !== ''){
      await alert.present();
    }
  }


}
