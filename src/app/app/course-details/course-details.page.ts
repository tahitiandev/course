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
import { HistoriquePrixService } from 'src/app/services/historique-prix.service';
import { HistoriquePrix } from 'src/app/models/HistoriquePrix';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LocalName } from 'src/app/enums/LocalName';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

  infoConnexion : ConnexionInfo;
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
    isFirebase : false,
    groupeId : 0
  };
  coursedetails : Array<CourseDetails> = [];
  articles : Array<Articles> = [];
  content_visibility = '';
  rechercheAvance : boolean = false;
  isButtonActif : boolean = true;
  isModeCourseRapide : boolean = true;
  isAfficherListe : boolean = false;

  constructor(private coursesService : CoursesService,
              private alertController : AlertController,
              private articleservice : ArticlesService,
              private utility : UtilityService,
              private codeBarre : BarreCodeService,
              private articlesService : ArticlesService,
              private historiqueprixservice : HistoriquePrixService,
              private firestore : FirestoreService,
              private memoservice : MemoService,
              private route : ActivatedRoute) { }

  async ngOnInit() {
    this.infoConnexion = await this.getInfoConnexion();
    this.refresh();
  }

  private async getInfoConnexion(){
    return await this.utility.getConnexionInfo();
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
      header: 'Ajouter un élement au panier',
      inputs: [
        {
          type : 'number',
          name : 'prix',
          placeholder : 'Prix'
        },
        {
          type : 'number',
          name : 'quantite',
          placeholder : 'Quantité'
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

            var quantiteRenseigne = data.quantite == '' ? 1 : Number(data.quantite);
            var prixRenseigne = data.prix == '' ? 100 : Number(data.prix);

            var coursedetails : CourseDetails = {
              id : Date.now(),
              ordre : 1,
              courseId : this.courseid,
              libelle : 'Sans titre',
              quantite : quantiteRenseigne,
              articleId : 0,
              prixArticle : prixRenseigne,
              prixReel : prixRenseigne,
              checked : false,
              total : prixRenseigne * quantiteRenseigne,
              isFirebase : false,
              groupeId : this.infoConnexion.groupeId
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

  public async associerUnCodeBarreAArticleSansTitre(coursedetail : CourseDetails){
    const codeBarre = await this.scanne();
    await this.setArticleArticleSanstitre(coursedetail, codeBarre)
  }

  private async setArticleArticleSanstitre(coursedetail : CourseDetails, codeBarre : any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajouter un élement au panier',
      inputs: [
        {
          type : 'text',
          name : 'libelle',
          placeholder : 'Libelle'
        },
        {
          type : 'number',
          name : 'prix',
          placeholder : coursedetail.prixReel.toString() + ' xpf'
        },
        {
          type : 'number',
          name : 'quantite',
          placeholder : 'Qté: ' + coursedetail.quantite.toString()
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

            var quantiteRenseigne = data.quantite == '' ? 1 : Number(data.quantite);
            var prixRenseigne = data.prix == '' ? 100 : Number(data.prix);
            var libelleRenseigne = data.libelle == '' ? 'Prix' : data.libelle;

            var article : Articles = {
              id : 0,
              libelle : libelleRenseigne,
              createdOn : new Date(),
              groupeId : [0],
              familleId : 0,
              codeBarre : codeBarre,
              isFirebase : false,
              prix : [
                {
                  magasin : this.course.magasinId,
                  prix : prixRenseigne
                }
              ]
            }

            await this.articlesService.post(article);

            var articleSave : Array<Articles> = await this.articlesService.getArticleByCodeBarre(codeBarre);

            // Mise à jour des données du panier
            coursedetail.libelle = libelleRenseigne;
            coursedetail.quantite = quantiteRenseigne;
            coursedetail.prixReel = prixRenseigne;
            coursedetail.articleId = articleSave[0].id == undefined || articleSave[0].id == null ? 0 : articleSave[0].id;
            coursedetail.total = prixRenseigne * quantiteRenseigne

            await this.coursesService.putCourseDetails(coursedetail);
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
      header: 'L\'article n\'existe pas, veuillez le créé',
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
    
    await this.setCourseDetail();
    
    await this.calculeTotalCourse();

    const articles = await this.getArticles();
    this.articles = articles;

    const connexionInfo = await this.utility.getConnexionInfo();
    this.isModeCourseRapide = connexionInfo.isCourseRapide;

  }

  private async calculeTotalCourse(coursedetailParam? : Array<CourseDetails>){

    var coursedetail : Array<CourseDetails> = this.coursedetails;

    if(this.infoConnexion.isOnline){
      coursedetail = coursedetailParam === undefined ? this.coursedetails : coursedetailParam;
    }

    var totalCourse = 0;
    if(coursedetail.length > 0){
      coursedetail.map(coursedetail => totalCourse += coursedetail.total)
      this.totalCourse = totalCourse;
      this.course.montantReel = totalCourse;
      this.course.montantTheorique = totalCourse;
    }
    else{
      this.totalCourse = 0;
      this.course.montantReel = 0;
      this.course.montantTheorique = 0;
    }

    this.coursesService.putCourse(this.course);
  }

  public getId(){
    const id = this.route.snapshot.params['id'];
    return id;
  }

  private async getCourse(){
    return await this.coursesService.getCourseById(this.courseid);
  }

  private async setCourseDetail(){
    if(this.infoConnexion.isOnline){

      (await this.firestore.getAll(LocalName.CourseDetails)).subscribe(async(datas) => {
        
        var coursedetails : Array<any> = await datas.filter((data : any) => data.courseId === this.courseid && data.groupeId === this.infoConnexion.groupeId);
        this.coursedetails = coursedetails;
        this.calculeTotalCourse(coursedetails);
      })
    }else{
      const coursedetails : Array<CourseDetails> = await this.coursesService.getCourseDetails(this.courseid);
      this.coursedetails = coursedetails;
    }
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
      header: 'Ajouter un élément à votre panier ?',
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
          placeholder : 'Qté : 1',
          name : 'quantite'
        },
        {
          type : 'number',
          placeholder : 'Prix : 1000 xpf',
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

            var prixGood = data.prix === '' ? 1000 : Number(data.prix);
            var quantiteGood = data.quantite === '' ? 1 : Number(data.quantite);

              var article : Articles = {
                id : this.utility.generateId(),
                libelle : data.libelle,
                prix : [
                  {
                    magasin : this.course.magasinId,
                    prix : prixGood
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
                quantite : quantiteGood,
                articleId : article.id,
                prixArticle : article.prix[0].prix,
                prixReel : prixGood,
                checked : false,
                total : quantiteGood * prixGood,
                isFirebase : false,
                groupeId : this.infoConnexion.groupeId
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
              isFirebase : false,
              groupeId : this.infoConnexion.groupeId
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
                  isFirebase : false,
                  groupeId : this.infoConnexion.groupeId
                }
  
                await this.coursesService.postCourseDetails(coursedetails);

                if(coursedetails.prixReel !== coursedetails.prixArticle){

                  const index = articles.prix.findIndex(prix => prix.magasin === this.course.magasinId);
                  articles.prix[index].prix = Number(coursedetails.prixReel);

                  await this.putPrixFicheArticle(articles,Number(prixArticle));

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

  private async putPrixFicheArticle(article : Articles, ancienPrix : number){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Le prix renseigné est différé du prix de la fiche article. Souhaitez-vous le mettre à jour ?',
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

            // historique prix
            const indexMagasinPrix = article.prix.findIndex(prix => prix.magasin === this.course.magasinId);

            const historique : HistoriquePrix = {
              id : Number(new Date()),
              articleId : article.id,
              libelle : article.libelle,
              prixAncien : ancienPrix,
              prixNouveau : article.prix[indexMagasinPrix].prix,
              magasinid : article.prix[indexMagasinPrix].magasin,
              date : new Date(),
              isFirebase : false
            }

            await this.historiqueprixservice.post(historique);

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
              // fix à changer au plus vite car il ne marche pas si on modifie une deuxième fois
              if(coursedetail.libelle !== 'Sans titre'){

                const article = await this.articlesService.getArticleById(coursedetail.articleId);
                const indexPrixMagasin = await article[0].prix.findIndex(prixmagasin => prixmagasin.magasin === this.course.magasinId);

                this.putArticleOnDatabase({
                  articleId : coursedetail.articleId,
                  prixNouveau : Number(data.prix),
                  prixAncien : Number(article[0].prix[indexPrixMagasin].prix),
                  magasinId : this.course.magasinId,
                  coursedetail : coursedetail,
                })
              }
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

            var article : Array<Articles> = await this.articleservice.getArticleById(Number(data.articleId));
            var indexPrix = await article[0].prix.findIndex(prix => prix.magasin == data.magasinId);
            var ancienprixmagasin = article[0].prix[indexPrix];

            article[0].prix[indexPrix].prix = data.prixNouveau
            await this.articleservice.put(article[0]);
            
            data.coursedetail.prixArticle = data.prixNouveau;
            await this.coursesService.putCourseDetails(data.coursedetail);
            

            // historique prix
            const historique : HistoriquePrix = {
              id : Number(new Date()),
              articleId : article[0].id,
              libelle : article[0].libelle,
              prixAncien : data.prixAncien,
              prixNouveau : data.prixNouveau,
              magasinid : this.course.magasinId,
              date : new Date(),
              isFirebase : false
            }

            await this.historiqueprixservice.post(historique);            
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
                isFirebase : false,
                groupeId : this.infoConnexion.groupeId
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

  public setAfficherListe(){
    this.isAfficherListe = !this.isAfficherListe
  }

  public async regler(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Régler vos courses',
      inputs : [
        {
          type : 'number',
          name : 'reglement'
        }
      ],
        buttons: [
        {
          text: 'Annuler',
          role: 'Non',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
        ,{
          text: 'Valider',
          handler: async (result : any) => {

            this.course.montantReel = result.reglement;
            await this.coursesService.putCourse(this.course);

            const totalTheorique = this.course.montantTheorique;

            if(totalTheorique < result.reglement){

              var ecart = result.reglement - totalTheorique

              var coursedetails : CourseDetails = {
                id : Date.now(),
                ordre : 1,
                courseId : this.courseid,
                libelle : 'REGLT +',
                quantite : 1,
                articleId : 0,
                prixArticle : ecart,
                prixReel : ecart,
                checked : false,
                total : ecart,
                isFirebase : false,
                groupeId : this.infoConnexion.groupeId
              }

              await this.coursesService.postCourseDetails(coursedetails);
            }
            else{
              var ecart = totalTheorique - result.reglement
              var coursedetails : CourseDetails = {
                id : Date.now(),
                ordre : 1,
                courseId : this.courseid,
                libelle : 'REGLT -',
                quantite : 1,
                articleId : 0,
                prixArticle : ecart,
                prixReel : ecart,
                checked : false,
                total : ecart * -1,
                isFirebase : false,
                groupeId : this.infoConnexion.groupeId
              }

              await this.coursesService.postCourseDetails(coursedetails);
            }

            await this.refresh();

          }
        }
        
      ]
    });

    await alert.present();
  }

}
