import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { Setting } from './models/setting';
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
  settings : Setting;
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
    const courses = await this.courseService.getCourseFromLocalStorage()
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
      const settingInfo : Setting = await this.utility.initSettingData()
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

}
