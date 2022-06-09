import { Component, OnInit } from '@angular/core';
import { MenuDelaSemaine } from 'src/app/models/menuDeLaSemaine';
import { MenuService } from 'src/app/services/menu.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.page.html',
  styleUrls: ['./menu-list.page.scss'],
})
export class MenuListPage implements OnInit {

  constructor(private menuService : MenuService,
              private storage : Storage) { }

  menus : MenuDelaSemaine [];
  arrowIcone = "arrow-down-circle-outline";
  ngOnInit() {
    this.initialiseMenu()
  }

  async initialiseMenu(){
    const menus : MenuDelaSemaine [] = await this.menuService.getMenus();
    this.menus = this.menuService.sortMenuByDate(menus)
  }

  async toggleDetailMenu(index : number){
    const element = await document.getElementById("detail-" + index);
    element.classList.toggle('hide')

    // icone
    if(this.arrowIcone === "arrow-down-circle-outline"){
      this.arrowIcone = "arrow-up-circle-outline";
    }else{
      this.arrowIcone = "arrow-down-circle-outline";
    }

    this.eventClickButton(index)
  }

  eventClickButton(index : number){
    const element = document.getElementById("toggleButton-" + index);
    element.classList.add('clickButton');
    setTimeout(() => {
      element.classList.remove('clickButton');
    }, 1500);

  }

}
