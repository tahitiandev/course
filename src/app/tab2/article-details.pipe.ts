import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleDetails'
})
export class ArticleDetailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
