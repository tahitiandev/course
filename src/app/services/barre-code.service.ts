import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class BarreCodeService {

  constructor(private barcodeScanner: BarcodeScanner) { }

  public async scanneBarreCode(){
    const barrecode = await this.barcodeScanner.scan()
    return barrecode.text
  }
  
  



}


