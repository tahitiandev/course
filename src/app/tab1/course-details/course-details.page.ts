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
    var newListe : Array<Liste> = []

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

    this.courseService.putCourse(courseUpdate)
    

  }

  async supprimerArticle(article : Liste){

    const index = await this.courseDetails.findIndex(s => s === article);
    this.courseDetails.splice(index, 1);

    this.course.liste = [];
    this.course.liste = this.courseDetails;

    const courses : Array<Courses> = await this.courseService.getCourses();
    const indexCourse = await courses.findIndex(s => s.id === this.course.id);
    courses[indexCourse] = this.course;

    await this.courseService.postCourses(courses);
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

            await this.courseService.postCourses(courses);
            this.calculeTotal();

          }
        }
      ]
    });

    await alert.present();

  }

  async putArticle(articleSelected : Liste, index : number) {
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
            await this.courseService.postCourses(courses);
            await this.calculeTotal();           

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

  private async postArticleByBarreCode2(){

    const barreCode = await this.barreCodeService.scanneBarreCode();
    const articles : Array<Articles> = await this.articleService.getArticles();

    const article = await articles.filter(articles =>  articles.barreCode === barreCode);

    if(article.length === 0){

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Information',
        message: 'Aucun article ne correspond au code barre : <strong>' + barreCode + '</strong>. Nous allons le créer',
        inputs : [
          {
            name: 'libelle',
            type: 'text',
            placeholder : 'Libellé'
          },
          {
            name: 'prix',
            type: 'number',
            placeholder : 'Prix'
          }
        ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.utility.popupInformation('Fin de l\'opération')
            }
          }, {
            text: 'Créer',
            handler: async (article) => {
  
              const articleNew : Articles = {
                code : (await this.articleService.generateArticleId()).toString(),
                libelle : article.libelle,
                prix : article.prix,
                quantite : 1,
                firebase : false,
                familleCode : '22',
                familleLibelle : null,
                barreCode : barreCode,
                magasin : this.course.magasin
              }

              await this.articleService.postArticle(article);

 

  
            }
          }
        ]
      });
  
      await alert.present();


    } // if

  }

  private async postArticleByBarreCode(){

      const barreCode = await this.barreCodeService.scanneBarreCode();
      const article = await this.articleService.searchArticleByBarreCode(barreCode);
      
    if(article === null || article === undefined){

      await this.articleService.postArticleByBarreCode(barreCode, true);
      const article : Articles = await this.articleService.searchArticleByBarreCode(barreCode);

      window.alert(article.libelle)
        
      var articleNew : Liste = {
        articleId : article.code,
        libelle : article.libelle,
        quantite : 1,
        prixUnitaire : article.prix,
        prixTotal : null,
        actif : false
      }
      
      this.courseDetails.push(articleNew)
      this.course.liste = this.courseDetails;

      window.alert(articleNew.libelle)

      await this.courseService.postCourse(this.course);
           
      this.calculeTotal();

    }else{

      var articleNew : Liste = {
        articleId : article.code,
        libelle : article.libelle,
        quantite : 1,
        prixUnitaire : article.prix,
        prixTotal : null,
        actif : false
      }
      
      this.courseDetails.push(articleNew)
      this.course.liste = this.courseDetails;
      await this.courseService.postCourse(this.course);
      this.calculeTotal();
    }
  }

  async checkArticle(){

    alert('methode à refaire');

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

    const articlesToLocalStorage : Array<Articles> = await this.articleService.getArticles()
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

            await this.courseService.postCourses(courses);
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

    const platsBrute : Array<Plats> = await this.platsService.getPlatFromLocalStorage()
    const plats = await this.platsService.sortByLibelleFamilleArticle(platsBrute)
    var radioOption : Array<AlertInput> = [];
    
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

    const articlesInfo : Array<Articles> = await this.articleService.getArticles();
    const articlePlat : Array<Articles> = [];

    for(let article of plat.codeArticle){
      const result = await articlesInfo.find(s => {
        return s.code === article.codeArticle
      })
      articlePlat.push(result)
    }

    var radioOption : Array<AlertInput> = [];
    
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

            this.courseService.putCourse(courseUpdate)
            this.calculeTotal();

          }
        }
      ]
    });

    await alert.present();

  }

  async insertMenu(){

    const menusInfo : Array<MenuDelaSemaine> = await this.menuService.getMenuFromLocaoStorage()
    const semaineEnCours = await this.utility.getDateDebutetDateDeFinDeSemaine()
    const index = await menusInfo.findIndex((data : MenuDelaSemaine) => {
      return data.dateDebut === semaineEnCours.dateDebut && data.dateFin === semaineEnCours.dateFin
    })

    const articlesInfo : Array<Articles> = await this.articleService.getArticles()
    const platSemaineEnCours : Array<Plats> = []
    
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
