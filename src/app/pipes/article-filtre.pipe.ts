import { Pipe, PipeTransform } from '@angular/core';
import { Articles } from '../models/Articles';

@Pipe({
  name: 'articleFiltre'
})
export class ArticleFiltrePipe implements PipeTransform {

  // transform(value: Array<Articles>, args?: any) {
  //   const result =  value.filter((articles) => {
  //     return articles.libelle.toLowerCase().startsWith(args.toLowerCase())
  //   });
  //   return result
  // }

  transform(value: Array<Articles>, args?: any) {
    if (!args || args.trim() === '') {
      return value;
    }
    const searchTerm = args.toLowerCase();
    return value.filter(article => article.libelle.toLowerCase().includes(searchTerm));
  }

}
