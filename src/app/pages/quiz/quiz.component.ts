import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../data/data.sevice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';
import { AngularLineawesomeModule } from 'angular-line-awesome';
import { AntwortenService } from '../../state/antworten.service';
import { Antwort } from '../../interfaces/antworten.interface';
import { AsyncPipe } from '@angular/common';
import { QuizQuestionComponent } from '../../components/quiz-question/quiz-question.component';

@Component({
  selector: 'wal-quiz',
  imports: [RouterModule, AngularLineawesomeModule, AsyncPipe, QuizQuestionComponent],
  templateUrl: './quiz.component.html',
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
    return kategorie ? this.dataService.getFragen(kategorie) : [];
  });

  public prevKategorie = computed(() => {
    const kategorie = this.kategorie();
    return kategorie ? this.dataService.vorherigeKategorie(kategorie) : null;
  });
  public nextKategorie = computed(() => {
    const kategorie = this.kategorie();
    return kategorie ? this.dataService.naechsteKategorie(kategorie) : null;
  });

  public setAntwort(fragen_id: string, antwort: number | null): void {
    this.antwortenService.updateAntwort(fragen_id, antwort);
  }

  public getAntwort(abstimmungs_id: string): Observable<Antwort | undefined> {
    return this.antwortenService
      .selectAntwort(abstimmungs_id)
      .pipe(tap(x => console.log(`antwort auf ${abstimmungs_id} ist ${x}`)));
  }
}
