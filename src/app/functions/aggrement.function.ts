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
