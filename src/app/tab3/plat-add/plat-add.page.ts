import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Articles } from 'src/app/models/articles';
import { Plats } from 'src/app/models/plats';
import { PlatsService } from 'src/app/services/plats.service';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-plat-add',
  templateUrl: './plat-add.page.html',
  styleUrls: ['./plat-add.page.scss'],
})
export class PlatAddPage implements OnInit {

  constructor(private storage : Storage,
              private utility : UtilityService,
              private formbuilder : FormBuilder,
              private plats : PlatsService,
              private nav :  NavController
              ) {
                
               }

  articles : Articles [];
  formgroup : FormGroup;

  ngOnInit() {
    // this.plats.setPlatsToLocalStorage();
    this.storage.get(this.utility.localstorage.articles).then(articles => this.articles = articles)
    this.init()
  }

  init(){
    this.formgroup = this.formbuilder.group({
      libelle : '',
      ingredient0 : '',
      ingredient1 : '',
      ingredient2 : '',
      ingredient3 : '',
      ingredient4 : ''
    })
  }

  reset(){
    this.plats.setPlatsToLocalStorage();
  }

  ajouterIngredient(){

    var nbClick = 0;
    var div = document.getElementById('newInput')
    var ionSelectStart = '<ion-item><ion-label position="floating">Sélectionner les ingrédients</ion-label><ion-select formControlName="ingredient'+i+'">';
    var ionSelectEnd = '</ion-select></ion-item><br>';
    var ionOption = '';

    for(var i = 0; i < this.articles.length; i++){
      ionOption += '<ion-select-option [value]="'+ this.articles[i].code +'">' + this.articles[i].libelle + '</ion-select-option>';
    }

    div.innerHTML += ionSelectStart + ionOption + ionSelectEnd

  }

  consoleLogPlat(){
    this.storage.get('plats').then(s => console.log(s))
  }

  platTmp : Plats [] = [];
  
  consoleLogPlatTmp(){
    console.log(this.platTmp)
  }


  async onSubmitForm(){

      const formValues = this.formgroup.value;
      const libelle = formValues['libelle'];
      var ingredients = [];
      var plats : Plats[] = []

      // Ajouter les ingrédients
      for(var i = 0; i < 4; i++){
        if(formValues['ingredient'+i]){
          await ingredients.push(formValues['ingredient'+i])
        }
      }//for

      // Initialise la variable plats avec celle du localstorage
      const platsLS = await this.storage.get(this.utility.localstorage.Plats)
      for(let plat of platsLS){
        await this.platTmp.push(plat)
      }
      
      // Rajoute le nouveau plat
      this.platTmp.push({
        libelle : libelle,
        codeArticle : ingredients
      })
      
      // this.storage.set('plats', plats).then(()=>{
      //   this.storage.get('plats').then(s => console.log(s))
      // }
      // );

      this.saveInLocalStorage()

      this.utility.goToUrl('tab3','plats');
    
  }

  private async saveInLocalStorage(){

    const data = await this.storage.set(this.utility.localstorage.Plats, this.platTmp)
    return data;

  }

}
