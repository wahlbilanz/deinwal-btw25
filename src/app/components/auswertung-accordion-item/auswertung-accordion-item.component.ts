import { Component, input } from '@angular/core';
import { DeinwalFrage } from '../../interfaces/data.interface';
import { AuswertungAccordionDetailsComponent } from '../auswertung-accordion-details/auswertung-accordion-details.component';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { AntwortIconComponent } from '../antwort-icon/antwort-icon.component';
import { Antwort } from '../../interfaces/antworten.interface';

@Component({
  selector: 'wal-auswertung-accordion-item',
  imports: [AuswertungAccordionDetailsComponent, AngularLineawesomeModule, AntwortIconComponent],
  templateUrl: './auswertung-accordion-item.component.html',
})
export class AuswertungAccordionItemComponent {
  public abstimmung = input.required<DeinwalFrage | undefined>();
  public antwort = input.required<Antwort>();
}
