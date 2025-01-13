import { AGREEMENT } from '../enums/agreement.enum';
import { PartyDecisionThreshold } from '../consts/threshold.const';

export function computeAgreement(party?: number | null, user?: number | null): AGREEMENT {
  if (user === undefined || user === null) {
    return AGREEMENT.NONE;
  }
  if (party === undefined || party === null) {
    return AGREEMENT.NONE;
  }

  if (party < -PartyDecisionThreshold && user < -0.1) {
    return AGREEMENT.AGREE;
  }
  if (party > PartyDecisionThreshold && user > 0.1) {
    return AGREEMENT.AGREE;
  }
  if (Math.abs(party) < PartyDecisionThreshold && Math.abs(user) < 0.1) {
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
    if (party < PartyDecisionThreshold && party > -PartyDecisionThreshold) {
      return 1;
    }
    return 0.5;
  }

  // user war dafuer
  if (user === 1) {
    if (party > PartyDecisionThreshold) {
      return 1;
    }
    if (party > -PartyDecisionThreshold) {
      return 0.5;
    }
  }

  // user war dagegen
  if (user === -1) {
    if (party < -PartyDecisionThreshold) {
      return 1;
    }
    if (party < PartyDecisionThreshold) {
      return 0.5;
    }
  }
  return 0;
}
