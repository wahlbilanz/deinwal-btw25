import { AgreementMap } from './agreement.interface';
import { Match } from './match.interface';

export interface Antwort {
  abstimmungs_id: string;
  antwort: number | null;
  uebereinstimmungen: { [key: string]: Match };
}
