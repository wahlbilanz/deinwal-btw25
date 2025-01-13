import {DeinwalErgebnis} from '../interfaces/data.interface';
import {partyDecision} from './party-decision.function';



describe('partyDecision', () => {
  it('should return correct value for typical positive inputs', () => {
    const fraktion: DeinwalErgebnis = { ja: 30, nein: 20, enthalten: 10 } as DeinwalErgebnis;
    const result = partyDecision(fraktion);
    expect(result).toBeCloseTo(10 / 60);
  });

  it('should handle case where all values are zero', () => {
    const fraktion: DeinwalErgebnis = { ja: 0, nein: 0, enthalten: 0 } as DeinwalErgebnis;
    const result = partyDecision(fraktion);
    expect(result).toBe(0);
  });

  it('should return a positive value when "ja" is greater than "nein"', () => {
    const fraktion: DeinwalErgebnis = { ja: 100, nein: 20, enthalten: 10 } as DeinwalErgebnis;
    const result = partyDecision(fraktion);
    expect(result).toBeCloseTo(80 / 130);
  });

  it('should return a negative value when "nein" is greater than "ja"', () => {
    const fraktion: DeinwalErgebnis = { ja: 10, nein: 50, enthalten: 10 } as DeinwalErgebnis;
    const result = partyDecision(fraktion);
    expect(result).toBeCloseTo(-40 / 70);
  });

  it('should consider "enthalten" in the calculation', () => {
    const fraktion: DeinwalErgebnis = { ja: 25, nein: 25, enthalten: 50 } as DeinwalErgebnis;
    const result = partyDecision(fraktion);
    expect(result).toBeCloseTo(0);
  });
});
