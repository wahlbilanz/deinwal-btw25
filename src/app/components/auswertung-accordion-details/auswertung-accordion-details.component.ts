import { Component, input } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { Abstimmungsergebnis, DeinwalFrage } from '../../interfaces/data.interface';
import { AntwortIconComponent } from '../antwort-icon/antwort-icon.component';
import { MemoizePipe } from '../../pipes/memoize.pipe';
import { FraktionBadgeComponent } from '../fraktion-badge/fraktion-badge.component';
import { Antwort } from '../../interfaces/antworten.interface';

@Component({
  selector: 'wal-auswertung-accordion-details',
  imports: [KeyValuePipe, AntwortIconComponent, MemoizePipe, FraktionBadgeComponent],
  templateUrl: './auswertung-accordion-details.component.html',
})
export class AuswertungAccordionDetailsComponent {
  public antwort = input.required<Antwort>();
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
