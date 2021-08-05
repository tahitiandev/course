import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private nav : NavController) { }

  ngOnInit() {
  }

  goToPage(){
    this.nav.navigateRoot('tabs/tab2/menu-today')
  }

}
