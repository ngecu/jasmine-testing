import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './interfaces/product';

@Pipe({
  name: 'customFilterPipe'
})
export class CustomFilterPipePipe implements PipeTransform {

  transform(items:Product[], searchText: string): Product[] {
    if (!items || !searchText) {
      return items;
    }
    // searchText = searchText.toLowerCase();

    const filtered : Product[] = []

    for (let item of items) {
      if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
        filtered.push(item)
      }
    }
    return filtered;
  }
}
