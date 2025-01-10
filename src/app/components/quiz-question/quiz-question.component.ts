import { Component, computed, input, output } from '@angular/core';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { DeinwalFrage } from '../../data/data.model';
import { Antwort } from '../../state/antworten.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'wal-quiz-question',
  imports: [AngularLineawesomeModule, NgClass],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.css',
})
export class QuizQuestionComponent {
  public frage = input.required<DeinwalFrage>();
  public antwort = input<Antwort | undefined | null>();
  public antwortChange = output<number | null>();

  public setAntwort(a: number, bisher: number | undefined | null): void {
    if (a !== bisher) {
      this.antwortChange.emit(a);
    } else {
      this.antwortChange.emit(null);
    }
  }
}
