import { Component, OnInit } from '@angular/core';
import { Utilisateurs } from 'src/app/models/Utilisateurs';
import { UtilisateursService } from 'src/app/services/utilisateurs.service';

@Component({
  selector: 'app-utilisateur-liste',
  templateUrl: './utilisateur-liste.page.html',
  styleUrls: ['./utilisateur-liste.page.scss'],
})
export class UtilisateurListePage implements OnInit {

  utilisateurs : Array<Utilisateurs> = [];

  constructor(private utilisteursService : UtilisateursService) { }

  ngOnInit() {
    this.refresth();
  }

  private async refresth(){
    this.utilisateurs = await this.getUtilisateurs();
  }

  private async getUtilisateurs(){
    return await this.utilisteursService.get();
  }

}
