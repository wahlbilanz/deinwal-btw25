import { Component, computed, inject, input } from '@angular/core';
import { PartyMatch, PartyMatchAcc } from '../../interfaces/match.interface';
import { DecimalPipe } from '@angular/common';
import { MemoizePipe } from '../../pipes/memoize.pipe';
import { DataService } from '../../data/data.sevice';
import { partyColors } from '../../functions/part-colors.function';

@Component({
  selector: 'wal-auswertung-balkendiagram',
  imports: [DecimalPipe, MemoizePipe],
  templateUrl: './auswertung-balkendiagram.component.html',
  styleUrl: './auswertung-balkendiagram.component.css',
})
export class AuswertungBalkendiagramComponent {
  public partyMatch = input.required<PartyMatchAcc[]>();
  public partyMatchSorted = computed(() => {
    const partyMatch = [...this.partyMatch()];
    partyMatch.sort((a, b) => b.match - a.match);
    return partyMatch;
  });

  public readonly axeAnnotations: number[] = [...Array(10).keys()].map(x => (x + 1) * 10);
  public readonly partyColorFn = partyColors;
}
