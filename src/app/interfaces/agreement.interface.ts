import { AGREEMENT } from '../enums/agreement.enum';

export interface Agreement {
  fraktion: string;
  abstimmungs_id: string;
  agreement: AGREEMENT;
}

export type AgreementMap = {
  [fraktion: string]: Agreement;
};
