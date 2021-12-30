import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { Articles } from 'src/app/models/articles';
import { Courses, Liste } from 'src/app/models/courses';
import { CreerArticleAPartirDuCodeBarreResponse } from 'src/app/models/creerArticleAPartirDuCodeBarreResponse';
import { ArticlesService } from 'src/app/services/articles.service';
import { BarreCodeService } from 'src/app/services/barre-code.service';
import { CoursesService } from 'src/app/services/courses.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})

export class CourseDetailsPage implements OnInit {

  constructor(private route : ActivatedRoute,
              private courseService : CoursesService,
              private alertController: AlertController,
              private barreCodeService : BarreCodeService,
              private articleService : ArticlesService,
              private utility : UtilityService) { }

  listeId : number;
  coursesDetail : Courses;
  listeArticle : Liste[]= [];
  total : number = 0

  ngOnInit() {
    this.listeId = this.route.snapshot.params['id']
    this.getCourse()
  }
  
  async getCourse(){
    const courseDetail = await this.courseService.getCourseById(+this.listeId);
    this.coursesDetail = await courseDetail
    this.listeArticle = await courseDetail.liste;
    this.calculeTotal()
      
  }

  private async calculeTotal(){
    const montantCourse = await this.courseService.calculeMontantTotal(this.listeArticle);
    this.total = montantCourse;  
  }

  async clickCheckBox(index : number){

    var actifCheckBox : boolean = await this.listeArticle[index].actif
    var newListe : Liste [] = []

    for(let i = 0 ; i < this.listeArticle.length; i++){

      if(i !== index){
        newListe.push(this.listeArticle[i])
      }
      if(i === index){
        newListe.push({
          articleId : this.listeArticle[i].articleId,
          libelle : this.listeArticle[i].libelle,
          prixUnitaire : this.listeArticle[i].prixUnitaire,
          actif : !this.listeArticle[i].actif,
          quantite : this.listeArticle[i].quantite
        })
      }

    } //for
  
    const courseUpdate : Courses = await {
      id : this.coursesDetail.id,
      date : this.coursesDetail.date,
      actif : this.coursesDetail.actif,
      total : this.coursesDetail.total,
      liste : newListe,
      firebase : false
    }

    this.listeArticle = newListe

    this.courseService.updateCourseInLocalStorage(courseUpdate)
    

  }

  async supprimerArticle(index: number){

    var actifCheckBox : boolean = await this.listeArticle[index].actif
    var newListe : Liste [] = []

    for(let i = 0 ; i < this.listeArticle.length; i++){

      if(i !== index){
        newListe.push(this.listeArticle[i])
      }

    } //for

    const courseUpdate : Courses = await {
      id : this.coursesDetail.id,
      date : this.coursesDetail.date,
      actif : this.coursesDetail.actif,
      total : this.coursesDetail.total,
      liste : newListe,
      firebase : this.coursesDetail.firebase
    }

    this.listeArticle = newListe
    this.courseService.updateCourseInLocalStorage(courseUpdate)


  }

  async updateArticle(data : Liste, index : number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'prixUnitaire',
          type: 'text',
          value: data.prixUnitaire
        },
        {
          name: 'quantite',
          type: 'text',
          id: 'name2-id',
          value: data.quantite
        },
        {
          name: 'actif',
          type: 'text',
          id: 'name2-id',
          value: data.actif
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: async (data) => {
            
            var newListe : Liste [] = []
        
            for(let i = 0 ; i < this.listeArticle.length; i++){
        
              if(i !== index){
                newListe.push(this.listeArticle[i])
              }
              if(i === index){
                newListe.push({
                  articleId : this.listeArticle[i].articleId,
                  libelle : this.listeArticle[i].libelle,
                  quantite : data.quantite,
                  prixUnitaire : data.prixUnitaire,
                  prixTotal : null,
                  actif : data.actif,
                })
                this.articleService.verifieSiPrixDifferent(this.listeArticle[i].articleId, data.prixUnitaire)
              }
        
            } //for
          
            const courseUpdate : Courses = await {
              id : this.coursesDetail.id,
              date : this.coursesDetail.date,
              actif : this.coursesDetail.actif,
              total : this.coursesDetail.total,
              liste : newListe,
              firebase : this.coursesDetail.firebase,
              isModified : this.coursesDetail.isModified,
              documentId : this.coursesDetail.documentId,
              plafond : this.coursesDetail.plafond
            }
        
            this.listeArticle = newListe
        
            this.courseService.updateCourseInLocalStorage(courseUpdate)

          }
        }
      ]
    });

    await alert.present();
  }

  async postNewArticleInCourse(option : string){

    if(option === 'barreCode'){
      this.postArticleByBarreCode().then(() => {
        this.calculeTotal()
      })
    }
    
    if(option === 'manuel'){
      this.postArticleManuel().then(() => {
        this.calculeTotal()
      })
    }

    if(option === 'rafale'){
      this.postRafaleArticleByBarreCodeBarre().then(() => {
        this.calculeTotal()
      })
    }
  }

  private async postRafaleArticleByBarreCodeBarre(){

    var compteur = 0;
    var response : boolean = true;

    if(compteur = 0){
      this.postArticleByBarreCode()
      compteur = compteur + 1
    }else{

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Information',
        message: 'Souhaitez-vous scanner un autre article ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              response = false
              this.utility.popupInformation('Fin de l\'opération')
            }
          }, {
            text: 'Oui',
            handler: () => {
              this.postArticleByBarreCode();
              this.postRafaleArticleByBarreCodeBarre();    
            }
          }
        ]
      });

      await alert.present()
      
    }//else
  }

  private async postArticleByBarreCode(){

      const barreCode = await this.barreCodeService.scanneBarreCode();
      const article = await this.articleService.searchArticleByBarreCode(barreCode)
      
    if(article === null || article === undefined){
      var response : CreerArticleAPartirDuCodeBarreResponse = await this.articleService.creerArticleAPartirduBarreCode(barreCode)
      if(response.articleIsCreer){
        const listeNew : Liste [] = [];
      for(let liste of this.listeArticle){
        listeNew.push(liste)
      }
      var articleNew : Liste = {
        articleId : response.article.code,
        libelle : response.article.libelle,
        quantite : 1,
        prixUnitaire : response.article.prix,
        prixTotal : null,
        actif : false
      }
      
      listeNew.push(articleNew)
      
      this.listeArticle = listeNew;
      
      const courseUpdate : Courses = await {
        id : this.coursesDetail.id,
        date : this.coursesDetail.date,
        actif : this.coursesDetail.actif,
        total : this.coursesDetail.total,
        liste : listeNew,
        firebase : this.coursesDetail.firebase
      }

      this.courseService.updateCourseInLocalStorage(courseUpdate).then(() => this.listeArticle = listeNew)
      }
    }else{

      const listeNew : Liste [] = [];
      for(let liste of this.listeArticle){
        listeNew.push(liste)
      }
      var articleNew : Liste = {
        articleId : article.code,
        libelle : article.libelle,
        quantite : 1,
        prixUnitaire : article.prix,
        prixTotal : null,
        actif : false
      }
      
      listeNew.push(articleNew)
      
      this.listeArticle = listeNew;
      
      const courseUpdate : Courses = await {
        id : this.coursesDetail.id,
        date : this.coursesDetail.date,
        actif : this.coursesDetail.actif,
        total : this.coursesDetail.total,
        liste : listeNew,
        firebase : this.coursesDetail.firebase
      }

      this.courseService.updateCourseInLocalStorage(courseUpdate).then(() => this.listeArticle = listeNew)

    }//else
  }

  private sortByArticleName(articles : Array<Articles>){
    return articles.sort((a,b) => {
      let x  = a.libelle.toLowerCase();
      let y  = b.libelle.toLowerCase();
      if(x < y){
        return -1;
      }else{
        return 1;
      }
      return 0;
    })
  }

  private async postArticleManuel(){

    const articlesToLocalStorage : Articles [] = await this.articleService.getArticleFromLocalStorage()
    const articles = await this.sortByArticleName(articlesToLocalStorage)
    var radioOption : AlertInput [] = [];
    
    for(let article of articles){
      radioOption.push({
        type : 'radio',
        name : article.code,
        label : article.libelle + ' ' + article.prix + ' xpf',
        value : {
          code : article.code,
          libelle : article.libelle,
          prix : article.prix
        }
      })
    }


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sélectionner un article',
      inputs: radioOption,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Ok',
          handler: async (article : any) => {

            var liste : Liste = {
              articleId : article.code,
              libelle : article.libelle,
              quantite : 1,
              prixUnitaire : article.prix,
              actif : false
            }

            const listeNew : Liste [] = [];
            for(let liste of this.listeArticle){
              listeNew.push(liste)
            }
            listeNew.push(liste)
            this.listeArticle = listeNew

            const courseUpdate : Courses = await {
              id : this.coursesDetail.id,
              date : this.coursesDetail.date,
              actif : this.coursesDetail.actif,
              total : this.coursesDetail.total,
              liste : listeNew,
              firebase : this.coursesDetail.firebase
            }
      
            this.courseService.updateCourseInLocalStorage(courseUpdate)

          }
        }
      ]
    });

    await alert.present();

  } // addIngredient

  actualiser(){
    this.calculeTotal()
  }

}
