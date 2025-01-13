import {computeAgreement} from './aggrement.function';
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
