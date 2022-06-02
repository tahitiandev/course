import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Articles } from 'src/app/models/articles';
import { Courses, Liste } from 'src/app/models/courses';
import { CodeArticle, Plats } from 'src/app/models/plats';
import { ArticlesService } from 'src/app/services/articles.service';
import { CoursesService } from 'src/app/services/courses.service';
import { PlatsService } from 'src/app/services/plats.service';
import { AlertController } from '@ionic/angular';
import { MenuService } from 'src/app/services/menu.service';
import { MenuDelaSemaine } from 'src/app/models/menuDeLaSemaine';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.page.html',
  styleUrls: ['./course-add.page.scss'],
})
export class CourseAddPage implements OnInit, OnChanges {

  articles : Articles [] = [];
  plats : Plats [] = [];
  platsTemp : Plats [] = [];
  courseForm : FormGroup;
  listeArticle : Articles [] = [];
  listeCodeArticle : any [] = [];
  hideSlidePlat : boolean = false;
  searchValue : string = "";
  // courseForm = new FormGroup ({
    
  // });
  constructor(private articleService : ArticlesService,
              private platsService : PlatsService,
              private formbuilder : FormBuilder,
              private coursesService : CoursesService,
              private nav :NavController,
              private alertController : AlertController,
              private menuService : MenuService) {

   }
   ngOnChanges(change : SimpleChanges){
   }

  ngOnInit() {
    this.loadData()
    this.initCourseForm()
    // this.coursesService.setTemp();
  }

  async loadData(){
    await this.getArticles();
    await this.getPlats();
  }
  
  private async getArticles(){
    const articlesLS = await this.articleService.getArticleFromLocalStorage();
    const articles = await this.articleService.sortByArticleName(articlesLS)
    this.articles = articles;
  }

  private async getPlats(){
    const platsLS = await this.platsService.getPlatFromLocalStorage();
    const plats = await this.platsService.sortByLibelleFamilleArticle(platsLS)
    this.plats = plats;
    this.platsTemp = plats;
    return plats;
  }

  initCourseForm(){
    this.courseForm = this.formbuilder.group({
      date : '',
      libelle : '',
      article : '',
      platToArticles : '',
      searchBar : ''
    })
  }

  public async filtreArticleResult(){
    const searchValues = await this.courseForm.get('searchBar').value
    const serachValue = searchValues.toLowerCase()

    const articleSearch : Articles [] = []

    const result = await this.articles.filter((articles : Articles) => {
      return articles.libelle.indexOf(serachValue) > 0
    })

    this.articles = []
    this.articles = result;
  }

  async loadOneArticle(article : Articles, index : number){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information',
      message: 'Renseigner une quantite',
      inputs: [
        {
          name: 'Quantite',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Valider',
          handler: async (res) => {
            article.quantite = res.Quantite
            this.listeArticle.push(article)

            const button = document.getElementById('testAricle-' + index)
            button.classList.add("addArticle");

          }
        }
      ]
    });

    await alert.present().then(() => {
      const firstInput: any = document.querySelector('ion-alert input');
      firstInput.focus();
      return;
    });

    
    
  }

  async loadArticle(){
    const formValue = await this.courseForm.value
    const article = await this.articleService.searchArticleByArticleCode(formValue.article)
    this.listeCodeArticle.push(formValue.article)
    this.listeArticle.push(article)
    this.courseForm.patchValue({
      article : ''
    })
  }


  async loadArticleFromOnePlat(codeArticle : CodeArticle[], index){

    // Ajout du plat demandé
    for(let article of codeArticle){
      const result = await this.articleService.searchArticleByArticleCodeForPageCourseAdd(article)
      this.listeArticle.push(result)
    }

    // Faire disparaitre le bouton d'ajout
    const button = document.getElementById('test-' + index)
    button.classList.add("addArticle");

  }


  async loadArticleFromPlat(){
    const formValue = await this.courseForm.value
    const plats = await this.platsService.searchPlatByLibelle(formValue.platToArticles)

    if(plats){
      for(let article of plats.codeArticle){
        var articleInPlat = await this.articleService.searchArticleByArticleCode(article.codeArticle)
        this.listeArticle.push(articleInPlat)
        this.listeCodeArticle.push(article)
      }
      
      this.courseForm.patchValue({
        platToArticles : ''
      })

    }

  }

  async onSubmitSlide(){

    const courseId = await this.coursesService.generateCourseId();
    const date = this.courseForm.get('date').value;
    var liste : Liste [] = [];
    
    for(let listes of this.listeArticle){
      await liste.push({
        articleId : listes.code,
        libelle : listes.libelle,
        prixUnitaire : listes.prix,
        actif : false,
        quantite : (listes.quantite === null ? 1 : listes.quantite)
      })
    }
    
    
    var coursess = await {
      id : courseId,
      date : date,
      actif : true,
      total : 1000,
      liste : liste,
      firebase : false,
      isModified : false,
      isDeleted : false,
      documentId : null,
      tag : null,
      payeur : null,
      magasin : null,
    }

    this.coursesService.postCourseToLocalStorage(coursess)

    setTimeout(() => {
      this.nav.navigateRoot('tabs/tab1/course-details/' + courseId)
    }, 1000);


  }

  async onSubmit(){

    const formValue = await this.courseForm.value;
    const codeArticle = await this.listeCodeArticle;
    var listeArticle = []
    var liste : Liste [] = [];
    var course : Courses;
    const courseId = await this.coursesService.generateCourseId()

    for(let listes of this.listeArticle){
      await liste.push({
        articleId : listes.code,
        libelle : listes.libelle,
        prixUnitaire : listes.prix,
        actif : false
      })
    }

    course = {
      id : courseId,
      date : formValue.date,
      actif : true,
      total : 1000,
      liste : liste,
      firebase : false,
      isModified : false,
      isDeleted : false,
      documentId : null,
      tag : null,
      payeur : null,
      magasin : null,
    }

    this.coursesService.postCourseToLocalStorage(course)

    this.nav.navigateRoot('tabs/tab1')

  } // onSubmit

  
  slideOpts = {
    initialSlide: 0,
    speed: 500,
    autoHeight: true
  };

  slideOff : boolean = true;

  async loadInCourseMenuDeLaSemaine(slides?){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information',
      message: 'Le menu de la semaine a bien été ajouté',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {

            const menus = await this.menuService.getMenuFromLocaoStorage();
            const lastMenu : MenuDelaSemaine = await menus.pop()
            const codeArticle : any [] = [];

            const lundi = await this.platsService.searchPlatByLibelle(lastMenu.lundi)
            if(lundi){
              for(let article of lundi.codeArticle){
                codeArticle.push(article)
              }
            }

            const mardi = await this.platsService.searchPlatByLibelle(lastMenu.mardi)
            if(mardi){
              for(let article of mardi.codeArticle){
                codeArticle.push(article)
              }
            }

            const mercredi = await this.platsService.searchPlatByLibelle(lastMenu.mercredi)
            if(mercredi){
              for(let article of mercredi.codeArticle){
                codeArticle.push(article)
              }
            }
            
            const jeudi = await this.platsService.searchPlatByLibelle(lastMenu.jeudi)
            if(jeudi){
              for(let article of jeudi.codeArticle){
                codeArticle.push(article)
              }
            }

            const vendredi = await this.platsService.searchPlatByLibelle(lastMenu.vendredi)
            if(vendredi){
              for(let article of vendredi.codeArticle){
                codeArticle.push(article)
              }
            }

            const samedi = await this.platsService.searchPlatByLibelle(lastMenu.samedi)
            if(samedi){
              for(let article of samedi.codeArticle){
                codeArticle.push(article)
              }
            }

            const dimanche = await this.platsService.searchPlatByLibelle(lastMenu.dimanche)
            if(dimanche){
              for(let article of dimanche.codeArticle){
                codeArticle.push(article)
              }
            }        
            
            for(let article of codeArticle){
              const articles = await this.articleService.searchArticleByArticleCode(article.codeArticle)
              articles.quantite = article.quantite              
              this.listeArticle.push(articles)
            }

            this.nextSlide(slides)
          }
        }
      ]
    });

    await alert.present();
  }

  async alerteInfoMessage(message : string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Information',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }



  nextSlide(slides){
    slides.slideNext()
  }

  async loadSlideListePlat(slides){
    this.hideSlidePlat = await true;
    setTimeout(() => {
      this.nextSlide(slides)
    }, 1000);
  }



  siDaterenseigneChangeSlide(slides){
    const input = document.getElementById('dateinput')
    input.addEventListener('focusin', () => {
      const dateValue = this.courseForm.get('date').value
      if(dateValue.trim() != ""){
        this.nextSlide(slides)
        input.innerHTML = "<ion-datetime (click)=\"siDaterenseigneChangeSlide(slides)\" formControlName=\"date\" placeholder=\"Cliquez ici\"></ion-datetime>"
      }
    })

  }

  async demanderQuantite(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Renseigner une quantite',
      inputs: [
        {
          name: 'Quantite',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Okay',
          handler: async () => {

          }
        }
      ]
    });

    await alert.present();
  }








}
