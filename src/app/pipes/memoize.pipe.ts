import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memoize',
  standalone: true,
})
export class MemoizePipe implements PipeTransform {
  public transform<A, B>(value: A, handler: (v: A) => B): B {
    return handler(value);
  }
}
