import { Component, OnInit } from '@angular/core';
import { HistoriquePrix } from 'src/app/models/HistoriquePrix';
import { HistoriquePrixService } from 'src/app/services/historique-prix.service';

@Component({
  selector: 'app-historique-prix',
  templateUrl: './historique-prix.page.html',
  styleUrls: ['./historique-prix.page.scss'],
})
export class HistoriquePrixPage implements OnInit {

  historiqueprix : Array<HistoriquePrix> = [];
  
  constructor(private historiqueprixservice : HistoriquePrixService) { }

  async ngOnInit() {
    
    this.historiqueprix = await this.historiqueprixservice.get();
  
  }



}
