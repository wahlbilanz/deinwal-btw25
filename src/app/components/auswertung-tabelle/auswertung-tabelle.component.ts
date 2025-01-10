import { Component, input } from '@angular/core';
import { PartyMatch } from '../../state/match.interface';

@Component({
  selector: 'wal-auswertung-tabelle',
  imports: [],
  templateUrl: './auswertung-tabelle.component.html',
  styleUrl: './auswertung-tabelle.component.css',
})
export class AuswertungTabelleComponent {
  public partyMatch = input.required<PartyMatch[]>();
}
