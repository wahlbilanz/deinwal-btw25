import { Component, computed, input } from '@angular/core';
import { Antwort, Uebereinstimmung } from '../../interfaces/antworten.interface';
import { KeyValuePipe, NgClass } from '@angular/common';
import { AGREEMENT } from '../../enums/agreement.enum';
import { FraktionBadgeComponent } from '../fraktion-badge/fraktion-badge.component';
import { generateMap } from '../../functions/data-massage.function';

@Component({
  selector: 'wal-quiz-uebereinstimmungs-vorschau',
  imports: [KeyValuePipe, FraktionBadgeComponent, NgClass],
  templateUrl: './quiz-uebereinstimmungs-vorschau.component.html',
})
export class QuizUebereinstimmungsVorschauComponent {
  public antwort = input.required<Antwort | undefined | null>();
  public uebereinstimmungen = computed<{ [p: string]: Uebereinstimmung }>(() => {
    const a = this.antwort();
    if (!a?.uebereinstimmungen) {
      return {};
    }
    return generateMap(
      Object.entries(a?.uebereinstimmungen).filter(x => x[1].agreement === AGREEMENT.AGREE),
    );
  });
}
