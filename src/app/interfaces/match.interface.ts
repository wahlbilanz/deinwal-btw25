import { AGREEMENT } from '../enums/agreement.enum';
import { Abstimmungsergebnis } from './data.interface';

export interface PartyMatchAcc {
  party: string;
  match: number;
}

export interface Match {
  agreement?: AGREEMENT | undefined;
  fraktionsEntscheidung?: Abstimmungsergebnis;
  uebereinstimmung: number;
  // fraktion: string;
}

export interface QuestionMatch {
  abstimmungs_id: string;
  partyMatches: { [key: string]: Match };
  antwort: number | null;
}

export type QuestionMatchMap = { [abstimmungs_id: string]: QuestionMatch };
