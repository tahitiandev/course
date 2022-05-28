import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { Articles } from 'src/app/models/articles';
import { Courses, Liste } from 'src/app/models/courses';
import { CreerArticleAPartirDuCodeBarreResponse } from 'src/app/models/creerArticleAPartirDuCodeBarreResponse';
import { MenuDelaSemaine } from 'src/app/models/menuDeLaSemaine';
import { Plats } from 'src/app/models/plats';
import { Setting } from 'src/app/models/setting';
import { ArticlesService } from 'src/app/services/articles.service';
import { BarreCodeService } from 'src/app/services/barre-code.service';
import { CoursesService } from 'src/app/services/courses.service';
import { MenuService } from 'src/app/services/menu.service';
import { PlatsService } from 'src/app/services/plats.service';
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
              private platsService : PlatsService,
              private utility : UtilityService,
              private menuService : MenuService) { }

  listeId : number;
  coursesDetail : Courses;
  listeArticle : Liste[]= [];
  total : number = 0;
  setting : Setting

  ngOnInit() {
    this.listeId = this.route.snapshot.params['id']
    this.getCourse()
    this.settingInit();
  }

  async settingInit(){
    const setting : Setting = await this.utility.getSettingFromLocalStorage();
    this.setting = setting;
  }
  
  async getCourse(){
    const courseDetail = await this.courseService.getCourseById(+this.listeId);
    this.coursesDetail = await courseDetail
    this.listeArticle = await courseDetail.liste;
    this.calculeTotal()
      
  }

  private async calculeTotal(){
    this.settingInit();

    const montantCourse = await this.courseService.calculeMontantTotal(this.listeArticle);
    this.total = montantCourse;  
    if(montantCourse > this.setting.budget){
      var difference = (montantCourse) - (this.setting.budget)
      this.utility.popupInformation('Vous avez dépasser votre budget de ' + difference + ' xpf')
    }
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
    this.calculeTotal();


  }

  async insertSpecialArticle(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier les données de l\'article',
      inputs: [
        {
          name: 'libelle',
          label : 'Libellé',
          placeholder : 'Libellé',
          type: 'text'
        },
        {
          name: 'isNegatif',
          placeholder : 'Montant négatif',
          type: 'checkbox'
        },
        {
          name: 'prixUnitaire',
          label : 'Prix unitaire',
          placeholder : 'Prix unitaire',
          type: 'number'
        },
        {
          name: 'quantite',
          label : 'Quantité',
          placeholder : 'Quantité',
          type: 'number'
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

            const liste : Liste = {
              articleId : null,
              libelle : data.libelle,
              quantite : data.quantite,
              prixUnitaire : data.isNegatif ? data.prixUnitaire * (-1) : data.prixUnitaire,
              actif : false
            }

            this.listeArticle.push(liste)

            const courseUpdate : Courses = await {
              id : this.coursesDetail.id,
              date : this.coursesDetail.date,
              actif : this.coursesDetail.actif,
              total : this.coursesDetail.total,
              liste : this.listeArticle,
              firebase : this.coursesDetail.firebase,
              isModified : this.coursesDetail.firebase ? true : false,
              documentId : this.coursesDetail.documentId,
              plafond : this.coursesDetail.plafond
            }

            this.courseService.updateCourseInLocalStorage(courseUpdate)
            this.calculeTotal();

          }
        }
      ]
    });

    await alert.present();

  }

  async updateArticle(data : Liste, index : number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier les données de l\'article',
      inputs: [
        {
          name: 'prixUnitaire',
          label : 'Prix unitaire',
          placeholder : 'Prix unitaire',
          type: 'number',
          value: data.prixUnitaire
        },
        {
          name: 'libelle',
          label : 'Libellé',
          placeholder : 'Libellé',
          type: 'text',
          value: data.libelle
        },
        {
          name: 'quantite',
          label : 'Quantité',
          placeholder : 'Quantité',
          type: 'number',
          id: 'name2-id',
          value: data.quantite
        },
        {
          name: 'actif',
          placeholder : 'Check',
          type: 'checkbox',
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
                  libelle : data.libelle,
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
              isModified : this.coursesDetail.firebase ? true : false,
              documentId : this.coursesDetail.documentId,
              plafond : this.coursesDetail.plafond
            }
        
            this.listeArticle = newListe
        
            this.courseService.updateCourseInLocalStorage(courseUpdate)
            this.calculeTotal();
            

          }
        }
      ]
    });

    await alert.present();
  }

  async postNewArticleInCourse(option : string){

    if(option === 'barreCode'){
      this.postArticleByBarreCode()
    }
    
    if(option === 'manuel'){
      this.postArticleManuel()
    }

    if(option === 'rafale'){
      this.postRafaleArticleByBarreCodeBarre()
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
            handler: async () => {
              await this.postArticleByBarreCode();
              await this.postRafaleArticleByBarreCodeBarre();
              await this.calculeTotal();
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
      var response : CreerArticleAPartirDuCodeBarreResponse = await this.articleService.creerArticleAPartirduBarreCode(barreCode, true)

      if(response.articleIsCreer){
        
      var articleNew : Liste = {
        articleId : response.article.code,
        libelle : response.article.libelle,
        quantite : 1,
        prixUnitaire : response.article.prix,
        prixTotal : null,
        actif : false
      }
      
      this.listeArticle.push(articleNew)
           
      const courseUpdate : Courses = await {
        id : this.coursesDetail.id,
        date : this.coursesDetail.date,
        actif : this.coursesDetail.actif,
        total : this.coursesDetail.total,
        firebase : this.coursesDetail.firebase,
        liste : this.listeArticle
      }

      this.courseService.updateCourseInLocalStorage(courseUpdate).then(async () => {

        const courses : Courses [] = await this.courseService.getCourseFromLocalStorage()
        const course : Courses = await courses.find(s => {
          return s.id === this.coursesDetail.id
        })
        this.listeArticle = []
        this.listeArticle = course.liste
        
      })
      this.calculeTotal();
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
          firebase : this.coursesDetail.firebase,
          isModified : this.coursesDetail.isModified === undefined ? null : this.coursesDetail.isModified,
          documentId : this.coursesDetail.documentId === undefined ? null : this.coursesDetail.documentId,
          plafond : this.coursesDetail.plafond === undefined ? null : this.coursesDetail.plafond,
          tag : this.coursesDetail.tag === undefined ? null : this.coursesDetail.tag,
          payeur : this.coursesDetail.payeur === undefined ? null : this.coursesDetail.payeur,
          magasin : this.coursesDetail.magasin === undefined ? null : this.coursesDetail.magasin
        }

        this.courseService.updateCourseInLocalStorage(courseUpdate).then(() => this.listeArticle = listeNew)
        this.calculeTotal();
    }
  }

  async checkArticle(){
    const barreCode = await this.barreCodeService.scanneBarreCode();
    const articleRecherche = await this.articleService.searchArticleByBarreCode(barreCode)

    if(articleRecherche != null || articleRecherche != undefined){
      const articlePresentDansLaListe =  await this.listeArticle.find(s => {
        return s.articleId === articleRecherche.code
      })

      if(articlePresentDansLaListe != null || articlePresentDansLaListe != undefined){

        articlePresentDansLaListe.actif = true

        const listeNew : Liste [] = [];

        for(let liste of this.listeArticle){
          if(liste.articleId != articlePresentDansLaListe.articleId){
            listeNew.push(liste)
          }else{
            listeNew.push(articlePresentDansLaListe)
          }
        }

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
        this.calculeTotal();
      }else{
        this.utility.popupInformation('L\'article ' + articleRecherche.libelle + ' n\'est pas présent dans la liste')
      }

    }else{
      var response : CreerArticleAPartirDuCodeBarreResponse = await this.articleService.creerArticleAPartirduBarreCode(barreCode, false)
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
      this.calculeTotal();
      }
    }

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
              firebase : this.coursesDetail.firebase,
              isModified : this.coursesDetail.isModified === undefined ? null : this.coursesDetail.isModified,
              documentId : this.coursesDetail.documentId === undefined ? null : this.coursesDetail.documentId,
              plafond : this.coursesDetail.plafond === undefined ? null : this.coursesDetail.plafond,
              tag : this.coursesDetail.tag === undefined ? null : this.coursesDetail.tag,
              payeur : this.coursesDetail.payeur === undefined ? null : this.coursesDetail.payeur,
              magasin : this.coursesDetail.magasin === undefined ? null : this.coursesDetail.magasin
            }
      
            await this.courseService.updateCourseInLocalStorage(courseUpdate)
            await this.calculeTotal();
            

          }
        }
      ]
    });

    await alert.present();
    

  } // addIngredient

  actualiser(){
    this.calculeTotal()
  }

  async insertPlat(){

    const platsBrute : Plats [] = await this.platsService.getPlatFromLocalStorage()
    const plats = await this.platsService.sortByLibelleFamilleArticle(platsBrute)
    var radioOption : AlertInput [] = [];
    
    for(let plat of plats){
      radioOption.push({
        type : 'radio',
        name : plat.libelle,
        label : plat.libelle,
        value : plat
      })
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter les ingrédients d\'un plat',
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
          handler: async (plat : Plats) => {    

            this.chooseArticle(plat)

          }
        }
      ]
    });

    await alert.present();

  }

  async chooseArticle(plat : Plats, jour? : string){

    const articlesInfo : Articles [] = await this.articleService.getArticleFromLocalStorage()
    const articlePlat : Articles [] = []

    for(let article of plat.codeArticle){
      const result = await articlesInfo.find(s => {
        return s.code === article.codeArticle
      })
      articlePlat.push(result)
    }

    var radioOption : AlertInput [] = [];
    
    for(let article of articlePlat){
      radioOption.push({
        type : 'checkbox',
        name : article.code,
        label : article.libelle,
        checked : true,
        value : article
      })
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Décocher les articles que vous ne souhaitez pas ajouter',
      inputs: radioOption,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Valider',
          handler: async (data) => {   

            for(let s of data){
              this.listeArticle.push({
                articleId : s.code,
                libelle : s.libelle,
                quantite : s.quantite,
                prixUnitaire : s.prix,
                actif : false
              }) 
            }

            const courseUpdate : Courses = await {
              id : this.coursesDetail.id,
              date : this.coursesDetail.date,
              actif : this.coursesDetail.actif,
              total : this.coursesDetail.total,
              liste : this.listeArticle,
              firebase : this.coursesDetail.firebase,
              isModified : this.coursesDetail.firebase ? true : false,
              documentId : this.coursesDetail.documentId,
              plafond : this.coursesDetail.plafond
            }

            this.courseService.updateCourseInLocalStorage(courseUpdate)
            this.calculeTotal();

          }
        }
      ]
    });

    await alert.present();

  }

  async insertMenu(){

    const menusInfo : MenuDelaSemaine [] = await this.menuService.getMenuFromLocaoStorage()
    const semaineEnCours = await this.utility.getDateDebutetDateDeFinDeSemaine()
    const index = await menusInfo.findIndex((data : MenuDelaSemaine) => {
      return data.dateDebut === semaineEnCours.dateDebut && data.dateFin === semaineEnCours.dateFin
    })

    const articlesInfo : Articles [] = await this.articleService.getArticleFromLocalStorage()
    const platSemaineEnCours : Plats [] = []
    
    if(menusInfo[index].lundi != ''){
      const plat = await this.platsService.searchPlatByLibelle(menusInfo[index].lundi)
      platSemaineEnCours.push(plat)
      this.chooseArticle(plat, 'lundi')
    }
    if(menusInfo[index].mardi != ''){
      const plat = await this.platsService.searchPlatByLibelle(menusInfo[index].mardi)
      platSemaineEnCours.push(plat)
      this.chooseArticle(plat,'mardi')
    }
    if(menusInfo[index].mercredi != ''){
      const plat = await this.platsService.searchPlatByLibelle(menusInfo[index].mercredi)
      platSemaineEnCours.push(plat)
      this.chooseArticle(plat, 'mercredi')
    }
    if(menusInfo[index].jeudi != ''){
      const plat = await this.platsService.searchPlatByLibelle(menusInfo[index].jeudi)
      platSemaineEnCours.push(plat)
      this.chooseArticle(plat, 'Jeudi')
    }
    if(menusInfo[index].vendredi != ''){
      const plat = await this.platsService.searchPlatByLibelle(menusInfo[index].vendredi)
      platSemaineEnCours.push(plat)
      this.chooseArticle(plat, 'Vendredi')
    }
    if(menusInfo[index].samedi != ''){
      const plat = await this.platsService.searchPlatByLibelle(menusInfo[index].samedi)
      platSemaineEnCours.push(plat)
      this.chooseArticle(plat, 'Samedi')
    }
    if(menusInfo[index].dimanche != ''){
      const plat = await this.platsService.searchPlatByLibelle(menusInfo[index].dimanche)
      platSemaineEnCours.push(plat)
      this.chooseArticle(plat, 'Dimanche')
    }

  }

}
