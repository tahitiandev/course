import { Pipe, PipeTransform } from '@angular/core';
import { Plats } from '../models/Plats';

@Pipe({
  name: 'articleFiltrePlatMenu'
})
export class ArticleFiltrePlatMenuPipe implements PipeTransform {

  transform(value: Array<Plats>, args?: any) {
    if (!args || args.trim() === '') {
      return value;
    }
    const searchTerm = args.toLowerCase();
    return value.filter(plat => plat.libelle.toLowerCase().includes(searchTerm));
  }

}