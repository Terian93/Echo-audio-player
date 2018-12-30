import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const newValue = Math.floor(value) + '%';
    return newValue;
  }

}
