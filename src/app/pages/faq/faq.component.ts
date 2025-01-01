import { Component, effect, ElementRef, inject, OnInit, viewChildren } from '@angular/core';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AntwortenService } from '../../state/antworten.service';

interface FaqItem {
  question: string;
  answer: SafeHtml;
  hidden: boolean;
}

@Component({
  selector: 'wal-faq',
  imports: [AngularLineawesomeModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent implements OnInit {
  private hash = (s: string): number =>
    s.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

  private antwortenService = inject(AntwortenService);

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

  public ngOnInit(): void {
    console.log('test');
  }

  public clearData(): void {
    console.log('clear');
    this.antwortenService.clearStore();
  }
}
