import { Component, computed, input } from '@angular/core';
import { DeinwalFrage } from '../../interfaces/data.interface';
import { AuswertungAccordionDetailsComponent } from '../auswertung-accordion-details/auswertung-accordion-details.component';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { AntwortIconComponent } from '../antwort-icon/antwort-icon.component';
import { Antwort, Uebereinstimmung } from '../../interfaces/antworten.interface';
import { FraktionBadgeComponent } from '../fraktion-badge/fraktion-badge.component';
import { KeyValuePipe } from '@angular/common';
import { generateMap } from '../../functions/data-massage.function';
import { AGREEMENT } from '../../enums/agreement.enum';

@Component({
  selector: 'wal-auswertung-accordion-item',
  imports: [
    AuswertungAccordionDetailsComponent,
    AngularLineawesomeModule,
    AntwortIconComponent,
    FraktionBadgeComponent,
    KeyValuePipe,
  ],
  templateUrl: './auswertung-accordion-item.component.html',
})
export class AuswertungAccordionItemComponent {
  public abstimmung = input.required<DeinwalFrage | undefined>();
  public antwort = input.required<Antwort>();
  public uebereinstimmungen = computed<{ [p: string]: Uebereinstimmung }>(() => {
    const a = this.antwort();
    if (!a?.uebereinstimmungen) {
      return {};
    }
    return generateMap(
      Object.entries(a?.uebereinstimmungen).filter(x => x[1].agreement === AGREEMENT.AGREE),
    );
  });
}
