import { Abstimmungsergebnis } from '../interfaces/data.interface';

export function partyDecision(fraktion: Abstimmungsergebnis): number {
  if (fraktion.ja < 0 || fraktion.nein < 0 || fraktion.enthalten < 0) {
    console.error('Party decision contains negative value...?', fraktion);
    return 0;
  }

  if (fraktion.gesamt < 1) {
    console.error('Party did not vote on abstimmung...?', fraktion.gesamt);
    return 0;
  }

  return (fraktion.ja - fraktion.nein) / fraktion.gesamt;
}
