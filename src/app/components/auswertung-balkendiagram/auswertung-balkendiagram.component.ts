import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { MemoizePipe } from '../../pipes/memoize.pipe';
import { DataService } from '../../data/data.sevice';
import { PartyMatchAcc } from '../../interfaces/antworten.interface';

@Component({
  selector: 'wal-auswertung-balkendiagram',
  imports: [DecimalPipe, MemoizePipe, NgClass],
  templateUrl: './auswertung-balkendiagram.component.html',
})
export class AuswertungBalkendiagramComponent {
  private dataService = inject(DataService);

  public partyMatch = input.required<PartyMatchAcc[]>();
  public partyMatchSorted = computed(() => {
    const partyMatch = [...this.partyMatch()];
    partyMatch.sort((a, b) => b.match - a.match);
    return partyMatch;
  });

  public readonly axeAnnotations: number[] = [...Array(10).keys()].map(x => (x + 1) * 10);
  public readonly partyColorFn = this.dataService.getFraktionsColorizerFn();
}
