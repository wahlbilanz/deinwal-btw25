import { Component, computed, inject, signal } from '@angular/core';
import { AntwortenService } from '../../state/antworten.service';
import { AuswertungBalkendiagramComponent } from '../../components/auswertung-balkendiagram/auswertung-balkendiagram.component';
import { PartyMatch, PartyMatchAcc } from '../../interfaces/match.interface';
import { AuswertungA11yComponent } from '../../components/auswertung-a11y/auswertung-a11y.component';
import { AuswertungTabelleComponent } from '../../components/auswertung-tabelle/auswertung-tabelle.component';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DataService } from '../../data/data.sevice';

@Component({
  selector: 'wal-auswertung',
  imports: [
    AuswertungBalkendiagramComponent,
    AuswertungA11yComponent,
    AuswertungTabelleComponent,
    NgClass,
  ],
  templateUrl: './auswertung.component.html',
  styleUrl: './auswertung.component.css',
})
export class AuswertungComponent {
  private datenService = inject(DataService);
  private antwortenService = inject(AntwortenService);

  public balkenTab = toSignal(this.antwortenService.balkenDiagramm$);
  public antworten = toSignal(this.antwortenService.selectAntworten());
  public partyDetailMatch = computed(() => {
    return this.datenService.matchAntworten(this.antworten());
  });
  public partyMatch = computed(() => {
    const matches = this.partyDetailMatch();
    console.log(matches);
    const numAbstimmungen = Object.entries(matches).length;
    const fraktionsMatches: { [fraktion: string]: PartyMatchAcc } = {};
    for (const match of Object.values(matches)) {
      console.log('match', match);
      for (const [fraktion, m] of Object.entries(match.partyMatches)) {
        console.log('fraktion', fraktion, m);
        if (!fraktionsMatches[fraktion]) {
          fraktionsMatches[fraktion] = { party: fraktion, match: 0 };
        }
        fraktionsMatches[fraktion].match += m / numAbstimmungen;
        console.log(fraktionsMatches);
      }
    }
    console.log(fraktionsMatches);
    return Object.values(fraktionsMatches);
  });

  public setBalkenTab(b: boolean): void {
    this.antwortenService.setBalkenDiagramm(b);
  }
}
