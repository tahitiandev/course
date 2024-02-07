import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-creer-groupe',
  templateUrl: './creer-groupe.component.html',
  styleUrls: ['./creer-groupe.component.scss'],
})
export class CreerGroupeComponent  implements OnInit {

  formgroup : FormGroup = new FormGroup([]);
  @Output() groupeNameOutput = new EventEmitter<any>();

  constructor(private formbuilder : FormBuilder) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.formgroup = this.formbuilder.group({
      libelle : ''
    })
  }

  onValide(){
    const data = this.formgroup.value;
    this.groupeNameOutput.emit(data);
  }

}
