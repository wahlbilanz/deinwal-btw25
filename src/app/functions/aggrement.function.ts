import { AGREEMENT } from '../enums/agreement.enum';
import { Fraktionsentscheidungsschwellwert } from '../consts/schwellwert.const';

export function computeAgreement(party?: number | null, user?: number | null): AGREEMENT {
  if (user === undefined || user === null) {
    return AGREEMENT.NONE;
  }
  if (party === undefined || party === null) {
    return AGREEMENT.NONE;
  }

  if (party < -Fraktionsentscheidungsschwellwert && user < -0.1) {
    return AGREEMENT.AGREE;
  }
  if (party > Fraktionsentscheidungsschwellwert && user > 0.1) {
    return AGREEMENT.AGREE;
  }
  if (Math.abs(party) < Fraktionsentscheidungsschwellwert && Math.abs(user) < 0.1) {
    return AGREEMENT.AGREE;
  }

  return AGREEMENT.DISAGREE;
}

export function computeAgreementNumeric(party?: number | null, user?: number | null): number {
  if (party === undefined || party === null) {
    return 0;
  }
  if (user === undefined || user === null) {
    return 0;
  }

  // user hat enthalten
  if (user === 0) {
    if (party < Fraktionsentscheidungsschwellwert && party > -Fraktionsentscheidungsschwellwert) {
      return 1;
    }
    return 0.5;
  }

  // user war dafuer
  if (user === 1) {
    if (party > Fraktionsentscheidungsschwellwert) {
      return 1;
    }
    if (party > -Fraktionsentscheidungsschwellwert) {
      return 0.5;
    }
  }

  // user war dagegen
  if (user === -1) {
    if (party < -Fraktionsentscheidungsschwellwert) {
      return 1;
    }
    if (party < Fraktionsentscheidungsschwellwert) {
      return 0.5;
    }
  }
  return 0;
}
