import { Component, computed, inject } from '@angular/core';
import { AntwortenService } from '../../state/antworten.service';
import { AuswertungBalkendiagramComponent } from '../../components/auswertung-balkendiagram/auswertung-balkendiagram.component';
import { AuswertungA11yComponent } from '../../components/auswertung-a11y/auswertung-a11y.component';
import { AuswertungTabelleComponent } from '../../components/auswertung-tabelle/auswertung-tabelle.component';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { PartyMatchAcc } from '../../interfaces/antworten.interface';

@Component({
  selector: 'wal-auswertung',
  imports: [
    AuswertungBalkendiagramComponent,
    AuswertungA11yComponent,
    AuswertungTabelleComponent,
    NgClass,
  ],
  templateUrl: './auswertung.component.html',
})
export class AuswertungComponent {
  private antwortenService = inject(AntwortenService);

  public balkenTab = toSignal(this.antwortenService.balkenDiagramm$);
  public partyDetailMatch = toSignal(this.antwortenService.selectAntworten());
  public partyMatch = computed(() => {
    const matches = this.partyDetailMatch();
    if (!matches) {
      return [];
    }
    const numAbstimmungen = Object.entries(matches).length;
    const fraktionsMatches: { [fraktion: string]: PartyMatchAcc } = {};
    for (const match of Object.values(matches)) {
      for (const [fraktion, m] of Object.entries(match.uebereinstimmungen)) {
        if (!fraktionsMatches[fraktion]) {
          fraktionsMatches[fraktion] = { party: fraktion, match: 0 };
        }
        fraktionsMatches[fraktion].match += m.uebereinstimmung / numAbstimmungen;
      }
    }
    return Object.values(fraktionsMatches);
  });

  public setBalkenTab(b: boolean): void {
    this.antwortenService.setBalkenDiagramm(b);
  }
}
