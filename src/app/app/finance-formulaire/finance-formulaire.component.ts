import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Flux } from 'src/app/enums/Flux';
import { Methods } from 'src/app/enums/Methods';
import { TypeOperation } from 'src/app/enums/TypeOperation';
import { Finances } from 'src/app/models/Finances';

@Component({
  selector: 'app-finance-formulaire',
  templateUrl: './finance-formulaire.component.html',
  styleUrls: ['./finance-formulaire.component.scss'],
})
export class FinanceFormulaireComponent  implements OnInit {

    @Output() annulerOuput = new EventEmitter<any>();
    @Output() formOutput = new EventEmitter<Finances>();

    formgroup : FormGroup = new FormGroup([]);

  constructor(private formbuilder : FormBuilder) { }

  ngOnInit() {
    this.initform();
  }

  initform(){
    this.formgroup = this.formbuilder.group({
      montant : '',
      description : '',
      type : TypeOperation.Divers
    })
  }

  close(){
    this.annulerOuput.emit();
  }

  async onValide(){
    const data = this.formgroup.value;

    var finances : Finances = {
      id : 0,
      userid : 0,
      montant : data.montant,
      flux : Flux.Debit,
      commentaire : data.description,
      check : false,
      createdOn : new Date(),
      isFirebase : false,
      firebaseMethod : Methods.POST,
      isEpargne : false,
      key : 'a',
      type : data.type
    }

    await this.formOutput.emit(finances);

    this.formgroup.patchValue({
      montant : '',
      description : '',
      type : TypeOperation.Divers
    })

    this.close();
  }

}
