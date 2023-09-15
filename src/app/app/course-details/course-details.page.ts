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
import { MemoService } from 'src/app/services/memo.service';
import { Memos } from 'src/app/models/Memos';

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
  isButtonActif : boolean = true;

  constructor(private coursesService : CoursesService,
              private alertController : AlertController,
              private articleservice : ArticlesService,
              private utility : UtilityService,
              private codeBarre : BarreCodeService,
              private articlesService : ArticlesService,
              private memoservice : MemoService,
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

  public async postArticleWithCalculator(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'L\'article n\'existe pas, veuillez la créé',
      inputs: [
        {
          type : 'number',
          name : 'prix',
          label : 'PRIX',
          placeholder : 'PRIX'
        },
        {
          type : 'number',
          name : 'quantite',
          label : 'QUANTITE',
          placeholder : 'QUANTITE'
        },
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
          handler: async (data) => {
            var coursedetails : CourseDetails = {
              id : Date.now(),
              ordre : 1,
              courseId : this.courseid,
              libelle : 'Sans titre',
              quantite : data.quantite,
              articleId : 0,
              prixArticle : data.prix,
              prixReel : data.prix,
              checked : true,
              total : data.quantite * data.prix,
              isFirebase : false
            }

            await this.coursesService.postCourseDetails(coursedetails);
            await this.refresh();
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
          placeholder : 'PRIX'
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
          handler: async (prix : any) => {

            var article : Articles = {
              id : Date.now(),
              libelle : dataSend.libelle,
              prix : [
                {
                  magasin : this.course.magasinId,
                  prix : prix === undefined || prix === null ? 100 : prix.prix
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
            await this.postPrix(article);

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
    return coursedetails.filter(data => data.deletedOn === undefined || data.deletedOn === null);
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

  public async addNewPrixArticle(article : Articles){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Renseigner le prix et la quantité souhaitée',
      inputs: [
        {
          type : 'number',
          placeholder : 'Quantité : 1',
          name : 'quantite'
        },
        {
          type : 'number',
          placeholder : 'Prix ex: ' + article.prix[0].prix + ' xpf',
          name : 'prix'
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

            // Rajouter un nouveau prix à l'article
            article.prix.push({
              magasin : this.course.magasinId,
              prix : data.prix === '' ? Number(article.prix[0].prix) : Number(data.prix)
            })
            await this.articlesService.put(article);

            // Rajoute l'article au panier

            var prixSaisie = data.prix === '' ? Number(article.prix[0].prix) : Number(data.prix)
            var quantiteSaisie = data.quantite === '' ? 1 : Number(data.quantite)
            var coursedetails : CourseDetails = {
              id : Date.now(),
              ordre : 1,
              courseId : this.courseid,
              libelle : article.libelle,
              quantite : quantiteSaisie,
              articleId : article.id,
              prixArticle : prixSaisie,
              prixReel : prixSaisie,
              checked : false,
              total : quantiteSaisie * prixSaisie,
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

  public async postPrix(articles : Articles){

    var prixArticle = await articles.prix.find(prix => prix.magasin == this.course.magasinId)?.prix;

    if(prixArticle === undefined){
      await this.addNewPrixArticle(articles);
    }else{

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Renseigner le prix et la quantité souhaitée',
        inputs: [
          {
            type : 'number',
            placeholder : 'Qté : 1',
            name : 'quantite'
          },
          {
            type : 'number',
            placeholder : 'Prix : ' + prixArticle + ' xpf',
            name : 'prix'
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

              var prixSaisie = data.prix === '' ? prixArticle : Number(data.prix);
              var quantiteSaisie = data.quantite === '' ? 1 : Number(data.quantite);
  
                var coursedetails : CourseDetails = {
                  id : Date.now(),
                  ordre : 1,
                  courseId : this.courseid,
                  libelle : articles.libelle,
                  quantite : quantiteSaisie,
                  articleId : articles.id,
                  prixArticle : Number(prixArticle),
                  prixReel : Number(prixSaisie),
                  checked : false,
                  total : quantiteSaisie * Number(prixSaisie),
                  isFirebase : false
                }
  
                await this.coursesService.postCourseDetails(coursedetails);

                if(coursedetails.prixArticle !== coursedetails.prixReel){

                  const index = articles.prix.findIndex(prix => prix.magasin === this.course.magasinId);
                  articles.prix[index].prix = Number(coursedetails.prixReel);

                  await this.putPrixFicheArticle(articles);
                  await this.refresh();

                }else{
                  await this.refresh();
                }  
            }
          }
          
        ]
      });
  
      await alert.present();

    }// else

  }

  private async putPrixFicheArticle(article : Articles){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Le prix renseigné est différé du prix de la fiche article. Souhaitez-vous la mettre à jour ?',
      inputs: [],
        buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Oui',
          handler: async () => {
            
            await this.articlesService.put(article);
            this.refresh();

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
            await this.coursesService.deleteDefinitivementCourseDetails(courseDetail);
            await this.refresh();
          }
        }
        
      ]
    });

    await alert.present();
    
  }

  public async deleteCourseDetail(coursedetail : CourseDetails){
    await this.coursesService.deleteCourseDetails(coursedetail);
    await this.refresh();
  }

  public setIsButtonActif(){
    this.isButtonActif = !this.isButtonActif;
  }

  public async dechargerMemo(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Souhaitez-vous décharger vos notes de course ?',
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
            const memos : Array<Memos> = await this.memoservice.get();

            for(let memo of memos){

              const prix = memo.article.prix.find(prix => prix.magasin === this.course.magasinId);

              var coursedetail : CourseDetails = {
                id : Number(new Date()),
                ordre : 0,
                courseId : this.course.id.toString(),
                libelle : memo.article.libelle,
                quantite : memo.quantite,
                articleId : memo.article.id,
                prixArticle : prix === undefined ? memo.article.prix[0].prix : prix.prix,
                prixReel : prix === undefined ? memo.article.prix[0].prix : prix.prix,
                total : Number(memo.quantite * (prix === undefined ? memo.article.prix[0].prix : prix.prix)),
                checked : false,
                isFirebase : false
              }

              await this.coursesService.postCourseDetails(coursedetail);
              await this.memoservice.delete(memo);

            }
            await this.refresh();
          }
        }
        
      ]
    });

    await alert.present();


  }

}
