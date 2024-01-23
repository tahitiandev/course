import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Articles } from 'src/app/models/Articles';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { CourseDetails } from 'src/app/models/Course-details';
import { Courses } from 'src/app/models/Courses';
import { Memos } from 'src/app/models/Memos';
import { ArticlesService } from 'src/app/services/articles.service';
import { CoursesService } from 'src/app/services/courses.service';
import { MemoService } from 'src/app/services/memo.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {

  infoConnexion : ConnexionInfo;
  memos : Array<Memos> = [];
  isRechercheAvance : boolean = false;
  

  constructor(private memoService : MemoService,
              private courseservice : CoursesService,
              private utility : UtilityService,
              private alertController : AlertController,
              private articleService : ArticlesService) { }

  async ngOnInit() {
    this.infoConnexion = await this.utility.getConnexionInfo();
    await this.refresh();
  }

  public async refresh(){
    const memos = await (await this.memoService.get()).filter(s => s.deletedOn === undefined || s.deletedOn === null);
    this.memos = memos;
  }

  public async put(memo : Memos){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: [
        {
          type : 'text',
          placeholder : memo.article.libelle,
          disabled : true
        },
        {
          type : 'number',
          name : 'quantite',
          placeholder : memo.quantite.toString(),
          value : memo.quantite
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

            memo.quantite = data.quantite === null || data.quantite === undefined || data.quantite === '' ? 1 : Number(data.quantite),
            await this.memoService.put(memo);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async selectArticle(article : Articles){
    var memo : Memos = {
      id : Number(new Date),
      article : article,
      quantite : 1,
      isFirebase : false
    }
    await this.memoService.post(memo);
    await this.refresh();
    this.postMemo();
  }

  public postMemo(){
    this.isRechercheAvance = !this.isRechercheAvance;
  }

  public async retirer(memo : Memos){
    await this.memoService.delete(memo);
    await this.refresh();
  }

  public async postManuel(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nouvelle article',
      inputs: [
        {
          type : 'text',
          placeholder : 'Nom de l\'article',
          name : 'libelle'
        },
        {
          type : 'number',
          name : 'quantite',
          placeholder : 'Quantité'
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

            var quantite = data.quantite === null || data.quantite === undefined || data.quantite === '' ? 1 : Number(data.quantite);
            var article : Articles = {
              id : Number(new Date()),
              libelle : data.libelle,
              prix : [
                {
                  magasin : 1,
                  prix : 100
                },
              ],
              createdOn : new Date(),
              groupeId : [0],
              familleId : 0,
              codeBarre : '',
              isFirebase : false
            }

            var memo : Memos = {
              id : Number(new Date()),
              article : article,
              quantite : quantite,
              isFirebase : false
            }

            await this.articleService.post(article);
            await this.memoService.post(memo);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async sendToCourse(memo : Memos){
    const course : Array<Courses> = await this.courseservice.getCourseIsFocus(this.infoConnexion.groupeId);
    const prix = memo.article.prix.find(prix => prix.magasin === course[0].magasinId);
    const coursedetail : CourseDetails = {
      id : Number(new Date()),
      ordre : 0,
      courseId : course[0].id.toString(),
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
    await this.courseservice.postCourseDetails(coursedetail);
    await this.memoService.delete(memo);
    this.refresh();
  }

}
