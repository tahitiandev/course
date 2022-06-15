import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByArticlePipe } from './pipes/order-by-article.pipe';
import { ArticlesFilterPipe } from './pipes/articles-filter.pipe';
import { ArticleListPageModule } from './tab2/article-list/article-list.module';

// import { AngularFireModule } from '@angular/fire/';
// import { AngularFirestoreModule } from '@angular/fire/firestore/';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore/';

var firebaseConfig = {
  apiKey: "AIzaSyAdclpMG7P3oABNQk02ZfvqVWG_wJMQBdY",
  authDomain: "course-94b87.firebaseapp.com",
  projectId: "course-94b87",
  storageBucket: "course-94b87.appspot.com",
  messagingSenderId: "411521934916",
  appId: "1:411521934916:web:3b37819ad2aedb52fe7e11",
  measurementId: "G-XC0RJ57TEX"
};


import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
// import { PlatArticleSearchPipe } from './pipes/plat-article-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrderByArticlePipe,
    // PlatArticleSearchPipe,
    // ArticlesFilterPipe
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ,IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  exports : [
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BarcodeScanner],
  bootstrap: [AppComponent],
})
export class AppModule {}
