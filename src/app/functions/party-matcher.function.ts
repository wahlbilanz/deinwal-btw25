import { DeinwalErgebnis, DeinwalFragenErgebnis } from '../interfaces/data.interface';
import { Antwort, Match } from '../interfaces/antworten.interface';
import { generateMap } from './data-massage.function';
import { computeAgreement } from './aggrement.function';
import { partyDecision } from './party-decision.function';

function findMatch(nutzer: number | null | undefined, fraktion: DeinwalErgebnis): Match {
  const match: Partial<Match> = {
    agreement: computeAgreement(partyDecision(fraktion), nutzer),
    fraktionsEntscheidung: fraktion,
  };
  if (nutzer === undefined || nutzer === null) {
    return { ...match, uebereinstimmung: 0 };
  }
  if (nutzer > 0) {
    return {
      ...match,
      uebereinstimmung:
        fraktion.ja / fraktion.gesamt + (0.5 * fraktion.enthalten) / fraktion.gesamt,
    };
  }
  if (nutzer < 0) {
    return {
      ...match,
      uebereinstimmung:
        fraktion.nein / fraktion.gesamt + (0.5 * fraktion.enthalten) / fraktion.gesamt,
    };
  }

  return {
    ...match,
    uebereinstimmung:
      (0.5 * fraktion.ja) / fraktion.gesamt +
      (0.5 * fraktion.nein) / fraktion.gesamt +
      fraktion.enthalten / fraktion.gesamt,
  };
}

export function berechneUebereinstimmungen(
  nutzer: number | null,
  fraktionsErgebnisse: DeinwalFragenErgebnis,
): { [key: string]: Match } {
  if (!fraktionsErgebnisse) {
    return {};
  }
  return generateMap(
    Object.entries(fraktionsErgebnisse).map(([fraktion, ergebnis]) => [
      fraktion,
      findMatch(nutzer, ergebnis),
    ]),
  );
}

export function partyMatcher(
  antwort: Antwort,
  fraktionsErgebnisse: DeinwalFragenErgebnis,
): Antwort {
  if (!fraktionsErgebnisse) {
    console.error(`missing fraktionsergebnmisse fuer abstimmung ${antwort.abstimmungs_id}... :/`);

    return {
      abstimmungs_id: antwort.abstimmungs_id,
      uebereinstimmungen: {},
      antwort: antwort.antwort,
    };
  }
  return {
    abstimmungs_id: antwort.abstimmungs_id,
    uebereinstimmungen: berechneUebereinstimmungen(antwort.antwort, fraktionsErgebnisse),
    antwort: antwort.antwort,
  };
}
