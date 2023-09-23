import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plats } from 'src/app/models/Plats';
import { PlatsService } from 'src/app/services/plats.service';

@Component({
  selector: 'app-plat-details',
  templateUrl: './plat-details.page.html',
  styleUrls: ['./plat-details.page.scss'],
})
export class PlatDetailsPage implements OnInit {

  platid = 0;
  plat : Plats = {
    id : 0,
    libelle : '',
    total : 0,
    createdOn : new Date(),
    isFirebase : false
  }

  constructor(private route : ActivatedRoute,
              private platservice : PlatsService) { }

  async ngOnInit() {
    await this.refresh();
  }

  public async refresh(){
    const id = await this.route.snapshot.params['id'];
    this.platid = id;
    var plat = await this.platservice.getPlatById(+id);
    this.plat = plat;
  }

}
