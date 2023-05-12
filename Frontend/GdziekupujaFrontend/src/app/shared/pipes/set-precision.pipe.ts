import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setPrecision'
})
export class SetPrecisionPipe implements PipeTransform {

  transform(price: number): string {
    let newPrice = price.toString();

    if (newPrice.includes('.') && newPrice.charAt(newPrice.length - 2) === '.') {
      newPrice = newPrice + '0';
    }

    if (newPrice.length < 4 && !newPrice.includes('.')) {
      newPrice = newPrice + '.00';
    }
    return newPrice;
  }
}