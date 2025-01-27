import {
  DeinwalErgebnis,
  DeinwalFrage,
  DeinwalFragenErgebnis,
  DeinwalFragenErgebnisse,
} from '../interfaces/data.interface';
import { partyDecision } from './party-decision.function';

interface DeinwalErgebnisInput {
  abstimmungs_id: string;
  fraktion: string;
  ja: number;
  nein: number;
  enthalten: number;
}
type DeinwalFragenErgebnisInput = { [fraktion: string]: DeinwalErgebnisInput };
type DeinwalFragenErgebnisseInput = { [abstimmungs_id: string]: DeinwalFragenErgebnisInput };

export function generateMap<V>(entries: [string, V][]): {
  [key: string]: V;
} {
  return entries.reduce((accum: { [fraktion: string]: V }, [k, v]) => {
    accum[k] = v;
    return accum;
  }, {});
}

export function generateDeinwalErgebnis(input: DeinwalErgebnisInput): DeinwalErgebnis {
  const gesamt = input.ja + input.nein + input.enthalten;

  return {
    ...input,
    gesamt,
    decision: partyDecision({ ...input, gesamt }),
  };
}

export function generateDeinwalFragenErgebnis(
  input: DeinwalFragenErgebnisInput,
): DeinwalFragenErgebnis {
  return generateMap(
    Object.entries(input)
      .filter(([party]) => party.toLowerCase() !== 'fraktionslos')
      .map(([party, vote]) => [party, generateDeinwalErgebnis(vote)] as [string, DeinwalErgebnis]),
  );
}

export function generateDeinwalFragenErgebnisse(
  input: DeinwalFragenErgebnisseInput,
): DeinwalFragenErgebnisse {
  return generateMap(
    Object.entries(input).map(
      ([abstimmungs_id, party_results]) =>
        [abstimmungs_id, generateDeinwalFragenErgebnis(party_results)] as [
          string,
          DeinwalFragenErgebnis,
        ],
    ),
  );
}

export function filterDeinwalFragen(
  fragen: DeinwalFrage[],
  ergebnisse: DeinwalFragenErgebnisse,
): DeinwalFrage[] {
  const fragenMitErgebnissen = fragen.filter(frage => !!ergebnisse[frage.abstimmungs_id]);
  if (fragenMitErgebnissen.length !== fragen.length) {
    console.error(
      'uups...? hab',
      fragen.length,
      'fragen aber nur',
      fragenMitErgebnissen.length,
      'antworten dazu...?',
    );
  }
  if (Object.keys(ergebnisse).length !== fragenMitErgebnissen.length) {
    console.error(
      'uups...? hab',
      Object.keys(ergebnisse).length,
      'ergebnisse aber nur',
      fragenMitErgebnissen.length,
      'antworten dazu...?',
    );
  }
  return fragenMitErgebnissen;
}
