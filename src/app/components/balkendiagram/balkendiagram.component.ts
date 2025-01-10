import { Component, computed, input } from '@angular/core';
import { PartyMatch } from '../../state/match.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'wal-balkendiagram',
  imports: [DecimalPipe],
  templateUrl: './balkendiagram.component.html',
  styleUrl: './balkendiagram.component.css',
})
export class BalkendiagramComponent {
  public partyMatch = input.required<PartyMatch[]>();
  public partyMatchSorted = computed(() => {
    const partyMatch = [...this.partyMatch()];
    partyMatch.sort((a, b) => b.match - a.match);
    return partyMatch;
  });

  public readonly axeAnnotations: number[] = [...Array(10).keys()].map(x => (x + 1) * 10);
}
