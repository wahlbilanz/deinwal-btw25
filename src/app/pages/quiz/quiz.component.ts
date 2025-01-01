import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../data/data.sevice';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AngularLineawesomeModule } from 'angular-line-awesome';
@Component({
  selector: 'wal-quiz',
  imports: [RouterModule, AngularLineawesomeModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent  {

public antwort(fragen_id: string,antwort: number): void {
console.log("antwort", fragen_id, antwort);
}

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);
private readonly router = inject(Router);

public readonly ersteKategorie = this.dataService.getFirstKategorie();
public kategorie=toSignal(this.activatedRoute.paramMap.pipe(map(params=>params.get('kategorie'))));
public fragen = computed(() => {
const kategorie = this.kategorie();
// console.log(kategorie);
if (kategorie){
  const fragen = this.dataService.getFragen(kategorie);
  // console.log(fragen);
 return fragen;
}
    // console.error('no kategorie');
    return [];
});

public prevKategorie = computed(() => {
  const kategorie = this.kategorie();
  console.log("prev",kategorie);
  if (kategorie){
    return this.dataService.getPrevKategorie(kategorie);
  }
  return null;
});
public nextKategorie = computed(() => {
  const kategorie = this.kategorie();
  if (kategorie){
    return this.dataService.getNextKategorie(kategorie);
  }
  return null;
});



}
