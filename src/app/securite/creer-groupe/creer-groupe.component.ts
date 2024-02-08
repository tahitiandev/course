import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilisateurGroupes } from 'src/app/models/UtilisateurGroupes';
import { UtilisateurGroupesService } from 'src/app/services/utilisateur-groupes.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-creer-groupe',
  templateUrl: './creer-groupe.component.html',
  styleUrls: ['./creer-groupe.component.scss'],
})
export class CreerGroupeComponent  implements OnInit {

  formgroup : FormGroup = new FormGroup([]);
  @Output() groupeNameOutput = new EventEmitter<UtilisateurGroupes>();

  constructor(private formbuilder : FormBuilder,
              private groupeservice : UtilisateurGroupesService,
              private utility : UtilityService) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.formgroup = this.formbuilder.group({
      libelle : ''
    })
  }

  async onValide(){
    const data = this.formgroup.value;
    var groupe : UtilisateurGroupes = {
      id : 0,
      libelle : data.libelle,
      isFirebase : false,
      key : this.utility.generateKey()
    }

    this.formgroup.patchValue({
      libelle : ''
    })
    await this.groupeservice.post(groupe);
    this.groupeNameOutput.emit(groupe);
  }

}
