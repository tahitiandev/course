import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { Articles } from 'src/app/models/articles';
import { Courses, Liste } from 'src/app/models/courses';
import { CreerArticleAPartirDuCodeBarreResponse } from 'src/app/models/creerArticleAPartirDuCodeBarreResponse';
import { MenuDelaSemaine } from 'src/app/models/menuDeLaSemaine';
import { Plats } from 'src/app/models/plats';
import { Settings } from 'src/app/models/setting';
import { ArticlesService } from 'src/app/services/articles.service';
import { BarreCodeService } from 'src/app/services/barre-code.service';
import { CoursesService } from 'src/app/services/courses.service';
import { MenuService } from 'src/app/services/menu.service';
import { PlatsService } from 'src/app/services/plats.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})

export class CourseDetailsPage implements OnInit {

  constructor(private storage : Storage,
              private route : ActivatedRoute,
              private courseService : CoursesService,
              private alertController: AlertController,
              private barreCodeService : BarreCodeService,
              private articleService : ArticlesService,
              private platsService : PlatsService,
              private utility : UtilityService,
              private menuService : MenuService) { }

  courseId : number;
  course : Courses;
  courseDetails : Array<Liste> = [];
  total : number = 0;
  settings : Settings

  ngOnInit() {
    this.onInit();
  }
  
  private async onInit(){

    // Init course
    const course = await this.getCourse();
    this.course = course;
    this.courseDetails = course.liste;
    
    // Init setting
    const settings = await this.settingInit();
    this.settings = settings;

  }

  private async settingInit(){
    const setting : Settings = await this.utility.getSettingFromLocalStorage();
    return setting;
  }

  private getCourseId(){
    return this.route.snapshot.params['id'];
  }
  
  private async getCourse(){
    const id = this.getCourseId();
    const courseDetail = await this.courseService.getCourseById(+id);
    
    // Init quelques données de bases (entête, détail, id)
    this.course = await courseDetail
    this.courseDetails = await courseDetail.liste;
    this.courseId = id;

    this.calculeTotal()

    return courseDetail;
  }

  private async getCourses(){
    const courses : Array<Courses> = await this.courseService.getCourses();
    return courses;
  }

  private async calculeTotal(){

    this.settingInit();

    const montantCourse = await this.courseService.calculeMontantTotal(this.courseDetails);
    this.total = montantCourse;  
    if(montantCourse > this.settings.budget){
      var difference = (montantCourse) - (this.settings.budget)
      this.utility.popupInformation('Vous avez dépasser votre budget de ' + difference + ' xpf')
    }
  }

  async clickCheckBox(index : number){

    var actifCheckBox : boolean = await this.courseDetails[index].actif
    var newListe : Liste [] = []

    for(let i = 0 ; i < this.courseDetails.length; i++){

      if(i !== index){
        newListe.push(this.courseDetails[i])
      }
      if(i === index){
        newListe.push({
          articleId : this.courseDetails[i].articleId,
          libelle : this.courseDetails[i].libelle,
          prixUnitaire : this.courseDetails[i].prixUnitaire,
          actif : !this.courseDetails[i].actif,
          quantite : this.courseDetails[i].quantite
        })
      }

    } //for
  
    const courseUpdate : Courses = await {
      id : this.course.id,
      date : this.course.date,
      actif : this.course.actif,
      total : this.course.total,
      liste : newListe,
      firebase : false,
      tag : this.course.tag,
      payeur : this.course.payeur,
      magasin : this.course.magasin,
      isModified : this.course.firebase ? true : false,
      isDeleted : this.course.isDeleted,
      documentId : this.course.documentId,
    }

    this.courseDetails = newListe

    this.courseService.updateCourseToLocalStorage(courseUpdate)
    

  }

  async supprimerArticle(article : Liste){

    const index = await this.courseDetails.findIndex(s => s === article);
    this.courseDetails.splice(index, 1)

    this.course.liste = []
    this.course.liste = this.courseDetails;

    const courses : Array<Courses> = await this.courseService.getCourses();
    const indexCourse = await courses.findIndex(s => s.id === this.course.id);
    courses[indexCourse] = this.course

    await this.storage.set(this.utility.localstorage.Courses, courses)
    this.calculeTotal();


  }
  // async supprimerArticle(index: number){

  //   var actifCheckBox : boolean = await this.listeArticle[index].actif
  //   var newListe : Liste [] = []

  //   for(let i = 0 ; i < this.listeArticle.length; i++){

  //     if(i !== index){
  //       newListe.push(this.listeArticle[i])
  //     }

  //   } //for

  //   const courseUpdate : Courses = await {
  //     id : this.coursesDetail.id,
  //     date : this.coursesDetail.date,
  //     actif : this.coursesDetail.actif,
  //     total : this.coursesDetail.total,
  //     liste : newListe,
  //     firebase : this.coursesDetail.firebase
  //   }

  //   this.listeArticle = newListe
  //   this.courseService.updateCourseInLocalStorage(courseUpdate)
  //   this.calculeTotal();


  // }

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
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Valider',
          handler: async (data) => {

            const liste : Liste = {
              articleId : null,
              libelle : data.libelle,
              quantite : data.quantite,
              prixUnitaire : data.isNegatif ? data.prixUnitaire * (-1) : data.prixUnitaire,
              actif : false
            }

            this.courseDetails.push(liste)

            const courses : Array<Courses> = await this.courseService.getCourses();
            const index = await courses.findIndex(s => s.id === this.course.id);
            courses[index].liste = this.courseDetails;
            if(courses[index].firebase){
              courses[index].isModified = true;
            }

            await this.storage.set(this.utility.localstorage.Courses, courses)

            // const courseUpdate : Courses = await {
            //   id : this.coursesDetail.id,
            //   date : this.coursesDetail.date,
            //   actif : this.coursesDetail.actif,
            //   total : this.coursesDetail.total,
            //   liste : this.listeArticle,
            //   firebase : this.coursesDetail.firebase,
            //   isModified : this.coursesDetail.firebase ? true : false,
            //   documentId : this.coursesDetail.documentId,
            //   plafond : this.coursesDetail.plafond
            // }

            // this.courseService.updateCourseInLocalStorage(courseUpdate)
            this.calculeTotal();

          }
        }
      ]
    });

    await alert.present();

  }

  async updateArticle(articleSelected : Liste, index : number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier les données de l\'article',
      inputs: [
        {
          name: 'prixUnitaire',
          label : 'Prix unitaire',
          placeholder : 'Prix unitaire',
          type: 'number',
          value: articleSelected.prixUnitaire
        },
        {
          name: 'libelle',
          label : 'Libellé',
          placeholder : 'Libellé',
          type: 'text',
          value: articleSelected.libelle
        },
        {
          name: 'quantite',
          label : 'Quantité',
          placeholder : 'Quantité',
          type: 'number',
          id: 'name2-id',
          value: articleSelected.quantite
        },
        {
          name: 'actif',
          placeholder : 'Check',
          type: 'checkbox',
          id: 'name2-id',
          checked: articleSelected.actif
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Valider',
          handler: async (data : Liste) => {

            const courses : Array<Courses> = await this.courseService.getCourses();
            const index = await courses.findIndex(s => s.id === this.course.id);

            const indexList = await this.courseDetails.findIndex(s => s === articleSelected);

            courses[index].liste[indexList].prixUnitaire = data.prixUnitaire;
            courses[index].liste[indexList].libelle = data.libelle;
            courses[index].liste[indexList].quantite = data.quantite;
            courses[index].liste[indexList].actif = data.actif;
            this.courseDetails = []
            this.courseDetails = courses[index].liste
            await this.storage.set(this.utility.localstorage.Courses, courses);
            await this.calculeTotal();
            
            // var newListe : Liste [] = []
        
            // for(let i = 0 ; i < this.listeArticle.length; i++){
        
            //   if(i !== index){
            //     newListe.push(this.listeArticle[i])
            //   }
            //   if(i === index){
            //     newListe.push({
            //       articleId : this.listeArticle[i].articleId,
            //       libelle : data.libelle,
            //       quantite : data.quantite,
            //       prixUnitaire : data.prixUnitaire,
            //       prixTotal : null,
            //       actif : data.actif,
            //     })
            //     this.articleService.verifieSiPrixDifferent(this.listeArticle[i].articleId, data.prixUnitaire)
            //   }
        
            // } //for
          
            // const courseUpdate : Courses = await {
            //   id : this.coursesDetail.id,
            //   date : this.coursesDetail.date,
            //   actif : this.coursesDetail.actif,
            //   total : this.coursesDetail.total,
            //   liste : newListe,
            //   firebase : this.coursesDetail.firebase,
            //   isModified : this.coursesDetail.firebase ? true : false,
            //   documentId : this.coursesDetail.documentId,
            //   plafond : this.coursesDetail.plafond
            // }
        
            // this.listeArticle = newListe
        
            // this.courseService.updateCourseInLocalStorage(courseUpdate)
            // this.calculeTotal();
            

          }
        }
      ]
    });

    await alert.present();
  }

  async postArticleToCourse(option : string){

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
      
      const courses : Array<Courses> = await this.courseService.getCourses();
      const index = await courses.findIndex(s => s.id === this.course.id);
      
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
      
      this.courseDetails.push(articleNew)

      this.course.liste = this.courseDetails;
      courses[index] = this.course;
      if(courses[index].firebase){
        courses[index].isModified = true;
      }
      await this.storage.set(this.utility.localstorage.Courses, courses);
           
      // const courseUpdate : Courses = await {
      //   id : this.coursesDetail.id,
      //   date : this.coursesDetail.date,
      //   actif : this.coursesDetail.actif,
      //   total : this.coursesDetail.total,
      //   firebase : this.coursesDetail.firebase,
      //   liste : this.listeArticle
      // }

      // this.courseService.updateCourseInLocalStorage(courseUpdate).then(async () => {

      //   const courses : Courses [] = await this.courseService.getCourseFromLocalStorage()
      //   const course : Courses = await courses.find(s => {
      //     return s.id === this.coursesDetail.id
      //   })
      //   this.listeArticle = []
      //   this.listeArticle = course.liste
        
      // })
      this.calculeTotal();
      }
    }else{

        this.courseDetails.push({
          articleId : article.code,
          libelle : article.libelle,
          quantite : 1,
          prixUnitaire : article.prix,
          prixTotal : null,
          actif : false
        })


      // this.coursesDetail.liste = this.listeArticle;
      // courses[index] = this.coursesDetail;
      // if(courses[index].firebase){
      //   courses[index].isModified = true;
      // }
      // await this.storage.set(this.utility.localstorage.Courses, courses);


        const listeNew : Liste [] = [];
        
        for(let liste of this.courseDetails){
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
        
        this.courseDetails = listeNew;
        
        const courseUpdate : Courses = await {
          id : this.course.id,
          date : this.course.date,
          actif : this.course.actif,
          total : this.course.total,
          liste : listeNew,
          firebase : this.course.firebase,
          isModified : this.course.isModified === undefined ? null : this.course.isModified,
          documentId : this.course.documentId === undefined ? null : this.course.documentId,
          plafond : this.course.plafond === undefined ? null : this.course.plafond,
          tag : this.course.tag === undefined ? null : this.course.tag,
          payeur : this.course.payeur === undefined ? null : this.course.payeur,
          magasin : this.course.magasin === undefined ? null : this.course.magasin,
          isDeleted : this.course.isDeleted,
        }

        this.courseService.updateCourseToLocalStorage(courseUpdate).then(() => this.courseDetails = listeNew)
        this.calculeTotal();
    }
  }

  async checkArticle(){
    const barreCode = await this.barreCodeService.scanneBarreCode();
    const articleRecherche = await this.articleService.searchArticleByBarreCode(barreCode)

    if(articleRecherche != null || articleRecherche != undefined){
      const articlePresentDansLaListe =  await this.courseDetails.find(s => {
        return s.articleId === articleRecherche.code
      })

      if(articlePresentDansLaListe != null || articlePresentDansLaListe != undefined){

        articlePresentDansLaListe.actif = true
        const courses : Array<Courses> = await this.courseService.getCourses();
        const index = await courses.findIndex(s => s.id  === this.course.id)
        const indexArtcle = await this.courseDetails.findIndex(s => s === articlePresentDansLaListe);
        courses[index].liste[indexArtcle] = articlePresentDansLaListe;
        courses[index].isModified = true;

        await this.storage.set(this.utility.localstorage.Courses, courses)

        // const listeNew : Liste [] = [];

        // for(let liste of this.listeArticle){
        //   if(liste.articleId != articlePresentDansLaListe.articleId){
        //     listeNew.push(liste)
        //   }else{
        //     listeNew.push(articlePresentDansLaListe)
        //   }
        // }

        // this.listeArticle = listeNew;
        
        // const courseUpdate : Courses = await {
        //   id : this.coursesDetail.id,
        //   date : this.coursesDetail.date,
        //   actif : this.coursesDetail.actif,
        //   total : this.coursesDetail.total,
        //   liste : listeNew,
        //   firebase : this.coursesDetail.firebase
        // }

        // this.courseService.updateCourseInLocalStorage(courseUpdate).then(() => this.listeArticle = listeNew)
        this.calculeTotal();
      }else{
        this.utility.popupInformation('L\'article ' + articleRecherche.libelle + ' n\'est pas présent dans la liste')
      }

    }else{
      var response : CreerArticleAPartirDuCodeBarreResponse = await this.articleService.creerArticleAPartirduBarreCode(barreCode, false)
      if(response.articleIsCreer){
        const listeNew : Liste [] = [];
      for(let liste of this.courseDetails){
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
      
      this.courseDetails = listeNew;
      
      const courseUpdate : Courses = await {
        id : this.course.id,
        date : this.course.date,
        actif : this.course.actif,
        total : this.course.total,
        liste : listeNew,
        firebase : this.course.firebase,
        documentId : this.course.documentId,
        isModified : this.course.firebase ? true : false,
        isDeleted : this.course.isDeleted,
        tag : this.course.tag,
        payeur : this.course.payeur,
        magasin : this.course.magasin,
      }

      this.courseService.updateCourseToLocalStorage(courseUpdate).then(() => this.courseDetails = listeNew)
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

    const articlesToLocalStorage : Array<Articles> = await this.articleService.getArticleFromLocalStorage()
    const articles = await this.sortByArticleName(articlesToLocalStorage)
    var radioOption : Array<AlertInput> = [];
    
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
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'Valider',
          handler: async (article : any) => {

            var liste : Liste = {
              articleId : article.code,
              libelle : article.libelle,
              quantite : 1,
              prixUnitaire : article.prix,
              actif : false
            }


            this.courseDetails.push(liste)
            this.course.liste = []
            this.course.liste = this.courseDetails
            this.course.isModified = true;

            const courses : Array<Courses> = await this.courseService.getCourses();
            const index = await courses.findIndex(s => s.id === this.course.id);
            courses[index].liste = this.courseDetails;
            if(courses[index].firebase){
              courses[index].isModified = true;
            }
            await this.storage.set(this.utility.localstorage.Courses, courses)

            // const listeNew : Liste [] = [];
            // for(let liste of this.listeArticle){
            //   listeNew.push(liste)
            // }
            // listeNew.push(liste)
            // this.listeArticle = listeNew

            // const courseUpdate : Courses = await {
            //   id : this.coursesDetail.id,
            //   date : this.coursesDetail.date,
            //   actif : this.coursesDetail.actif,
            //   total : this.coursesDetail.total,
            //   liste : listeNew,
            //   firebase : this.coursesDetail.firebase,
            //   isModified : this.coursesDetail.isModified === undefined ? null : this.coursesDetail.isModified,
            //   documentId : this.coursesDetail.documentId === undefined ? null : this.coursesDetail.documentId,
            //   plafond : this.coursesDetail.plafond === undefined ? null : this.coursesDetail.plafond,
            //   tag : this.coursesDetail.tag === undefined ? null : this.coursesDetail.tag,
            //   payeur : this.coursesDetail.payeur === undefined ? null : this.coursesDetail.payeur,
            //   magasin : this.coursesDetail.magasin === undefined ? null : this.coursesDetail.magasin
            // }
      
            // await this.courseService.updateCourseInLocalStorage(courseUpdate)
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

    const articlesInfo : Array<Articles> = await this.articleService.getArticleFromLocalStorage();
    const articlePlat : Array<Articles> = [];

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
              this.courseDetails.push({
                articleId : s.code,
                libelle : s.libelle,
                quantite : s.quantite,
                prixUnitaire : s.prix,
                actif : false
              }) 
            }

            const courseUpdate : Courses = await {
              id : this.course.id,
              date : this.course.date,
              actif : this.course.actif,
              total : this.course.total,
              liste : this.courseDetails,
              firebase : this.course.firebase,
              isModified : this.course.firebase ? true : false,
              documentId : this.course.documentId,
              plafond : this.course.plafond,
              isDeleted : this.course.isDeleted,
              tag : this.course.tag,
              payeur : this.course.payeur,
              magasin : this.course.magasin,
            }

            this.courseService.updateCourseToLocalStorage(courseUpdate)
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
