import { Component, computed, inject, signal } from '@angular/core';
import { AntwortenService } from '../../state/antworten.service';
import { AuswertungBalkendiagramComponent } from '../../components/auswertung-balkendiagram/auswertung-balkendiagram.component';
import { PartyMatch } from '../../interfaces/match.interface';
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

  public balkendiagram = signal<boolean>(true);
  public antworten = toSignal(this.antwortenService.selectAntworten());
  public partyMatch = computed(() => {
    return this.datenService.matchAntworten(this.antworten());
  });
  // public partyMatch = computed<PartyMatch[]>(() => {
  //   return [
  //     {
  //       party: 'Eine Partei',
  //       match: 10.5,
  //       color: '#220066',
  //     },
  //     {
  //       party: 'Und noch eine Partei',
  //       match: 48.7,
  //       color: '#ff0000',
  //     },
  //     {
  //       party: 'keine Partei',
  //       match: 33.3,
  //       color: '#f0ff88',
  //     },
  //   ];
  // });

  public setBalkendiagramm(b: boolean): void {
    this.balkendiagram.set(b);
  }
}
