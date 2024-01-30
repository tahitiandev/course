import { Component, Input, OnInit, Output } from '@angular/core';
import { Finances } from 'src/app/models/Finances';

@Component({
  selector: 'app-finance-list',
  templateUrl: './finance-list.component.html',
  styleUrls: ['./finance-list.component.scss'],
})
export class FinanceListComponent  implements OnInit {

  @Input() finances : Array<Finances> = [];

  constructor() { }

  ngOnInit() {}

}
