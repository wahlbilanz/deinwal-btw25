import { Component, computed, input } from '@angular/core';
import { Antwort } from '../../interfaces/antworten.interface';
import { KeyValuePipe } from '@angular/common';
import { AGREEMENT } from '../../enums/agreement.enum';
import { FraktionBadgeComponent } from '../fraktion-badge/fraktion-badge.component';
import { generateMap } from '../../functions/data-massage.function';
import { Match } from '../../interfaces/match.interface';

@Component({
  selector: 'wal-quiz-uebereinstimmungs-vorschau',
  imports: [KeyValuePipe, FraktionBadgeComponent],
  templateUrl: './quiz-uebereinstimmungs-vorschau.component.html',
  styleUrl: './quiz-uebereinstimmungs-vorschau.component.css',
})
export class QuizUebereinstimmungsVorschauComponent {
  public antwort = input.required<Antwort | undefined | null>();
  public uebereinstimmungen = computed<{ [p: string]: Match }>(() => {
    const a = this.antwort();
    if (!a) {
      return {};
    }
    return generateMap(
      Object.entries(a?.uebereinstimmungen).filter(x => x[1].agreement === AGREEMENT.AGREE),
    );
  });
}
