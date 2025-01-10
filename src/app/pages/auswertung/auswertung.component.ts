import { Component, computed, inject } from '@angular/core';
import { AntwortenService } from '../../state/antworten.service';
import { BalkendiagramComponent } from '../../components/balkendiagram/balkendiagram.component';
import { PartyMatch } from '../../state/match.interface';

@Component({
  selector: 'wal-auswertung',
  imports: [BalkendiagramComponent],
  templateUrl: './auswertung.component.html',
  styleUrl: './auswertung.component.css',
})
export class AuswertungComponent {
  private antwortenService = inject(AntwortenService);
  public partyMatch = computed<PartyMatch[]>(() => {
    return [
      {
        party: 'Eine Partei',
        match: 10.5,
        color: '#220066',
      },
      {
        party: 'Und noch eine Partei',
        match: 48.7,
        color: '#ff0000',
      },
      {
        party: 'keine Partei',
        match: 33.3,
        color: '#f0ff88',
      },
    ];
  });
}
