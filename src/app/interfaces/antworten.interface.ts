import { AGREEMENT } from '../enums/agreement.enum';
import { Abstimmungsergebnis } from './data.interface';

export interface PartyMatchAcc {
  party: string;
  match: number;
}

export interface Uebereinstimmung {
  agreement?: AGREEMENT | undefined;
  fraktionsEntscheidung?: Abstimmungsergebnis;
  uebereinstimmung: number;
}

export interface Antwort {
  abstimmungs_id: string;
  antwort: number | null;
  uebereinstimmungen: { [key: string]: Uebereinstimmung };
}

export type AntwortenMap = { [abstimmungs_id: string]: Antwort };
