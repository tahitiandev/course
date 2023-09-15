import { Pipe, PipeTransform } from '@angular/core';
import { Articles } from '../models/Articles';

@Pipe({
  name: 'articleFiltreMemo'
})
export class ArticleFiltreMemoPipe implements PipeTransform {

  transform(value: Array<Articles>, args?: any) {
    const result =  value.filter((articles) => {
      return articles.libelle.toLowerCase().startsWith(args.toLowerCase())
    });
    return result
  }

}
