import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseList'
})
export class ReverseListPipe implements PipeTransform {

  transform(value: Array<object>, args?: any): Array<object> {
    const reversed = value.reverse();
    return reversed;
  }

}
