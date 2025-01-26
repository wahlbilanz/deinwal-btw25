import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MemoizePipe } from '../../pipes/memoize.pipe';
import { DataService } from '../../data/data.sevice';
import { PartyMatchAcc } from '../../interfaces/antworten.interface';

@Component({
  selector: 'wal-auswertung-a11y',
  imports: [DecimalPipe, MemoizePipe],
  templateUrl: './auswertung-a11y.component.html',
})
export class AuswertungA11yComponent {
  private dataService = inject(DataService);
  public partyMatch = input.required<PartyMatchAcc[]>();
  public partyMatchSorted = computed(() => {
    const partyMatch = [...this.partyMatch()];
    partyMatch.sort((a, b) => b.match - a.match);
    return partyMatch;
  });
  protected readonly partyColorFn = this.dataService.getFraktionsColorizerFn();
}
