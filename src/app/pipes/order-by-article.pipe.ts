import { Pipe, PipeTransform } from '@angular/core';
import { Articles } from '../models/articles';

@Pipe({
  name: 'orderByArticle'
})
export class OrderByArticlePipe implements PipeTransform {

  transform(value: Array<Articles>) {

    return value.sort((a,b) => {
      
      let x = a.libelle.toLowerCase()
      let y = b.libelle.toLowerCase()

      if(x < y){
        return -1;
      }else{
        return 1;
      }      
      return 0;
    })
  }

}
