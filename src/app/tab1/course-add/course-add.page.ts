import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Articles } from 'src/app/models/articles';
import { Courses, Liste } from 'src/app/models/courses';
import { Plats } from 'src/app/models/plats';
import { ArticlesService } from 'src/app/services/articles.service';
import { CoursesService } from 'src/app/services/courses.service';
import { PlatsService } from 'src/app/services/plats.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.page.html',
  styleUrls: ['./course-add.page.scss'],
})
export class CourseAddPage implements OnInit {

  articles : Articles [] = [];
  plats : Plats [] = [];
  courseForm : FormGroup;
  listeArticle : Articles [] = [];
  listeCodeArticle : any [] = [];
  hideSlidePlat : boolean = false;
  // courseForm = new FormGroup ({
    
  // });
  constructor(private articleService : ArticlesService,
              private platsService : PlatsService,
              private formbuilder : FormBuilder,
              private coursesService : CoursesService,
              private nav :NavController,
              private alertController : AlertController) {

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
    const articles = await this.articleService.getArticleFromLocalStorage();
    this.articles = articles;
  }

  private async getPlats(){
    const plats = await this.platsService.getPlatFromLocalStorage();
    this.plats = plats;
  }

  initCourseForm(){
    this.courseForm = this.formbuilder.group({
      date : '',
      libelle : '',
      article : '',
      platToArticles : ''
    })
  }

  loadOneArticle(article : Articles){

    this.listeArticle.push(article)
    
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


  async loadArticleFromOnePlat(codeArticle : any[]){
    
    for(let article of codeArticle){
      const articles = await this.articleService.searchArticleByArticleCode(article)
      this.listeArticle.push(articles)
    }

  }


  async loadArticleFromPlat(){
    const formValue = await this.courseForm.value
    const plats = await this.platsService.searchPlatByLibelle(formValue.platToArticles)

    if(plats){
      for(let article of plats.codeArticle){
        var articleInPlat = await this.articleService.searchArticleByArticleCode(article)
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
        actif : false
      })
    }

    var coursess = await {
      id : courseId,
      date : date,
      actif : true,
      total : 1000,
      liste : liste
    }

    this.coursesService.setCourseInLocalStorage(coursess)

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
      liste : liste
    }

    this.coursesService.setCourseInLocalStorage(course)

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
          handler: () => {
            this.nextSlide(slides)
          }
        }
      ]
    });

    await alert.present();
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
  

}
