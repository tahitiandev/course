import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Articles, Familles } from 'src/app/models/articles';
import { Settings } from 'src/app/models/setting';
import { ArticlesService } from 'src/app/services/articles.service';
import { BarreCodeService } from 'src/app/services/barre-code.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.page.html',
  styleUrls: ['./article-add.page.scss'],
})
export class ArticleAddPage implements OnInit {

  articleForm : FormGroup;
  familles : Array<Familles> = [];
  articles : Array<Articles> = [];
  barreCode : string = null;
  settings : Settings;
  magasins;

  constructor(private formbuilder : FormBuilder,
              private articleService : ArticlesService,
              private nav : NavController,
              private barrecCodeService : BarreCodeService,
              private utility : UtilityService) { }

  ngOnInit() {
    
    this.initFormulaire();
    this.onInit();
  }

  private async onInit(){

    const settings = this.getSettings();
    this.settings = await settings;
    this.magasins = (await settings).magasins;

    this.getFamilles();

    const familles = await this.getFamilles();
    this.familles = this.articleService.orderByLibelleFamille(familles);

    const articles = await this.getArticles();
    this.articles = articles;

  }

  initFormulaire (){
    this.articleForm = this.formbuilder.group({
      familles : '',
      code : '',
      libelle : '',
      prix : '',
      magasins : ''
    })
  }

  private async getSettings(){
    const settings = await this.utility.getSetting();
    return settings;
  }

  async getFamilles(){
    const familles : Array<Familles> = await this.articleService.getFamilles();
    return  familles;
  }

  async getArticles(){

    const articles : Array<Articles> = await this.articleService.getArticles();
    return articles;

  }

  async pairWithABarreCode(slide){
    const barreCode = await this.barrecCodeService.scanneBarreCode();
    this.barreCode = barreCode;
    this.slideNext(slide)
  }

  async onSubmit(){
    const formValue = await this.articleForm.value
    const setting : Settings = await this.utility.getSetting();

    const article : Articles = {
      code : (await this.articleService.generateArticleId()).toString(),
      libelle : formValue.libelle,
      prix : formValue.prix ,
      prixModifier : null,
      quantite : 1,
      firebase : false,
      isModified : false,
      documentId : null,
      familleCode : formValue.familles,
      familleLibelle : null,
      barreCode : this.barreCode,
      magasin : formValue.magasins,
      PrixMagasin : [
        {
          magasin : formValue.magasins,
          prix : formValue.prix
        }
      ]
    } 
    
    await this.articleService.postArticle(article);


    this.nav.back()

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
    slides.slideBack()
  }

  slideUn(slides){
    const input = document.getElementById('slideUn');
    input.addEventListener('focusout', () => {
      slides.slideNext()
    } )
  }

  slideDeux(slides){
    const input = document.getElementById('slideDeux');
    input.addEventListener('focusin', () => {
      slides.slideNext()
    } )
  }

  slideCinq(slides){
    const input = document.getElementById('slideCinq');
    input.addEventListener('focusin', () => {
      slides.slideNext()
    } )
  }

  async slidetrois(slides){
    const input = await document.getElementById('slidetrois');

    input.addEventListener('focusout', async () => {

      // fonctionne pas
      const ifCodeExiste = await this.articles.find((artilces) => {
        return artilces.code.substring(3, artilces.code.length - 3) === this.articleForm.get('code').value
      })
  
      if(ifCodeExiste){ // fonctionne pas
        alert('Ce code existe déjà')
        this.articleForm.patchValue({
          code : ''
        })
      }else{
        slides.slideNext()
      }
    })
  }

  slideQuatre(slides){
    const input = document.getElementById('slideQuatre');
    input.addEventListener('focusout', () => {
      slides.slideNext()
    } )
  }
  

}
