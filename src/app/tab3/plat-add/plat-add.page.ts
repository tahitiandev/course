import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Articles } from 'src/app/models/articles';
import { CodeArticle, Plats } from 'src/app/models/plats';
import { ArticlesService } from 'src/app/services/articles.service';
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
              private platsService : PlatsService,
              private nav :  NavController,
              private articleService : ArticlesService,
              private alertController : AlertController
              ) {
                
               }

  articles : Articles [];
  formgroup : FormGroup;
  ingredients : any[] = [];
  ListeCodeArticle : any[] = [];
  platTmp : Plats [] = [];

  ngOnInit() {
    // this.plats.setPlatsToLocalStorage();
    this.storage.get(this.utility.localstorage.articles).then(articles => this.articles = articles)
    this.init()
  }

  init(){
    this.formgroup = this.formbuilder.group({
      libelle : '',
      ingredient : '',
      quantite : 1
      // ingredient0 : '',
      // ingredient1 : '',
      // ingredient2 : '',
      // ingredient3 : '',
      // ingredient4 : ''
    })
  }

  async loadIngredient(){
    const articleCode = await this.formgroup.get('ingredient').value
    const quantite = await this.formgroup.get('quantite').value
    const ingredientDetail = await this.articleService.searchArticleByArticleCode(articleCode)
    ingredientDetail.quantite = quantite
    await this.ingredients.push(ingredientDetail)
    await this.ListeCodeArticle.push(articleCode)
    this.formgroup.patchValue({
      ingredient : '',
      quantite : '1'
    })
    
  }

  // reset(){
  //   this.plats.setPlatsToLocalStorage();
  // }

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

  async onSubmitForm(){

    const formValues = this.formgroup.value;
    const libelle = formValues['libelle'];
    const ingredient : CodeArticle [] = []
    
    for(let ingre of this.ingredients){
      ingredient.push({
        codeArticle : ingre.code,
        quantite : ingre.quantite
      })
    }


    var plat : Plats = {
      libelle : libelle,
      codeArticle : ingredient,
      firebase : false
    }
    
    this.platsService.setPlatToLocalStorage(plat)
    this.utility.goToUrl('tab3','plats');
    
  }

  private async saveInLocalStorage(){

    const data = await this.storage.set(this.utility.localstorage.Plats, this.platTmp)
    return data;

  }

  slideOpts = {
    initialSlide: 0,
    speed: 500,
    autoHeight: true
  };

  slideNext(slides){
    slides.slideNext()
  }
  slideBack(slides){
    slides.slidePrev()
  }

  slideUn(slides){
    const input = document.getElementById('slideUn');
    input.addEventListener('focusout', () => {
      slides.slideNext()
    } )
  }

  slideDeux(slides){
    const input = document.getElementById('slideDeux');
    input.addEventListener('focusout', () => {
      slides.slideNext()
    } )
  }

  async slidetrois(slides){

    
    
    const input = await document.getElementById('slidetrois');
    input.addEventListener('focusout', async () => {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Information',
        message: 'Souhaitez-vous rajouter un nouvelle ingrédient ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              // this.loadIngredient()
              // slides.slideNext()
            }
          }, {
            text: 'Oui',
            handler: () => {
              this.loadIngredient()
              slides.slidePrev()
              slides.slidePrev()
            }
          }
        ]
      });

      await alert.present();


    } )
  } 

  slideQuatre(slides){
    const input = document.getElementById('slideQuatre');
    input.addEventListener('focusout', () => {
      slides.slideNext()
    } )
  }

  terminerSlideTrois(slides){
    this.loadIngredient()
    slides.slideNext()

  }


}
