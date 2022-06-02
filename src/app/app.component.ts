import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { Depenses } from './models/depenses';
import { Settings } from './models/setting';
import { ArticlesService } from './services/articles.service';
import { CoursesService } from './services/courses.service';
import { MenuService } from './services/menu.service';
import { PlatsService } from './services/plats.service';
import { UtilityService } from './services/utility.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storage : Storage,
              private articleService : ArticlesService,
              private platService : PlatsService,
              private courseService : CoursesService,
              private menuService : MenuService,
              private route : NavController,
              private utility : UtilityService) {}
  
  splashscreen : boolean = true;
  nbConnection : number = 0;
  settings : Settings;
  demarrageSansSplashscreen : boolean = true;
  
  ngOnInit(){
    this.initSplashscreen()
  }

  initSplashscreen(){
    this.loadDefaultData()
    document.addEventListener('deviceready', () => {
      this.loadDefaultData()
    })
  }

  loadDefaultData(){
    
    if(!this.demarrageSansSplashscreen){

      if(this.splashscreen){
        this.splashscreen = false;
        if(this.nbConnection === 0){
          this.route.navigateRoot('splashscreen')
        }
      }else{
        this.setArticle()
        this.setFamilleArticle()
        this.setPlat()
        this.setCourse()
        this.setMenu()
        this.initSetting()
        this.initTheme()
        this.setDeletedElement()
        this.initDepense()
      }
    }else{
      this.setArticle()
      this.setFamilleArticle()
      this.setPlat()
      this.setCourse()
      this.setMenu()
      this.initSetting()
      this.initTheme()
      this.setDeletedElement()
      this.initDepense()
    }
  }

  async setArticle(){
    const articles = await this.articleService.getArticleFromLocalStorage()
    if(articles === null){
      await this.articleService.setDefaultArticleData()
    }
  }
  async setFamilleArticle(){
    const famillles = await this.articleService.getFamilleArticleFromLocalStorage()
    if(famillles === null){
      await this.articleService.setDefaultFamilleArticleData()
    }
  }
  async setPlat(){
    const plats = await this.platService.getPlatFromLocalStorage()
    if(plats === null){
      await this.platService.setDefaultPlatData()
    }
  }
  async setCourse(){
    const courses = await this.courseService.getCourses()
    if(courses === null){
      await this.courseService.setDefaultCourseData()
    }
  }
  async setMenu(){
    const menues = await this.menuService.getMenuFromLocaoStorage()
    if(menues === null){
      await this.menuService.setDefaultValue()
    }
  }
  async setDeletedElement(){
    const deletedElement = await this.storage.get('deleted')
    if(deletedElement === null){
      this.storage.set('deleted',[])
    }
  }

  async initSetting() {

    const setting = await this.storage.get(this.utility.localstorage.Setting);
    if(setting === null){
      const settingInfo : Settings = await this.utility.initSettingData()
      this.storage.set(this.utility.localstorage.Setting, settingInfo)
    }
    
  }

  async initTheme(){

    const setting = await this.storage.get(this.utility.localstorage.Setting);

    if(setting){
      if(setting.theme === true){
        document.body.setAttribute('color-theme','dark');
      }else{
        document.body.setAttribute('color-theme','light');
      }
    }else{
      document.body.setAttribute('color-theme','light');
    }

  }

  async initDepense(){
    
    const depenses : Array<Depenses> = await this.storage.get(this.utility.localstorage.Dépenses);
    
    if(depenses === null){
      const data : Array<Depenses> = []
      this.storage.set(this.utility.localstorage.Dépenses, data)

    }
  }

}
