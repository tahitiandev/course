import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Articles, FamilleArticle } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/articles.service';
import { BarreCodeService } from 'src/app/services/barre-code.service';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.page.html',
  styleUrls: ['./article-add.page.scss'],
})
export class ArticleAddPage implements OnInit {

  articleForm : FormGroup;
  familles : FamilleArticle [] = [];
  articlesLS : Articles [] = [];
  barreCode : string = null;

  constructor(private formbuilder : FormBuilder,
              private articleService : ArticlesService,
              private nav : NavController,
              private barrecCodeService : BarreCodeService) { }

  ngOnInit() {
    this.init()
    this.getFamilleFromLocalStorage()
  }

  init (){
    this.articleForm = this.formbuilder.group({
      familles : '',
      code : '',
      libelle : '',
      prix : ''
    })
  }

  async getFamilleFromLocalStorage(){
    const familleLS = await this.articleService.getFamilleArticleFromLocalStorage()
    const familles = await this.articleService.sortByLibelleFamilleArticle(familleLS)
    this.familles = familles
  }

  async getArticleToLocalStorage(){
    const articlesLS = await this.articleService.getArticleFromLocalStorage()
    const articles = await this.articleService.sortByArticleName(articlesLS)
    this.articlesLS = articles
  }

  async pairWithABarreCode(slide){
    const barreCode = await this.barrecCodeService.scanneBarreCode();
    this.barreCode = barreCode;
    this.slideNext(slide)
  }

  async onSubmit(){
    const formValue = await this.articleForm.value
    const newArticle : Articles = {
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
      magasin : 'Carrefour'
    }    
    
    this.articleService.setArticleRealDataToLocalStorage(newArticle)

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

  async slidetrois(slides){
    const input = await document.getElementById('slidetrois');

    input.addEventListener('focusout', async () => {

      // fonctionne pas
      const ifCodeExiste = await this.articlesLS.find((artilces) => {
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
