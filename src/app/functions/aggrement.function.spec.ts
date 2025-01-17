import {computeAgreement, computeAgreementNumeric} from './aggrement.function';
import {AGREEMENT} from '../enums/agreement.enum';


describe('computeAgreement', () => {
  it('should return AGREEMENT.NONE if user is undefined', () => {
    expect(computeAgreement(0.3, undefined)).toBe(AGREEMENT.NONE);
  });

  it('should return AGREEMENT.NONE if user is null', () => {
    expect(computeAgreement(0.3, null)).toBe(AGREEMENT.NONE);
  });

  it('should return AGREEMENT.NONE if party is undefined', () => {
    expect(computeAgreement(undefined, 0.1)).toBe(AGREEMENT.NONE);
  });

  it('should return AGREEMENT.NONE if party is null', () => {
    expect(computeAgreement(null, 0.1)).toBe(AGREEMENT.NONE);
  });

  it('should return AGREEMENT.AGREE if party and user are both below thresholds', () => {
    expect(computeAgreement(-0.6, -0.9)).toBe(AGREEMENT.AGREE);
  });

  it('should return AGREEMENT.AGREE if party and user are both above thresholds', () => {
    expect(computeAgreement(0.6, 0.9)).toBe(AGREEMENT.AGREE);
  });

  it('should return AGREEMENT.AGREE if both party and user are within thresholds 1', () => {
    expect(computeAgreement(0.2, -0.05)).toBe(AGREEMENT.AGREE);
  });

  it('should return AGREEMENT.AGREE if both party and user are within thresholds 2', () => {
    expect(computeAgreement(-0.2, 0.05)).toBe(AGREEMENT.AGREE);
  });

  it('should return AGREEMENT.DISAGREE if party and user values do not match conditions 1', () => {
    expect(computeAgreement(-0.6, 0.2)).toBe(AGREEMENT.DISAGREE);
  });

  it('should return AGREEMENT.DISAGREE if party and user values do not match conditions 2', () => {
    expect(computeAgreement(0.6, -0.2)).toBe(AGREEMENT.DISAGREE);
  });

  it('should return AGREEMENT.DISAGREE if party and user values do not match conditions 3', () => {
    expect(computeAgreement(0.6, 0)).toBe(AGREEMENT.DISAGREE);
  });

  it('should return AGREEMENT.DISAGREE if party and user values do not match conditions 4', () => {
    expect(computeAgreement(-0.6, 0)).toBe(AGREEMENT.DISAGREE);
  });
});



describe('computeAgreementNumeric', () => {
  // Test when party or user is undefined or null
  it('should return 0 when party is undefined', () => {
    expect(computeAgreementNumeric(undefined, 1)).toBe(0);
  });

  it('should return 0 when party is null', () => {
    expect(computeAgreementNumeric(null, 1)).toBe(0);
  });

  it('should return 0 when user is undefined', () => {
    expect(computeAgreementNumeric(1, undefined)).toBe(0);
  });

  it('should return 0 when user is null', () => {
    expect(computeAgreementNumeric(1, null)).toBe(0);
  });

  // Test when user is 0 (neutral)
  it('should return 1 when user is 0 and party is supporting', () => {
    expect(computeAgreementNumeric(.8, 0)).toBe(.5);
  });

  it('should return 0.5 when user is 0 and party is opposing', () => {
    expect(computeAgreementNumeric(-.6, 0)).toBe(0.5);
  });

  it('should return 1 when user is 0 and party is slightly supporting', () => {
    expect(computeAgreementNumeric(.3, 0)).toBe(1);
  });

  it('should return 0.5 when user is 0 and party is slightly opposing', () => {
    expect(computeAgreementNumeric(-.2, 0)).toBe(1);
  });

  // Test when user is 1 (supporting)
  it('should return 1 when user is 1 and party is above threshold', () => {
    expect(computeAgreementNumeric(.7, 1)).toBe(1);
  });

  it('should return 0.5 when user is 1 and party is between negative and positive threshold 1', () => {
    expect(computeAgreementNumeric(0.3, 1)).toBe(0.5);
  });

  it('should return 0.5 when user is 1 and party is between negative and positive threshold 2', () => {
    expect(computeAgreementNumeric(-0.3, 1)).toBe(0.5);
  });

  it('should return 0 when user is 1 and party is below threshold', () => {
    expect(computeAgreementNumeric(-.9, 1)).toBe(0);
  });

  // Test when user is -1 (opposing)
  it('should return 1 when user is -1 and party is below negative threshold', () => {
    expect(computeAgreementNumeric(-.6, -1)).toBe(1);
  });

  it('should return 0.5 when user is -1 and party is between negative and positive threshold 1', () => {
    expect(computeAgreementNumeric(0.1, -1)).toBe(0.5);
  });

  it('should return 0.5 when user is -1 and party is between negative and positive threshold 2', () => {
    expect(computeAgreementNumeric(-.3, -1)).toBe(0.5);
  });

  it('should return 0 when user is -1 and party is above threshold', () => {
    expect(computeAgreementNumeric(.95, -1)).toBe(0);
  });

  // Test when user and party are both undefined or null
  it('should return 0 when both party and user are undefined', () => {
    expect(computeAgreementNumeric(undefined, undefined)).toBe(0);
  });

  it('should return 0 when both party and user are null', () => {
    expect(computeAgreementNumeric(null, null)).toBe(0);
  });
});
