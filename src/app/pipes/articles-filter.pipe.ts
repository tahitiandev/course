import { Pipe, PipeTransform } from '@angular/core';
import { Articles } from '../models/articles';

@Pipe({
  name: 'articlesFilter'
})
export class ArticlesFilterPipe implements PipeTransform {

  transform(value: Array<Articles>, args?: any) {
    const result =  value.filter((articles) => {
      return articles.libelle.toLowerCase().startsWith(args.toLowerCase())
    });
    return result
  }

}
