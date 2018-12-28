import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (isNaN(value)) {
      return '0:00';
    } else {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60);
      const time = seconds < 10
        ? minutes + ':0' + seconds
        : minutes + ':' + seconds;
      return time;
    }
  }

}
