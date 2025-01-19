import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memoize',
  standalone: true,
})
export class MemoizePipe implements PipeTransform {
  public transform<A, B, C extends unknown[]>(
    value: A,
    handler: (v: A, ...args: C) => B,
    ...args: C
  ): B {
    return handler(value, ...args);
  }
}
