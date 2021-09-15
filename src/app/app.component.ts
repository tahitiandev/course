import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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
  settings : Setting;
  
  
  ngOnInit(){
    this.initSplashscreen()
    this.loadDefaultData()
  }

  initSplashscreen(){
    document.addEventListener('deviceready', () => {
      this.loadDefaultData()
    })
  }

  loadDefaultData(){

    // if(this.splashscreen){
    //   this.splashscreen = false;
    //   this.route.navigateRoot('splashscreen')
    // }else{
      this.setArticle()
      this.setFamilleArticle()
      this.setPlat()
      this.setCourse()
      this.setMenu()
      this.initSetting()
      this.initTheme()
    // }
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

  async initSetting() {

    const setting = await this.storage.get(this.utility.localstorage.Setting);
    
    if(!setting){
      // Je met à jour le thème
      this.settings = {
        theme : true
      }
      // je met à jour le LS
      this.storage.set(this.utility.localstorage.Setting, this.settings)
    }

    this.storage.get(this.utility.localstorage.Setting).then(s => {
      if(!s){
        this.settings = {
          theme : true
        }
        this.storage.set(this.utility.localstorage.Setting, this.settings)
      }
    })
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
