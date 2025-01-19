import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphanum',
})
export class AlphanumPipe implements PipeTransform {
  public transform(value: string): string {
    return value.replace(/\W/gi, '');
  }
}
