import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackTimeFormat'
})
export class TrackTimeFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (isNaN(value)) {
      return '0:00';
    } else {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60);
      const time = seconds < 10
        ? minutes + ':0' + seconds
        : minutes + ':' + seconds;
      const miliseconds = Math.round((value - (minutes * 60 + seconds)) * 1000) / 1000;
      return miliseconds > 0 && value < 1
        ? (miliseconds * 1000) + 'ms'
        : time;
    }
  }

}
