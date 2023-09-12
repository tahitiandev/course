import { Component } from '@angular/core';
import { UtilityService } from './services/utility.service';
import { LocalName } from './enums/LocalName';
import { ConnexionInfo } from './models/ConnexionInfo';
import { Storage } from '@ionic/storage';

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
    { title: 'Groupes', url: 'utilisateur-groupes', icon: 'mail' },
  ];

  public pagesNotConnected : Array<any> = [
    { title: 'Créer un utilisateur', url: 'creation-utilisateur', icon: 'mail' },
    { title: 'Se connecter', url: 'authentification', icon: 'mail' },
  ]
  
  public labels = ['Test'];

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
          libelle : 'Administrateurs'
        },
        {
          id : Date.now(),
          libelle : 'Utilisateur divers'
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
          actif : 1
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
      await this.storage.set(LocalName.Familles, [
        {
          id : 0,
          libelle : 'Non classé',
          createdOn : new Date()
        },
        {
          id : Date.now(),
          libelle : 'Boissons',
          createdOn : new Date()
        },
        {
          id : Date.now() + 1,
          libelle : 'Bébé',
          createdOn : new Date()
        },
        {
          id : Date.now() + 2,
          libelle : 'Conserves',
          createdOn : new Date()
        },
        {
          id : Date.now() + 3,
          libelle : 'Divers',
          createdOn : new Date()
        },
        {
          id : Date.now() + 4,
          libelle : 'Frais',
          createdOn : new Date()
        },
      ]);
    }
    
    const magasins = await this.storage.get(LocalName.Magasins);
    if(magasins === null){
      await this.storage.set(LocalName.Magasins, [
        {
          id : 0,
          libelle : 'Carrefour Arue',
          createdOn : new Date()
        },
        {
          id : 1,
          libelle : 'Hyper U Pirae',
          createdOn : new Date()
        },
      ]);
    }
    

    const infoConnexion = await this.storage.get(LocalName.InfoConnexion);
    if(infoConnexion === null){

      // const magasins : Array<Magasins> = await this.magasinService.get();

      const infoConnexion : ConnexionInfo = {
        isConnected : false,
        utilisateurId : 0,
        groupeId : 0,
        modeOnline :  true
      }

      await this.storage.set(LocalName.InfoConnexion, infoConnexion);
    }

  } //setLocalStorage

  private async IsConnected(){
    const connexion = await this.storage.get(LocalName.InfoConnexion);
    
    if(connexion.isConnected){
      this.pages = this.pagesConnected;
    }
    if(!connexion.isConnected){
      this.pages = this.pagesNotConnected;
    }

  }

  public async seDeconnecter(){
    this.pages = this.pagesNotConnected;
    const infoConnexion : ConnexionInfo = {
      isConnected : false,
      utilisateurId : 0,
      groupeId : 0,
      modeOnline : true
    }

    await this.storage.set(LocalName.InfoConnexion, infoConnexion);
    this.utility.navigateTo('authentification');
  }

  public actualiser(){
    location.reload();
  }

}
