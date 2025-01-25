import { Component, computed, inject, input } from '@angular/core';
import { QuestionMatchMap } from '../../interfaces/match.interface';
import { DataService } from '../../data/data.sevice';
import { KeyValuePipe } from '@angular/common';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { AuswertungAccordionItemComponent } from '../auswertung-accordion-item/auswertung-accordion-item.component';
import { MemoizePipe } from '../../pipes/memoize.pipe';

@Component({
  selector: 'wal-auswertung-tabelle',
  imports: [KeyValuePipe, AngularLineawesomeModule, AuswertungAccordionItemComponent, MemoizePipe],
  templateUrl: './auswertung-tabelle.component.html',
})
export class AuswertungTabelleComponent {
  private dataService = inject(DataService);

  public partyMatch = input.required<QuestionMatchMap>();
  public fragenResolverFn = this.dataService.getAbstimmungsResolverFn();

  public partyMatchTable = computed(() => {
    const categorisedPartyMatchMap: { [group: string]: QuestionMatchMap } = {};
    const matches = this.partyMatch();
    for (const abstimmungs_id of Object.keys(matches)) {
      const abstimmung = matches[abstimmungs_id];
      const kategorie = this.dataService.getKategorie(abstimmungs_id);
      console.log(abstimmung, kategorie);
      if (!kategorie) {
        continue;
      }
      if (!categorisedPartyMatchMap[kategorie]) {
        categorisedPartyMatchMap[kategorie] = {};
      }
      categorisedPartyMatchMap[kategorie][abstimmungs_id] = abstimmung;
    }
    console.log(categorisedPartyMatchMap);
    return categorisedPartyMatchMap;
  });
}
