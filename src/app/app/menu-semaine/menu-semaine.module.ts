import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuSemainePageRoutingModule } from './menu-semaine-routing.module';

import { MenuSemainePage } from './menu-semaine.page';
import { MenuSemaineRecherchePlatComponent } from '../menu-semaine-recherche-plat/menu-semaine-recherche-plat.component';
import { ArticleFiltrePlatMenuPipe } from 'src/app/pipes/article-filtre-plat-menu.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuSemainePageRoutingModule
  ],
  declarations: [MenuSemainePage, MenuSemaineRecherchePlatComponent, ArticleFiltrePlatMenuPipe]
})
export class MenuSemainePageModule {}
