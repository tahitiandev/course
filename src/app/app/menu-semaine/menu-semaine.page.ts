import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';
import { LocalName } from 'src/app/enums/LocalName';
import { Methods } from 'src/app/enums/Methods';
import { ConnexionInfo } from 'src/app/models/ConnexionInfo';
import { Menu } from 'src/app/models/Menu';
import { Plats } from 'src/app/models/Plats';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuService } from 'src/app/services/menu.service';
import { PlatsService } from 'src/app/services/plats.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-menu-semaine',
  templateUrl: './menu-semaine.page.html',
  styleUrls: ['./menu-semaine.page.scss'],
})
export class MenuSemainePage implements OnInit {

  infoConnexion : ConnexionInfo;
  menus : Array<Menu> = [];
  selectedWeek: number;
  selectedYear: number;
  isSeachPlat : boolean = false;
  selectedMenu : Menu;

  constructor(private alertController : AlertController,
              private menuservice : MenuService,
              private platsservice : PlatsService,
              private firestore : FirestoreService,
              private utiilty : UtilityService) { }

  async ngOnInit() {
    this.selectedWeek = this.getCurrentWeekNumber(); 
    this.selectedYear = new Date().getFullYear();
    this.infoConnexion = await this.getInfoConnexion();
    this.initMenu();
    this.refresh();
  }

  private getNumeroSemaineEtAnnee(date: Date): { weekNumber: number, year: number } {
    const onejan: Date = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay: number = 86400000; // 24 * 60 * 60 * 1000
    const dayOfYear: number = (date.getTime() - onejan.getTime()) / millisecsInDay;
    const weekNumber: number = Math.ceil((dayOfYear + onejan.getDay() + 1) / 7);
    const year: number = date.getFullYear();
    return { weekNumber, year };  
  }

  public async effacer(menu : Menu){
    var plat : Plats = {
      id : 0,
      libelle : "",
      total : 0,
      createdOn : new Date(),
      isFirebase : true,
      firebaseMethod : Methods.DELETE
    }
    menu.plat = plat;
    menu.libelle = "";
    await this.menuservice.put(menu);
    this.refresh();
  }

  public async sendToCourse(plat : Plats){
    const platdetail = await this.platsservice.getPlatDetails(+plat.id);
    const inputs : Array<AlertInput> = [];
    await platdetail.map(ingredient => {
      inputs.push({
        type : 'checkbox',
        value : ingredient,
        label : ingredient.article.libelle
      })
    })
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Envoyer dans votre liste de course',
      inputs: inputs,
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
            this.utiilty.popUp('ne fait rien pour l\'instant')
          }
        }
        
      ]
    });
    await alert.present();
  }

  public async putMenu(menu : Menu){
      this.isSeachPlat = !this.isSeachPlat;
      this.selectedMenu = menu;
  }

  public async updateMenu(plat : Plats){
    this.selectedMenu.plat = plat;
    this.selectedMenu.libelle = plat.libelle;

    await this.menuservice.put(this.selectedMenu);
    await this.refresh();
  }
  
  public async closeSeachPlatComponent(){
    this.isSeachPlat = !this.isSeachPlat;
  }

  closeSearchPlatComponent(){
    this.isSeachPlat = false;
  }


  private async initMenu(){
    const menus : Array<Menu> = await this.get();
    const jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
    if(menus.length === 0){

      for(let jour of jours){
        const menu : Menu = {
          id : 0,
          jour : jour,
          isFirebase : false,
          groupeId : this.infoConnexion.groupeId,
          annee : this.selectedYear,
          numeroSemaine : this.selectedWeek

        }
        await this.menuservice.post(menu)
      }
    }
  }

  private async refresh(){
    if(this.infoConnexion.isOnline){

      (await this.firestore.getAll(LocalName.Menus)).subscribe(async(datas : any) => {
        const menus : Array<any> = await datas.filter((data:any) => data.groupeId == this.infoConnexion.groupeId);
        this.menus = menus.filter(menu => menu.annee == this.selectedYear && menu.numeroSemaine == this.selectedWeek && menu.groupeId === this.infoConnexion.groupeId);
      })

      setTimeout(async()=>{
        if(this.menus.length === 0){
          const jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
          for(let jour of jours){
            const menu : Menu = {
              id : 0,
              jour : jour,
              isFirebase : false,
              groupeId : this.infoConnexion.groupeId,
              annee : this.selectedYear,
              numeroSemaine : this.selectedWeek
    
            }
            await this.menuservice.post(menu)
          }
        }
      },1000)

    }else{
      this.menus = await this.get();
    }

  }

  onSelectionChange() {
    this.refresh();
  }

  private async getInfoConnexion(){
    return await this.utiilty.getConnexionInfo();
  }

  private async get(){
    return (await this.menuservice.get()).filter(menu => menu.annee == this.selectedYear && menu.numeroSemaine == this.selectedWeek && menu.groupeId === this.infoConnexion.groupeId);
  }

  generateNumbers(count: number): number[] {
    return Array(count).fill(0).map((x, i) => i + 1);
  }

  getLastFourYears(): number[] {
    const currentYear = new Date().getFullYear();
    const lastFourYears = [];
    
    for (let i = 0; i < 4; i++) {
      lastFourYears.push(currentYear - i);
    }
    
    return lastFourYears;
  }

  getCurrentWeekNumber(): number {
    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    const millisecsInDay = 86400000; // 1000 * 60 * 60 * 24
  
    var semaineEnCours =  Math.ceil(((now.getTime() - onejan.getTime()) / millisecsInDay + onejan.getDay() + 1) / 7);
    return semaineEnCours;
  }

  public async post(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Menu de la semaine',
      inputs: [
        {
          type : 'text',
          name : 'jour',
          placeholder : 'Jour'
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
            const menu : Menu = {
              id : 0,
              jour : data.jour,
              isFirebase : false,
              groupeId : this.infoConnexion.groupeId,
              annee : this.selectedYear,
              numeroSemaine : this.selectedWeek
            }

            await this.menuservice.post(menu);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

  public async put(menu : Menu){

    const plats : Array<Plats> = await this.platsservice.get();
    const inputs : Array<AlertInput> = [];

    plats.map(plat => {
      inputs.push({
        type : 'radio',
        value : plat,
        label : plat.libelle
      })
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Choisir un plat',
      inputs: inputs,
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
          handler: async (plat : Plats) => {

            menu.plat = plat;
            menu.libelle = plat.libelle;

            await this.menuservice.put(menu);
            await this.refresh();

          }
        }
        
      ]
    });
    await alert.present();
  }

}
