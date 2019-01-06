import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampDate'
})
export class TimestampDatePipe implements PipeTransform {

  transform(timestamp: any, args?: any): any {
    const date = timestamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10
      ? '0' + (date.getMonth() + 1)
      : '' + (date.getMonth() + 1);
    const day = (date.getDate() + 1) < 10
      ? '0' + (date.getDate() + 1)
      : '' + (date.getDate() + 1);
    return `${hour}:${minute} ${day}.${month}.${year}`;
  }

}
