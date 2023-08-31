import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class BarreCodeService {

  constructor() { }

  // Etape 1 : Remplacer le <ion-content> de votre page html
  //<ion-content [fullscreen]="true" [style.visibility]="content_visibility">

  // Etape 2 : Mettre ces deux variables dans le .ts de la page souhaité
  // content_visibility = '';

  private async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch(e) {
      return e
    }
  }

  async STEP1EnableCameraReturnVisility(){

    const permission = await this.checkPermission();

    if(!permission){
      return "";
    }
    
    await BarcodeScanner.hideBackground();
    document.querySelector('body')?.classList.add('scanner-active');
    return 'hidden';

  }

  // C'est ici qu'on récupère le code barre
  async STEP2ScanneBarCodeAndReturnContent(){
    const result = await BarcodeScanner.startScan();
    return result.content;

  }

  STEP3disableCameraReturnVisility() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    return '';
  }

}
