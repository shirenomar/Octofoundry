import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: any[], value: string): any[] {
    if (!values) {
      return [];
    }
    if (!value) {
      return values;
    }
    return values.filter(val => val.name.toLowerCase().includes(value.toLowerCase()));
  }

}
