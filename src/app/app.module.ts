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

@NgModule({
  declarations: [
    AppComponent,
    OrderByArticlePipe,
    // ArticlesFilterPipe
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ,IonicStorageModule.forRoot(),
  ],
  exports : [
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
