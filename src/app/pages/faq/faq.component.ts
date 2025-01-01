import { Component } from '@angular/core';
import { AngularLineawesomeModule } from 'angular-line-awesome';

@Component({
  selector: 'wal-faq',
  imports: [AngularLineawesomeModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  public faqItems = [
    {
      question: 'Schon wieder ein neues Design?',
      answer:
        'Genau. Wie ihr wahrscheinlich ahnt sind wir keine UI/UX-Experten, versuchen uns natürlich stetig zu verbessern! Manchmal muss man dafür auch mal einen Schritt zurück treten. Hauptsache pixelimperfekt!',
    },
  ].map(i => ({ ...i, hidden: true }));

  public toggle(eintrag: { question: string; answer: string; hidden: boolean }): void {
    eintrag.hidden = !eintrag.hidden;
  }
}
