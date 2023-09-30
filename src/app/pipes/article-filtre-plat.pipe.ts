import { Pipe, PipeTransform } from '@angular/core';
import { Articles } from '../models/Articles';

@Pipe({
  name: 'articleFiltrePlat'
})
export class ArticleFiltrePlatPipe implements PipeTransform {

  transform(value: Array<Articles>, args?: any) {
    const result =  value.filter((articles) => {
      return articles.libelle.toLowerCase().startsWith(args.toLowerCase())
    });
    return result
  }

}
