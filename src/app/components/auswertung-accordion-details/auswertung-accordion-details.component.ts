import { Component, input, Input } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { QuestionMatch } from '../../interfaces/match.interface';
import { Abstimmungsergebnis, DeinwalFrage } from '../../interfaces/data.interface';
import { AntwortIconComponent } from '../antwort-icon/antwort-icon.component';
import { MemoizePipe } from '../../pipes/memoize.pipe';

@Component({
  selector: 'wal-auswertung-accordion-details',
  imports: [KeyValuePipe, AntwortIconComponent, MemoizePipe],
  templateUrl: './auswertung-accordion-details.component.html',
  styleUrl: './auswertung-accordion-details.component.css',
})
export class AuswertungAccordionDetailsComponent {
  public abstimmungsErgebnis = input.required<QuestionMatch>();
  public abstimmung = input.required<DeinwalFrage | undefined>();

  public barsize(value: number | undefined, gesamt: number | undefined): number {
    if (value === undefined || gesamt === undefined) {
      return 0;
    }
    if (value > 0 && gesamt > 0) {
      return (100 * value) / gesamt;
    }
    return 0;
  }

  public titleize(ergebnis: Abstimmungsergebnis | undefined): string {
    if (!ergebnis) {
      return '';
    }
    return `${ergebnis.ja} Ja-Stimmen — ${ergebnis.nein} Nein-Stimmen — ${ergebnis.enthalten} Enthaltungen (Gesamt: ${ergebnis.gesamt})`;
  }
}
