import { Component, computed, input } from '@angular/core';
import { PartyMatch, PartyMatchAcc } from '../../interfaces/match.interface';
import { DecimalPipe } from '@angular/common';
import { partyColors } from '../../functions/part-colors.function';
import { MemoizePipe } from '../../pipes/memoize.pipe';

@Component({
  selector: 'wal-auswertung-a11y',
  imports: [DecimalPipe, MemoizePipe],
  templateUrl: './auswertung-a11y.component.html',
  styleUrl: './auswertung-a11y.component.css',
})
export class AuswertungA11yComponent {
  public partyMatch = input.required<PartyMatchAcc[]>();
  public partyMatchSorted = computed(() => {
    const partyMatch = [...this.partyMatch()];
    partyMatch.sort((a, b) => b.match - a.match);
    return partyMatch;
  });
  protected readonly partyColorFn = partyColors;
}
