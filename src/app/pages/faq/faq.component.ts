import { Component, effect, ElementRef, inject, viewChildren } from '@angular/core';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { AntwortenService } from '../../state/antworten.service';
import { AsyncPipe } from '@angular/common';
import { deinwalAlternativen } from '../../consts/alternativen.const';

@Component({
  selector: 'wal-faq',
  imports: [AngularLineawesomeModule, AsyncPipe],
  templateUrl: './faq.component.html',
})
export class FaqComponent {
  private hash = (s: string): number =>
    s.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

  private antwortenService = inject(AntwortenService);
  public readonly alternativen = deinwalAlternativen;
  public readonly hasAntworten$ = this.antwortenService.hasAntworten();

  public questions = viewChildren<ElementRef>('question');

  public contents: { question: string; id: string }[] = [];

  public constructor() {
    effect(() => {
      this.contents = this.questions().map(e => {
        const question = e.nativeElement.textContent;
        const id = `q-${this.hash(question)}`;
        e.nativeElement.id = id;
        return { question, id };
      });
    });
  }

  public clearData(): void {
    this.antwortenService.clearStore();
  }
}
