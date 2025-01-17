import { DeinwalErgebnis, DeinwalFragenErgebnis } from '../interfaces/data.interface';
import { Antwort } from '../interfaces/antworten.interface';
import { QuestionMatch } from '../interfaces/match.interface';
import { generateMap } from './data-massage.function';

function findMatch(nutzer: number | null | undefined, fraktion: DeinwalErgebnis): number {
  if (nutzer === undefined || nutzer === null) {
    return 0;
  }
  if (nutzer > 0) {
    return fraktion.ja / fraktion.gesamt + (0.5 * fraktion.enthalten) / fraktion.gesamt;
  }
  if (nutzer < 0) {
    return fraktion.nein / fraktion.gesamt + (0.5 * fraktion.enthalten) / fraktion.gesamt;
  }
  return (
    (0.5 * fraktion.ja) / fraktion.gesamt +
    (0.5 * fraktion.nein) / fraktion.gesamt +
    fraktion.enthalten / fraktion.gesamt
  );
}

export function partyMatcher(
  antwort: Antwort,
  fraktionsErgebnisse: DeinwalFragenErgebnis,
): QuestionMatch {
  console.log(antwort, fraktionsErgebnisse);
  if (!fraktionsErgebnisse) {
    console.error(`missing fraktionsergebnmisse fuer abstimmung ${antwort.abstimmungs_id}... :/`);

    return { abstimmungs_id: antwort.abstimmungs_id, partyMatches: {} };
  }
  return {
    abstimmungs_id: antwort.abstimmungs_id,
    partyMatches: generateMap(
      Object.entries(fraktionsErgebnisse).map(([fraktion, ergebnis]) => [
        fraktion,
        findMatch(antwort.antwort, ergebnis),
      ]),
    ),
  };
}
