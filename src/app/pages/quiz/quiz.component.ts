import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../data/data.sevice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { AntwortenService } from '../../state/antworten.service';
import { Antwort } from '../../state/antworten.interface';
import { AsyncPipe, NgClass } from '@angular/common';
@Component({
  selector: 'wal-quiz',
  imports: [RouterModule, AngularLineawesomeModule, AsyncPipe, NgClass],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);
  private readonly antwortenService = inject(AntwortenService);

  public readonly ersteKategorie = this.dataService.getFirstKategorie();
  public kategorie = toSignal(
    this.activatedRoute.paramMap.pipe(
      map(params => {
        const k = params.get('kategorie');
        if (!k) {
          this.router
            .navigate(['/quiz', this.dataService.getFirstKategorie()])
            .catch(console.error);
        }
        return k;
      }),
    ),
  );
  public fragen = computed(() => {
    const kategorie = this.kategorie();
    // console.log(kategorie);
    if (kategorie) {
      const fragen = this.dataService.getFragen(kategorie);
      // console.log(fragen);
      return fragen;
    }
    // console.error('no kategorie');
    return [];
  });

  public prevKategorie = computed(() => {
    const kategorie = this.kategorie();
    console.log('prev', kategorie);
    if (kategorie) {
      return this.dataService.getPrevKategorie(kategorie);
    }
    return null;
  });
  public nextKategorie = computed(() => {
    const kategorie = this.kategorie();
    if (kategorie) {
      return this.dataService.getNextKategorie(kategorie);
    }
    return null;
  });

  public setAntwort(fragen_id: string, antwort: number, bisher?: Antwort | null): void {
    console.log('antwort', fragen_id, antwort);
    this.antwortenService.updateAntwort(fragen_id, antwort === bisher?.antwort ? null : antwort);
  }

  public getAntwort(abstimmungs_id: string): Observable<Antwort | undefined> {
    return this.antwortenService.selectAntwort(abstimmungs_id);
  }
}
