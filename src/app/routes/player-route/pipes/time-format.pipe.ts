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
      // const miliseconds = Math.round((value - (minutes * 60 + seconds)) * 1000) / 1000;
      // return miliseconds > 0 && value < 1
      //   ? (miliseconds * 1000) + 'ms'
      //   : time;
    }
  }

}
