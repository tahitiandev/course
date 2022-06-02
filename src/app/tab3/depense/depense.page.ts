import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Depenses } from 'src/app/models/depenses';
import { Settings } from 'src/app/models/setting';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.page.html',
  styleUrls: ['./depense.page.scss'],
})
export class DepensePage implements OnInit {

  constructor(private storage : Storage,
              private utility : UtilityService,
              private formbuilder : FormBuilder) { }
  
  settings : Settings;
  depenses : Array<Depenses>;
  payeurs;
  magasins;
  depenseForm = new FormGroup({
    date : new FormControl(),
    payeur : new FormControl(),
    montant : new FormControl(),
    enseigne : new FormControl(),
    description : new FormControl(),
  })

  ngOnInit() {
    this.onInit()
  }

  private async onInit(){
    const settings = await this.getSetting();
    this.settings = await settings;
    this.payeurs = await settings.payeurs;
    this.magasins = await settings.magasins;
  }
  private async getSetting(){
    const settings : Settings = await this.utility.getSetting();
    return settings;
  }

  private async getDepense(){
    const depenses : Array<Depenses> = await this.storage.get(this.utility.localstorage.Dépenses);
    return depenses;
  }

  async onSubmit(){
    const data = await this.depenseForm.value

    data.firebase = false;

    const depenses : Array<Depenses> = await this.getDepense();
    depenses.push(data);
    this.storage.set(this.utility.localstorage.Dépenses, depenses)
    this.onInit()
    this.utility.goToUrl('tab3','depense-list')
  }


}
