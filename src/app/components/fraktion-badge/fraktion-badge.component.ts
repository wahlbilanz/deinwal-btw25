import { Component, computed, inject, input } from '@angular/core';
import { DataService } from '../../data/data.sevice';
import { calculateLuminance } from '@hochleistungslabor/color-hasher';
import { getContrastRatio, hexToRgb } from '../../functions/color.function';
import { MemoizePipe } from '../../pipes/memoize.pipe';

@Component({
  selector: 'wal-fraktion-badge',
  imports: [MemoizePipe],
  templateUrl: './fraktion-badge.component.html',
})
export class FraktionBadgeComponent {
  private dataService = inject(DataService);

  public fraktion = input.required<string>();
  public backgroundColor = computed(() => {
    const fraktionsColorizer = this.dataService.getFraktionsColorizerFn();
    return fraktionsColorizer(this.fraktion());
  });
  public fontColor = computed(() => {
    const background = this.backgroundColor();
    const backgroundRgb = hexToRgb(background);
    if (!backgroundRgb) {
      return '#fff';
    }
    const luminance = calculateLuminance(backgroundRgb);
    const contrastWithBlack = getContrastRatio(luminance, 0);
    const contrastWithWhite = getContrastRatio(1, luminance);
    if (contrastWithBlack > 1.9 * contrastWithWhite) {
      return '#000';
    }
    return '#fff';
  });

  public shortenFraktionForBadge(fraktion: string): string {
    if (fraktion.includes('90')) {
      return 'Die Grünen';
    }
    return fraktion;
  }
}
