import { ColorHasherRGB } from '@hochleistungslabor/color-hasher';

export function hexToRgb(hex: string): ColorHasherRGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null;
}

export function getContrastRatio(l1: number, l2: number): number {
  return (l1 + 0.05) / (l2 + 0.05);
}
