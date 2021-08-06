import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JoursDeLaSemaine } from 'src/app/enum/jours';
import { Plats } from 'src/app/models/plats';
import { PlatsService } from 'src/app/services/plats.service';
import { Storage } from '@ionic/storage';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-menu-today',
  templateUrl: './menu-today.page.html',
  styleUrls: ['./menu-today.page.scss'],
})
export class MenuTodayPage implements OnInit {


  slideOpts = {
    initialSlide: 0,
    speed: 100,
    autoHeight: true
  };

  plats : Plats [];
  lundi : Plats = {
    libelle : ''
  };
  mardi : Plats = {
    libelle : ''
  };
  mercredi : Plats = {
    libelle : ''
  };
  jeudi : Plats = {
    libelle : ''
  };
  vendredi : Plats = {
    libelle : ''
  };
  samedi : Plats = {
    libelle : ''
  };
  dimanche : Plats = {
    libelle : ''
  };

  lundiForm : FormGroup;
  mardiForm : FormGroup;
  mercrediForm : FormGroup;
  jeudiForm : FormGroup;
  vendrediForm : FormGroup;
  samediForm : FormGroup;
  dimancheForm : FormGroup;

  menuDeLaSemaine = {
    lundi : '',
    mardi : '',
    mercredi : '',
    jeudi : '',
    vendredi : '',
    samedi : '',
    dimanche : '',
    dateDebut : '02/08/2021',
    dateFin : '08/08/2021'}

  constructor(private platservice : PlatsService,
              private formbuilder : FormBuilder,
              private storage : Storage,
              private utility : UtilityService) { }

  ngOnInit() {
    this.getPlat()
    this.initForm()

    this.loadMenuOfTheWeek()
  }



  async loadMenuOfTheWeek(){
    
    var date = await new Date();

    var jourTmp = date.getDate();
    var jour = jourTmp.toString()
    if(jourTmp < 10){
      jour = '0' + jour;
    }

    var moisTmp = date.getMonth() + 1;
    var mois = moisTmp.toString()

    if(moisTmp < 10){
      mois = '0' + mois;
    }

    var today = jour + "/" + mois+ "/" + date.getFullYear();

    const menu = await this.storage.get('menus')
    const lastMenu = await menu.slice(-1)[0];

    // var test = '05/08/2021'

    // if(today >= lastMenu.dateDebut && today <= lastMenu.dateFin){

        this.lundi = lastMenu.lundi;
        this.mardi = lastMenu.mardi;
        this.mercredi = lastMenu.mercredi;
        this.jeudi = lastMenu.jeudi;
        this.vendredi = lastMenu.vendredi;
        this.samedi = lastMenu.samedi;
        this.dimanche = lastMenu.dimanche;
        this.dimanche = lastMenu.dimanche;
        this.dimanche = lastMenu.dimanche;

        // this.menuDeLaSemaine.lundi = lastMenu.lundi;
        // this.menuDeLaSemaine.mardi = lastMenu.mardi;
        // this.menuDeLaSemaine.mercredi = lastMenu.mercredi;
        // this.menuDeLaSemaine.jeudi = lastMenu.jeudi;
        // this.menuDeLaSemaine.vendredi = lastMenu.vendredi;
        // this.menuDeLaSemaine.samedi = lastMenu.samedi;
        // this.menuDeLaSemaine.dimanche = lastMenu.dimanche;
        // this.menuDeLaSemaine.dateDebut = lastMenu.dateDebut;
        // this.menuDeLaSemaine.dateFin = lastMenu.dateFin;

    // }






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
    if(jour === 'lundi'){
      this.lundi = result;
      this.menuDeLaSemaine.lundi = result.libelle
    }
    if(jour === 'mardi'){
      this.mardi = result;
      this.menuDeLaSemaine.mardi = result.libelle
    }
    if(jour === 'mercredi'){
      this.mercredi = result;
      this.menuDeLaSemaine.mercredi = result.libelle
    }
    if(jour === 'jeudi'){
      this.jeudi = result;
      this.menuDeLaSemaine.jeudi = result.libelle
    }
    if(jour === 'vendredi'){
      this.vendredi = result;
      this.menuDeLaSemaine.vendredi = result.libelle
    }
    if(jour === 'samedi'){
      this.samedi = result;
      this.menuDeLaSemaine.samedi = result.libelle
    }
    if(jour === 'dimanche'){
      this.dimanche = result;
      this.menuDeLaSemaine.dimanche = result.libelle
    }
  }

  saveDataToLocalStorage(){
    var menuDeLaSemaine = {
      lundi : this.lundi,
      mardi : this.mardi,
      mercredi : this.mercredi,
      jeudi : this.jeudi,
      vendredi : this.vendredi,
      samedi : this.samedi,
      dimanche : this.dimanche,
      dateDebut : '02/08/2021',
      dateFin : '08/08/2021'
    }

    this.storage.set(this.utility.localstorage['menu de la semaine'], this.menuDeLaSemaine)

  }

  loadAndSavePlatDuJour(jour : string){

    if(jour === 'lundi'){
      const selectedValue = this.lundiForm.get('plat').value
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


}
