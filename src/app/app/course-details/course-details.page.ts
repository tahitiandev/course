import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput, AlertOptions, IonicModule } from '@ionic/angular';
import { CoursesService } from '../../services/courses.service';
import { Courses } from '../../models/Courses';
import { ActivatedRoute } from '@angular/router';
import { CourseDetails } from '../../models/Course-details';
import { ArticlesService } from '../../services/articles.service';
import { Articles } from '../../models/Articles';
import { UtilityService } from '../../services/utility.service';
import { BarreCodeService } from 'src/app/services/barre-code.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

  courseid : number = 0;
  totalCourse : number = 0;
  course : Courses = {
    id : 0,
    ordre : 0,
    magasinId : 1,
    montantTheorique : 0,
    montantReel : 0,
    ecart : 0,
    date : new Date(),
    actif : true,
    isFirebase : false
  };
  coursedetails : Array<CourseDetails> = [];
  articles : Array<Articles> = [];
  content_visibility = '';
  rechercheAvance : boolean = false;

  constructor(private coursesService : CoursesService,
              private alertController : AlertController,
              private articleservice : ArticlesService,
              private utility : UtilityService,
              private codeBarre : BarreCodeService,
              private articlesService : ArticlesService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.refresh();
  }

  public async scanne(){
    const visibilityStart = await this.codeBarre.STEP1EnableCameraReturnVisility();
    this.content_visibility = visibilityStart;
    const barreCodeContent = await this.codeBarre.STEP2ScanneBarCodeAndReturnContent();
    const visibilityEnd = await this.codeBarre.STEP3disableCameraReturnVisility();
    this.content_visibility = visibilityEnd;
    // alert(barreCodeContent)
    return barreCodeContent;
  }

  public async postArticleWithBarCode(){

    const codeBarre = await this.scanne();
    const article : Array<Articles> = await this.articleservice.getArticleByCodeBarre(codeBarre);
    if(article.length>0){
      await this.postPrix(article[0])
    }else{
      await this.setArticleOnLocalStorageWithCodeBarre(codeBarre);
    }
    
  }

  private async setArticleOnLocalStorageWithCodeBarre(codeBarre : any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'L\'article n\'existe pas, veuillez la créé',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          label : 'Nom de l\'article'
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (article : Articles) => {
            article.codeBarre = await codeBarre;
            await this.postChoosePrixAndSaveArticle(article);

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

  public async postChoosePrixAndSaveArticle(dataSend : any){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Renseigner un prix',
      inputs: [
        {
          type : 'number',
          name : 'prix',
          value : dataSend.prix
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }
        ,{
          text: 'Valider',
          handler: async (prix : number) => {

            var article : Articles = {
              id : Date.now(),
              libelle : dataSend.libelle,
              prix : [
                {
                  magasin : this.course.magasinId,
                  prix : prix
                }
              ],
              createdOn : new Date(),
              groupeId : [ (await this.utility.getConnexionInfo()).groupeId ],
              familleId : 0,
              codeBarre : dataSend.codeBarre,
              isFirebase : false
            };

            // Ici on ajoute l'article dans la liste des articles
            await this.articlesService.post(article);
            
            // Ici on ajoute l'article au panier
            await this.postPrix(article, true);

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



  public async refresh(){
    this.courseid = this.getId();

    const course : any = await this.getCourse();
    this.course = course;

    const coursedetails : Array<CourseDetails> = await this.getCourseDetail();
    this.coursedetails = coursedetails;

    const articles = await this.getArticles();
    this.articles = articles;

    this.calculeTotalCourse();
  }

  private calculeTotalCourse(){
    const coursedetail : Array<CourseDetails> = this.coursedetails;
    var totalCourse = 0;
    if(coursedetail.length > 0){
      coursedetail.map(coursedetail => totalCourse += coursedetail.total)
      this.totalCourse = totalCourse;

      this.course.montantReel = totalCourse;
      this.course.montantTheorique = totalCourse;
      this.coursesService.putCourse(this.course);
    }
  }

  public getId(){
    const id = this.route.snapshot.params['id'];
    return id;
  }

  private async getCourse(){
    return await this.coursesService.getCourseById(this.courseid);
  }

  public async getCourseDetail(){
    const coursedetails : Array<CourseDetails> = await this.coursesService.getCourseDetails(this.courseid);
    return coursedetails;
  }

  private async getArticles(){
    return this.articleservice.get();
  }

  public async postArticle(){

    const inputs : Array<AlertInput> = [];

    this.articles.map(article => inputs.push({
      type : 'radio',
      label : article.libelle,
      value : article
    }))

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ou souhaitez-vous faire vos courses ?',
      inputs: inputs,
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Nouvelle article',
          cssClass: 'secondary',
          handler: async () => {
            await this.postNouvelleArticle();
          }
        },
        {
          text: 'Recherche avancée',
          cssClass: 'secondary',
          handler: () => {
            this.rechercheAvance = !this.rechercheAvance
          }
        }
        ,{
          text: 'Valider',
          handler: async (article : Articles) => {

            await this.postPrix(article)

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async postNouvelleArticle(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter un nouvelle article',
      inputs: [
        {
          type : 'text',
          label : 'Libellé',
          name : 'libelle'
        },
        {
          type : 'number',
          value : 1,
          label : 'Quantité',
          name : 'quantite'
        },
        {
          type : 'number',
          label : 'Prix',
          name : 'prix',
          value : 1000
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Valider',
          handler: async (data : any) => {

              var article : Articles = {
                id : this.utility.generateId(),
                libelle : data.libelle,
                prix : [
                  {
                    magasin : this.course.magasinId,
                    prix : Number(data.prix)
                  }
                ],
                createdOn : new Date(),
                groupeId : [(await this.utility.getConnexionInfo()).groupeId],
                familleId : 0,
                codeBarre : "",
                isFirebase : false
              }

              await this.articleservice.post(article);

              var coursedetails : CourseDetails = {
                id : Date.now(),
                ordre : 1,
                courseId : this.courseid,
                libelle : article.libelle,
                quantite : data.quantite,
                articleId : article.id,
                prixArticle : article.prix[0].prix,
                prixReel : data.prix,
                checked : false,
                total : data.quantite * data.prix,
                isFirebase : false
              }

              await this.coursesService.postCourseDetails(coursedetails);

              await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async postPrix(articles : Articles, addByBarCode? : boolean){

    const inputs : Array<AlertInput> = [];
    var goodPrix = 0;

    articles.prix.map(prix => {
      if(prix.magasin == this.course.magasinId){
        goodPrix = prix.prix
      }
    })

    // si on ajoute l'article en scannant par un codebarre, on prend le prix que l'on transmet
    if(addByBarCode){
      goodPrix = articles.prix[0].prix
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Renseigner le prix et la quantité souhaitée',
      inputs: [
        {
          type : 'number',
          value : '1',
          label : 'Quantité',
          name : 'quantite'
        },
        {
          type : 'number',
          label : 'Prix',
          name : 'prix',
          value : goodPrix
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Valider',
          handler: async (data : any) => {

              var coursedetails : CourseDetails = {
                id : Date.now(),
                ordre : 1,
                courseId : this.courseid,
                libelle : articles.libelle,
                quantite : data.quantite,
                articleId : articles.id,
                prixArticle : articles.prix[0].prix,
                prixReel : data.prix,
                checked : false,
                total : data.quantite * data.prix,
                isFirebase : false
              }

              await this.coursesService.postCourseDetails(coursedetails);
              await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async check(coursedetail : CourseDetails){
    coursedetail.checked = !coursedetail.checked;
    await this.coursesService.putCourseDetails(coursedetail);
    await this.refresh();
  }

  public async put(coursedetail : CourseDetails){

    const inputs : Array<AlertInput> = [];

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Renseigner le prix et la quantité souhaitée',
      inputs: [
        {
          type : 'text',
          value : coursedetail.libelle,
          label : 'Libellé',
          name : 'libelle'
        },
        {
          type : 'number',
          value : coursedetail.quantite,
          label : 'Quantité',
          name : 'quantite'
        },
        {
          type : 'number',
          label : 'Prix',
          name : 'prix',
          value : coursedetail.prixReel
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Valider',
          handler: async (data : any) => {
            
            coursedetail.libelle = data.libelle;
            coursedetail.prixReel = data.prix;
            coursedetail.quantite = data.quantite;
            coursedetail.total = data.prix * data.quantite;

            await this.coursesService.putCourseDetails(coursedetail);

            if(data.prix == coursedetail.prixArticle){
              await this.refresh();
            }else{
              this.putArticleOnDatabase({
                articleId : coursedetail.articleId,
                prix : Number(data.prix),
                magasinId : this.course.magasinId,
                coursedetail : coursedetail
              })
            }

          }
        }
        
      ]
    });

    await alert.present();
  }

  private async putArticleOnDatabase(data : any){

    const inputs : Array<AlertInput> = [];

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Souhaitez-vous également mettre à jour le prix en base de données ?',
        buttons: [
        {
          text: 'Annuler',
          role: 'Non',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Oui',
          handler: async () => {
            var article : Array<Articles> = await this.articleservice.getArticleById(data.articleId);
            var indexPrix = await article[0].prix.findIndex(prix => prix.magasin == data.magasinId);
            article[0].prix[indexPrix].prix = data.prix
            await this.articleservice.put(article[0]);

            data.coursedetail.prixArticle = data.prix;
            await this.coursesService.putCourse(data.coursedetail);
            await this.refresh();
            

          }
        }
        
      ]
    });

    await alert.present();
  }

  public async selectArticle(article : Articles){
    await this.postPrix(article)
    this.rechercheAvance = !this.rechercheAvance;
  }

  public async delete(courseDetail : CourseDetails){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Souhaitez-vous réellement retirer l\'article de votre liste ?',
        buttons: [
        {
          text: 'Annuler',
          role: 'Non',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Oui',
          handler: async () => {
            await this.coursesService.deleteCourseDetails(courseDetail);
            await this.refresh();
          }
        }
        
      ]
    });

    await alert.present();
    
  }

}
