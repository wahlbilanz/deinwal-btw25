import { Component, input } from '@angular/core';
import { DeinwalFrage } from '../../interfaces/data.interface';
import { QuestionMatch } from '../../interfaces/match.interface';
import { AuswertungAccordionDetailsComponent } from '../auswertung-accordion-details/auswertung-accordion-details.component';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { AntwortIconComponent } from '../antwort-icon/antwort-icon.component';

@Component({
  selector: 'wal-auswertung-accordion-item',
  imports: [AuswertungAccordionDetailsComponent, AngularLineawesomeModule, AntwortIconComponent],
  templateUrl: './auswertung-accordion-item.component.html',
  styleUrl: './auswertung-accordion-item.component.css',
})
export class AuswertungAccordionItemComponent {
  public abstimmung = input.required<DeinwalFrage | undefined>();
  public result = input.required<QuestionMatch>();
}
