import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Depenses } from 'src/app/models/depenses';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-depense-list',
  templateUrl: './depense-list.page.html',
  styleUrls: ['./depense-list.page.scss'],
})
export class DepenseListPage implements OnInit {

  constructor(private storage : Storage,
              private utility : UtilityService) { }

  depenses : Array<Depenses> 

  ngOnInit() {
    this.onInit()
  }

  async onInit(){
    const depenses : Array<Depenses> = await this.getDepense()
    this.depenses = await depenses
  }

  private async getDepense(){
    const depenses : Array<Depenses> = await this.storage.get(this.utility.localstorage.Dépenses);
    return depenses;
  }

  goToDepensePage(){
    this.utility.goToUrl('tab3', 'depense')
  }

}
