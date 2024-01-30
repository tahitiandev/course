import { Component } from '@angular/core';
import { UtilityService } from './services/utility.service';
import { LocalName } from './enums/LocalName';
import { ConnexionInfo } from './models/ConnexionInfo';
import { Storage } from '@ionic/storage';
import { Methods } from './enums/Methods';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public pages : Array<any> = [];

  public pagesConnected : Array<any> = [
    { title: 'Tableau de bord', url: 'home', icon: 'mail' },
    { title: 'Liste de course', url: 'courses', icon: 'paper-plane' },
    { title: 'Menu de la semaine', url: 'menu-semaine', icon: 'paper-plane' },
    { title: 'Articles', url: 'articles', icon: 'paper-plane' },
    { title: 'Plats', url: 'plats', icon: 'paper-plane' },
    { title: 'Familles', url: 'familles', icon: 'paper-plane' },
    { title: 'Magasins', url: 'magasins', icon: 'paper-plane' },
    { title: 'Paramétrages', url: 'settings', icon: 'paper-plane' },
  ];

  public pagesfinancier : Array<any> = [
    { title: 'Flux financier', url: 'finances', icon: 'paper-plane' },
    { title: 'Dépenses', url: 'depenses', icon: 'paper-plane' },
    { title: 'Apports', url: 'apports', icon: 'paper-plane' },
    { title: 'Epargnes', url: 'epargnes', icon: 'paper-plane' },
  ];

  

  public pagesNotConnected : Array<any> = [
    { title: 'Créer un utilisateur', url: 'creation-utilisateur', icon: 'mail' },
    { title: 'Se connecter', url: 'authentification', icon: 'mail' },
  ]
  
  public labels = ['Test'];

  isConnected : boolean =  false;

  constructor(private storage : Storage,
              private utility : UtilityService
    ) {
    this.storage.create();
    this.setLocalStorage();
  }
  
  async ngOnInit() {
    await this.IsConnected();
    await this.setLocalStorage();
  }


  private async setLocalStorage(){
    
    const groupes = await this.storage.get(LocalName.Groupes);
    if(groupes === null){
      await this.storage.set(LocalName.Groupes, [
        {
          id : 0,
          libelle : 'Administrateurs',
          isFirebase : true
        }
    ]);
    }

    const utilisateurs = await this.storage.get(LocalName.Utilisateurs);
    if(utilisateurs === null){
      await this.storage.set(LocalName.Utilisateurs, [
        {
          id : 0,
          libelle : 'Administrateur',
          username : 'toto',
          password : 'toto',
          email : 'heitaa.gilles1@gmail.com',
          groupeId : 0,
          actif : 1,
          isFirebase : true
        }
      ]);
    }
    
    const courses = await this.storage.get(LocalName.Courses);
    if(courses === null){
      await this.storage.set(LocalName.Courses, []);
    }

    const courseDetails = await this.storage.get(LocalName.CourseDetails);
    if(courseDetails === null){
      await this.storage.set(LocalName.CourseDetails, []);
    }
    
    const menus = await this.storage.get(LocalName.Menus);
    if(menus === null){
      await this.storage.set(LocalName.Menus, []);
    }
    
    const plats = await this.storage.get(LocalName.Plats);
    if(plats === null){
      await this.storage.set(LocalName.Plats, []);
    }
    
    const articles = await this.storage.get(LocalName.Articles);
    if(articles === null){
      await this.storage.set(LocalName.Articles, []);
    }
    
    const familles = await this.storage.get(LocalName.Familles);
    if(familles === null){
      await this.storage.set(LocalName.Familles, []);
    }
    
    const magasins = await this.storage.get(LocalName.Magasins);
    if(magasins === null){
      await this.storage.set(LocalName.Magasins, []);
    }

    const historiquePrix = await this.storage.get(LocalName.HistoriquePrix);
    if(historiquePrix === null){
      await this.storage.set(LocalName.HistoriquePrix, []);
    }

    const platdetails = await this.storage.get(LocalName.PlatDetails);
    if(platdetails === null){
      await this.storage.set(LocalName.PlatDetails, []);
    }
    
    const infoConnexion = await this.storage.get(LocalName.InfoConnexion);
    if(infoConnexion === null){

      // const magasins : Array<Magasins> = await this.magasinService.get();

      const infoConnexion : ConnexionInfo = {
        isConnected : false,
        utilisateurId : 0,
        groupeId : 0,
        isOnline :  true,
        isCourseAfficher : true,
        isCourseRapide : true,
      }

      await this.storage.set(LocalName.InfoConnexion, infoConnexion);
    }

    const memos = await this.storage.get(LocalName.Memos);
    if(memos === null){
      await this.storage.set(LocalName.Memos, []);
    }

    const depenses = await this.storage.get(LocalName.Depenses);
    if(depenses === null){
      await this.storage.set(LocalName.Depenses, []);
    }

    const apports = await this.storage.get(LocalName.Apports);
    if(apports === null){
      await this.storage.set(LocalName.Apports, []);
    }

    const epargnes = await this.storage.get(LocalName.Epargnes);
    if(epargnes === null){
      await this.storage.set(LocalName.Epargnes, []);
    }

    const budget = await this.storage.get(LocalName.Budget);
    if(budget === null){
      await this.storage.set(LocalName.Budget, []);
    }

    const finances = await this.storage.get(LocalName.Finances);
    if(finances === null){
      await this.storage.set(LocalName.Finances, []);
    }

  } //setLocalStorage

  private async IsConnected(){
    const connexion = await this.storage.get(LocalName.InfoConnexion);
    
    if(connexion.isConnected){
      this.pages = this.pagesConnected;
      this.isConnected = true;
    }
    if(!connexion.isConnected){
      this.pages = this.pagesNotConnected;
      this.isConnected = false;
    }

  }

  public async seDeconnecter(){
    this.pages = this.pagesNotConnected;
    this.storage.clear();

    this.isConnected = false;
    const infoConnexion : ConnexionInfo = {
      isConnected : false,
      utilisateurId : 0,
      groupeId : -1,
      isOnline : true,
      isCourseAfficher : true,
      isCourseRapide : true,
    }

    await this.storage.set(LocalName.InfoConnexion, infoConnexion);


    this.utility.navigateTo('authentification');
    setTimeout(() => {
      this.actualiser();
    }, 2000);
  }

  public actualiser(){
    location.reload();
  }


}
