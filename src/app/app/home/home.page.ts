import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private utility : UtilityService) { }

  ngOnInit() {
    this.redirection();
  }

  private async redirection(){
    const infoConnexion = await this.utility.getConnexionInfo();
    if(!infoConnexion.isConnected){
      this.utility.navigateTo('authentification');
    }
  }

}
