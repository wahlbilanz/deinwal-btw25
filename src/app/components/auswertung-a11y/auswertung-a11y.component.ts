import { Component, computed, input } from '@angular/core';
import { PartyMatch } from '../../state/match.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'wal-auswertung-a11y',
  imports: [DecimalPipe],
  templateUrl: './auswertung-a11y.component.html',
  styleUrl: './auswertung-a11y.component.css',
})
export class AuswertungA11yComponent {
  public partyMatch = input.required<PartyMatch[]>();
  public partyMatchSorted = computed(() => {
    const partyMatch = [...this.partyMatch()];
    partyMatch.sort((a, b) => b.match - a.match);
    return partyMatch;
  });
}
