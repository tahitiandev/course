import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Plats } from 'src/app/models/Plats';
import { PlatsService } from 'src/app/services/plats.service';

@Component({
  selector: 'app-menu-semaine-recherche-plat',
  templateUrl: './menu-semaine-recherche-plat.component.html',
  styleUrls: ['./menu-semaine-recherche-plat.component.scss'],
})
export class MenuSemaineRecherchePlatComponent  implements OnInit {

  plats : Array<Plats> = [];
  searchValue :string = "";
  @Output() closeSearchPlat = new EventEmitter<boolean>();
  @Output() platSelected = new EventEmitter<Plats>();

  constructor(private platservice : PlatsService) { }

  async ngOnInit() {
    this.plats = await this.getPlats();
  }

  private async getPlats(){
    return await this.platservice.get();
  }

  public closeSearchPlatComponent(){
    this.closeSearchPlat.emit(false);
  }
  
  public postPlat(plat : Plats){
    this.platSelected.emit(plat);
    this.closeSearchPlatComponent();
  }

}
